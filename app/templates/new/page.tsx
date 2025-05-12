import authOptions from "@/auth";
import { TemplateForm } from "@/components/template-form";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

export default async function NewTemplatePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/signin");
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Create New Template</h1>
      <TemplateForm />
    </div>
  );
}
