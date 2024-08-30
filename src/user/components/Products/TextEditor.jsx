import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";
import envVars from "../../../../envexport";

function TextEditor({ label, name, control, defaultValue = "" }) {
  return (
    <div className="relative mb-4">
      {label && <label className="mb-1 inline-block pl-1">{label}</label>}
      <Controller
        name={name || "description"}
        control={control}
        render={({ field: { onChange } }) => {
          return (
            <Editor
              apiKey={envVars.tinymce_api_key}
              initialValue={defaultValue}
              init={{
                initialValue: defaultValue,
                height: 300,
                menubar: true,
                plugins: [
                  "image",
                  "advlist",
                  "autolink",
                  "lists",
                  "link",
                  "image",
                  "charmap",
                  "preview",
                  "anchor",
                  "searchreplace",
                  "visualblocks",
                  "code",
                  "fullscreen",
                  "insertdatetime",
                  "media",
                  "table",
                  "code",
                  "help",
                  "wordcount",
                  "anchor",
                ],
                toolbar:
                  "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              }}
              onEditorChange={onChange}
            />
          );
        }}
      />
    </div>
  );
}

export default TextEditor;
