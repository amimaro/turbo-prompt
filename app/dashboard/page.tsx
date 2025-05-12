import authOptions from "@/auth";
import { TemplateList } from "@/components/template-list";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PlusCircle } from "lucide-react";
import { getServerSession } from "next-auth/next";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/signin");
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Your Templates</h1>
        <Link href="/templates/new">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            New Template
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Welcome to TurboPrompt</CardTitle>
          <CardDescription>
            Create prompt templates and easily fill them to generate customized
            prompts.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            This application allows you to create prompt templates with
            placeholders that can be filled in later. After filling out the
            form, you can copy the final prompt to use wherever you want.
          </p>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-muted-foreground">
            Start by creating a new template or use one of the existing
            templates below.
          </p>
        </CardFooter>
      </Card>

      <div className="space-y-4">
        <TemplateList />
      </div>
    </div>
  );
}
