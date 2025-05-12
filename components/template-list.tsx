// components/template-list.tsx
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, FileText, Trash } from "lucide-react";
import Link from "next/link";
import { deleteTemplateAction, getTemplates } from "@/lib/templates-actions";

export async function TemplateList() {
  const templates = await getTemplates();

  if (templates.length === 0) {
    return (
      <div className="text-center p-10 border rounded-lg bg-muted/50">
        <p className="text-muted-foreground">
          No templates found. Create your first template!
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {templates.map((template) => (
        <Card key={template.id}>
          <CardHeader>
            <CardTitle className="truncate">{template.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground line-clamp-3">
              {template.template}
            </p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="flex space-x-2">
              <Link href={`/templates/${template.id}/edit`}>
                <Button variant="outline" size="icon">
                  <Edit className="h-4 w-4" />
                </Button>
              </Link>

              <form action={deleteTemplateAction}>
                <input type="hidden" name="id" value={template.id} />
                <Button
                  type="submit"
                  variant="outline"
                  size="icon"
                  className="hover:bg-destructive hover:text-destructive-foreground"
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </form>
            </div>

            <Link href={`/templates/${template.id}/fill`}>
              <Button>
                <FileText className="mr-2 h-4 w-4" />
                Fill
              </Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
