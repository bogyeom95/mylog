// app/posts/create/page.tsx

import { redirect } from "next/navigation";
import MdxEditor from "@/components/editors/mdx-editor";

export default async function CreatePost() {
  async function handleFormSubmit(formData: FormData) {
    "use server";

    const markdown = formData.get("markdown") as string;
    // 서버에서 마크다운 텍스트를 처리하는 로직을 추가합니다.
    console.log("Received markdown:", markdown);

    // 예시: 특정 페이지로 리디렉션
    redirect("/posts/preview");
  }

  // 마크다운 상태를 관리

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Create a New Post</h1>
      <form action={handleFormSubmit}>
        {/* MdxEditor 클라이언트 컴포넌트를 사용해 마크다운 입력 */}
        <MdxEditor initialMarkdown="" />

        {/* 숨겨진 input으로 마크다운 데이터를 폼에 포함 */}

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
