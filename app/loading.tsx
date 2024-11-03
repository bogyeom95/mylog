export default function Loading() {
  return (
    <div className="flex flex-row flex-wrap justify-center gap-4 mt-4">
      {/* 100개의 p 태그 임시 생성 */}
      {[...Array(10)].map((_, i) => (
        <div key={i} className="flex w-52 flex-col gap-4">
          <div className="flex items-center gap-4">
            <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
            <div className="flex flex-col gap-4">
              <div className="skeleton h-4 w-20">{i}</div>
              <div className="skeleton h-4 w-28"></div>
            </div>
          </div>
          <div className="skeleton h-32 w-full"></div>
        </div>
      ))}
    </div>
  );
}
