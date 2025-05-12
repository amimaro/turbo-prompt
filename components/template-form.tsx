// components/template-form.tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  createTemplateAction,
  updateTemplateAction,
} from "@/lib/templates-actions";
import { Template } from "@/lib/types";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { PromptInputWithFields } from "./prompt-input-with-fields";

interface TemplateFormProps {
  template?: Template;
}

export async function TemplateForm({ template }: TemplateFormProps) {
  const isEdit = Boolean(template);
  const action = isEdit ? updateTemplateAction : createTemplateAction;

  return (
    <form action={action} className="space-y-6">
      {template?.id && <input type="hidden" name="id" value={template.id} />}

      <Link
        href="/dashboard"
        className="flex items-center text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="mr-1 h-4 w-4" />
        Back to dashboard
      </Link>

      <div className="space-y-2">
        <Label htmlFor="name">Template Name</Label>
        <Input
          id="name"
          name="name"
          defaultValue={template?.name}
          placeholder="Ex: Article Summary"
          required
        />
      </div>

      <PromptInputWithFields initialValue={template?.template || ""} />

      <div className="flex justify-end">
        <Button type="submit">
          {isEdit ? "Update Template" : "Create Template"}
        </Button>
      </div>
    </form>
  );
}
