import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Header() {
  const handleSubmit = async (formData: FormData) => {
    "use server";
    const query = formData.get("searchQuery");

    if (query) {
      redirect(`/?q=${encodeURIComponent(String(query))}`); // 검색어로 페이지 이동
    }
  };

  return (
    <div
      className="bg-base-100 text-base-content sticky top-0 z-30 flex h-16 w-full justify-center backdrop-blur transition-shadow duration-100 [transform:translate3d(0,0,0)] 
      shadow-sm bg-opacity-80"
    >
      <nav className="navbar w-full">
        <div className="flex w-full items-center justify-between">
          <Link href="/" className="flex items-center">
            <h2 className="flex items-center ml-2 sm:ml-4">
              <span className="font-semibold text-2xl sm:text-4xl">
                <span>MyLog</span>
              </span>
            </h2>
          </Link>

          <form className="searchbox  relative mx-8" action={handleSubmit}>
            <label className="input input-bordered flex items-center gap-2">
              <span className="material-icons-round text-gray-500">search</span>
              <input
                type="text"
                name="searchQuery"
                className="grow"
                placeholder="Search"
              />
            </label>
          </form>
        </div>
      </nav>
    </div>
  );
}
