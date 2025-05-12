import authOptions from "@/auth";
import { TemplateForm } from "@/components/template-form";
import { getTemplate } from "@/lib/templates-actions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

interface EditTemplatePageProps {
  params: Promise<{ id: string }>;
}

export default async function EditTemplatePage({
  params,
}: EditTemplatePageProps) {
  const resolvedParams = await params;
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/signin");
  }

  const { id } = resolvedParams;
  const template = await getTemplate(id);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Edit Template</h1>
      <TemplateForm template={template} />
    </div>
  );
}
