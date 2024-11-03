export default function Header() {
  return (
    <div
      className="bg-base-100 text-base-content sticky top-0 z-30 flex h-16 w-full justify-center  backdrop-blur transition-shadow duration-100 [transform:translate3d(0,0,0)] 
  shadow-sm bg-opacity-80"
    >
      <nav className="navbar w-full ">
        <div className="flex w-full items-center justify-between">
          <div className="flex justify-center items-center">
            <h2 className="flex gap-1 items-center ml-2 sm:ml-4">
              <span className="font-semibold text-2xl sm:text-4xl">MyLog</span>
            </h2>
          </div>

          <div className="searchbox relative mx-3 max-w-sm">
            <label className="input input-bordered flex items-center gap-2">
              <input type="text" className="grow" placeholder="Search" />
              <kbd className="kbd kbd-sm">⌘</kbd>
              <kbd className="kbd kbd-sm">K</kbd>
            </label>
          </div>
        </div>
      </nav>
    </div>
  );
}
