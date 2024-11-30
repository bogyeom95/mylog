"use client";
import Link from "next/link";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";

const searchMoalId = "header_search_modal";

export default function Header() {
  const handleSubmit = async (formData: FormData) => {
    const searchQuery = formData.get("searchQuery") as string;

    if (searchQuery) {
      redirect(`/?q=${encodeURIComponent(searchQuery)}`);
    } else {
      redirect("/");
    }
  };

  return (
    <div className="sticky top-0 z-30 h-16 w-full bg-base-100 bg-opacity-80 text-base-content shadow-sm backdrop-blur">
      <nav className="navbar w-full">
        <div className="flex w-full items-center justify-between">
          <MainLogo />
          <SearchArea id={searchMoalId} handleSubmit={handleSubmit} />
        </div>
      </nav>

      <Modal id={searchMoalId} handleSubmit={handleSubmit} />
    </div>
  );
}

const MainLogo = () => {
  return (
    <Link href="/" className="flex items-center">
      <h2 className="ml-2 flex items-center sm:ml-4">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          fillRule="evenodd"
          clipRule="evenodd"
          className="fill-current"
        >
          <path d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"></path>
        </svg>
        <span className="pl-2 text-2xl font-semibold sm:block">
          <span>그냥 저냥 기록소</span>
        </span>
      </h2>
    </Link>
  );
};

interface SearchAreaProps {
  id: string;
  handleSubmit: (formData: FormData) => void;
}

const SearchArea = ({
  id,
  handleSubmit,
}: PropsWithChildren<SearchAreaProps>) => {
  return (
    <div>
      <form
        action={handleSubmit}
        className="relative mx-0 hidden sm:mx-4 sm:block"
      >
        <label className="input flex items-center gap-2 border-0">
          <span className="material-icons-round text-gray-500">search</span>
          <input
            type="text"
            name="searchQuery"
            className="focus:ring-none"
            placeholder="Search"
          />
        </label>
      </form>

      <button
        className="btn btn-ghost sm:hidden"
        //  @ts-expect-error daisyui 에서 지원하는 기능
        onClick={() => document.getElementById(id)?.showModal()}
      >
        <span className="material-icons-round text-gray-500">search</span>
      </button>
    </div>
  );
};

interface ModalProps {
  id: string;
  handleSubmit: (formData: FormData) => void;
}

const Modal = ({ id, handleSubmit }: PropsWithChildren<ModalProps>) => {
  return (
    <dialog id={id} className="modal modal-bottom">
      <div className="modal-box shadow-lg">
        <button
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-700"
          //  @ts-expect-error daisyui 에서 지원하는 기능
          onClick={() => document.getElementById(id).close()}
          aria-label="Close"
        >
          <span className="material-icons">close</span>
        </button>
        <form action={handleSubmit} className="flex justify-center">
          <label className="input flex items-center gap-2 border-0 focus:outline-none">
            <span className="material-icons-round text-gray-500">search</span>
            <input
              type="text"
              name="searchQuery"
              placeholder="검색어를 입력해주세요..."
            />
          </label>
        </form>
      </div>
    </dialog>
  );
};
