"use server";

import authOptions from "@/auth";
import { Redis } from "@upstash/redis";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Field, Template } from "./types";
import { templateSchema } from "./validation/template-schema";

// Initialize Redis client
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || "",
  token: process.env.UPSTASH_REDIS_REST_TOKEN || "",
});

// Function to generate a unique ID
export async function generateId(): Promise<string> {
  return Math.random().toString(36).substring(2, 9);
}

// Function to get the current user ID
export async function getCurrentUserId(): Promise<string | null> {
  const session = await getServerSession(authOptions);
  return session?.user?.id || null;
}

// Function to get all templates for the current user
export async function getTemplates(): Promise<Template[]> {
  const userId = await getCurrentUserId();
  if (!userId) return [];

  try {
    const templates =
      (await redis.get<Template[]>(`templates:${userId}`)) || [];
    return templates;
  } catch (error) {
    console.error("Error fetching templates:", error);
    return [];
  }
}

export async function getTemplate(id: string): Promise<Template | undefined> {
  const userId = await getCurrentUserId();
  if (!userId) return undefined;

  try {
    const templates =
      (await redis.get<Template[]>(`templates:${userId}`)) || [];
    return templates.find((template) => template.id === id);
  } catch (error) {
    console.error("Error fetching template:", error);
    return undefined;
  }
}

// Function to delete a template
export async function deleteTemplateAction(formData: FormData) {
  const id = formData.get("id") as string;
  const userId = await getCurrentUserId();
  if (!userId || !id) return;

  try {
    const templates =
      (await redis.get<Template[]>(`templates:${userId}`)) || [];

    const templateIndex = templates.findIndex((t) => t.id === id);
    if (templateIndex === -1) return;

    const filteredTemplates = templates.filter(
      (template) => template.id !== id
    );
    await redis.set(`templates:${userId}`, filteredTemplates);

    revalidatePath("/dashboard");
  } catch (error) {
    console.error("Error deleting template:", error);
  }
}

export async function saveTemplate(template: Template): Promise<void> {
  const userId = await getCurrentUserId();
  if (!userId) return;

  try {
    // Ensure the template has the current user ID
    template.userId = userId;

    const templates =
      (await redis.get<Template[]>(`templates:${userId}`)) || [];
    const existingIndex = templates.findIndex((t) => t.id === template.id);

    if (existingIndex >= 0) {
      templates[existingIndex] = template;
    } else {
      templates.push(template);
    }
    console.log(" templates:", templates);

    await redis.set(`templates:${userId}`, templates);
  } catch (error) {
    console.error("Error saving template:", error);
  }
}

export async function createTemplateAction(formData: FormData) {
  const userId = await getCurrentUserId();
  if (!userId) return;

  const raw = {
    name: formData.get("name")?.toString() || "",
    template: formData.get("template")?.toString() || "",
    fields: [] as Field[],
  };

  try {
    const fieldsJson = formData.get("fields")?.toString() || "[]";
    raw.fields = JSON.parse(fieldsJson);
  } catch {
    console.error("Invalid fields JSON");
    return;
  }

  const parsed = templateSchema.safeParse(raw);
  if (!parsed.success) {
    console.error("Validation failed:", parsed.error.flatten().fieldErrors);
    return;
  }
  const _id = await generateId();

  const newTemplate: Template = {
    id: _id,
    ...parsed.data,
    userId,
  };

  await saveTemplate(newTemplate);
  revalidatePath("/dashboard");
  redirect("/dashboard");
}

export async function updateTemplateAction(formData: FormData) {
  const userId = await getCurrentUserId();
  if (!userId) return;

  const id = formData.get("id")?.toString();
  if (!id) return;

  const raw = {
    name: formData.get("name")?.toString() || "",
    template: formData.get("template")?.toString() || "",
    fields: [] as Field[],
  };

  try {
    const fieldsJson = formData.get("fields")?.toString() || "[]";
    raw.fields = JSON.parse(fieldsJson);
  } catch {
    console.error("Invalid fields JSON");
    return;
  }

  const parsed = templateSchema.safeParse(raw);
  if (!parsed.success) {
    console.error("Validation failed:", parsed.error.flatten().fieldErrors);
    return;
  }

  const existing = await getTemplate(id);
  if (!existing || existing.userId !== userId) return;

  const updatedTemplate: Template = {
    id,
    ...parsed.data,
    userId,
  };

  await saveTemplate(updatedTemplate);
  revalidatePath("/dashboard");
  redirect("/dashboard");
}

// Function to fill a template with values
export async function fillTemplate(
  template: Template,
  values: Record<string, string>
): Promise<string> {
  let filledTemplate = template.template;

  template.fields.forEach((field) => {
    const value = values[field.id] || "";
    filledTemplate = filledTemplate.replace(
      new RegExp(`\\{${field.placeholder}\\}`, "g"),
      value
    );
  });

  return filledTemplate;
}
