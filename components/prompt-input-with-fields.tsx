"use client";

import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface Field {
  id: string;
  placeholder: string;
}

interface Props {
  initialValue?: string;
}

export function PromptInputWithFields({ initialValue = "" }: Props) {
  const [templateText, setTemplateText] = useState(initialValue);
  const [fields, setFields] = useState<Field[]>([]);

  useEffect(() => {
    const matches = Array.from(templateText.matchAll(/\{([^}]+)\}/g));
    const placeholders = Array.from(new Set(matches.map((m) => m[1])));
    const fieldObjs = placeholders.map((placeholder) => ({
      id: placeholder,
      placeholder,
    }));

    setFields(fieldObjs);
  }, [templateText]);

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="template">Template Text</Label>
        <p className="text-sm text-muted-foreground mb-2">
          Use {"{placeholder}"} to indicate where values will be inserted.
        </p>
        <Textarea
          id="template"
          name="template"
          value={templateText}
          onChange={(e) => setTemplateText(e.target.value)}
          placeholder="Write your template here..."
          className="min-h-[200px]"
          required
        />
      </div>

      {/* Campo hidden que envia os placeholders como JSON */}
      <input type="hidden" name="fields" value={JSON.stringify(fields)} />

      <div className="space-y-2">
        <Label>Detected Fields</Label>
        {fields.length === 0 ? (
          <p className="text-sm italic text-muted-foreground">None</p>
        ) : (
          <ul className="list-disc list-inside text-sm text-foreground">
            {fields.map((field) => (
              <li key={field.id}>
                <code>{`{${field.placeholder}}`}</code>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
