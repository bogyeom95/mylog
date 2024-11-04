// app/posts/create/page.tsx

import { redirect } from "next/navigation";
import MarkdownEditor from "@/components/editors/markdown-editor";

const initialMarkdown = `
# Hello World

This is a sample MDX document.


`;

export default async function CreatePost() {
  async function handleFormSubmit(formData: FormData) {
    "use server";

    const markdown = formData.get("markdown") as string;
    console.log("Received markdown:", markdown);

    redirect("/posts/preview");
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Create a New Post</h1>
      <form action={handleFormSubmit} className="w-full h-full">
        <MarkdownEditor initialMarkdown={initialMarkdown} />
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
