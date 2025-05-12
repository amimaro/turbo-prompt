"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, ArrowLeft, Copy, Check } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Template } from "@/lib/types";
import { fillTemplate, getTemplate } from "@/lib/templates-actions";

export default function FillTemplatePage() {
  const params = useParams();
  const router = useRouter();
  const { status } = useSession();
  const [template, setTemplate] = useState<Template | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [values, setValues] = useState<Record<string, string>>({});
  const [result, setResult] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
      return;
    }

    if (status === "loading") {
      return;
    }

    async function loadTemplate() {
      if (params.id) {
        const templateId = Array.isArray(params.id) ? params.id[0] : params.id;
        const foundTemplate = await getTemplate(templateId);

        if (foundTemplate) {
          setTemplate(foundTemplate);
          // Initialize empty values for each field
          const initialValues: Record<string, string> = {};
          foundTemplate.fields.forEach((field) => {
            initialValues[field.id] = "";
          });
          setValues(initialValues);
        } else {
          setError(
            "Template not found or you don't have permission to access it"
          );
        }
        setLoading(false);
      }
    }

    loadTemplate();
  }, [params.id, router, status]);

  const handleValueChange = (fieldId: string, value: string) => {
    setValues((prev) => ({ ...prev, [fieldId]: value }));
  };

  const generateResult = async () => {
    if (template) {
      const filled = await fillTemplate(template, values);
      setResult(filled);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="container mx-auto py-10">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-10">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!template) {
    return (
      <div className="container mx-auto py-10">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-6">
      <Link
        href="/dashboard"
        className="flex items-center text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="mr-1 h-4 w-4" />
        Back to dashboard
      </Link>

      <h1 className="text-3xl font-bold">{template.name}</h1>
      <p className="text-muted-foreground">
        Fill in the fields below to generate your customized prompt.
      </p>

      <Card>
        <CardHeader>
          <CardTitle>Form</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {template.fields.map((field) => (
            <div key={field.id} className="space-y-2">
              <Label htmlFor={`field-${field.id}`}>{field.placeholder}</Label>
              <Input
                id={`field-${field.id}`}
                value={values[field.id] || ""}
                onChange={(e) => handleValueChange(field.id, e.target.value)}
                placeholder={`Enter ${field.placeholder.toLowerCase()}`}
              />
            </div>
          ))}
        </CardContent>
        <CardFooter>
          <Button onClick={generateResult} className="w-full">
            Generate Prompt
          </Button>
        </CardFooter>
      </Card>

      {result && (
        <Card>
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>Generated Prompt</span>
              <Button
                variant="outline"
                size="sm"
                onClick={copyToClipboard}
                className="flex items-center"
              >
                {copied ? (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="mr-2 h-4 w-4" />
                    Copy
                  </>
                )}
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={result}
              readOnly
              className="min-h-[200px] font-mono"
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
