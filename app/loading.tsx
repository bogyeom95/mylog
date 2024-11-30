import Container from "@/components/Container";

export default function Loading() {
  return (
    <Container>
      {[...Array(10)].map((_, i) => (
        <div key={i} className="w-full transition duration-200 ease-in-out">
          <div className="flex flex-col gap-4 border border-base-300 bg-base-100 rounded-lg p-4">
            <Top />
            <Bottom />
          </div>
        </div>
      ))}
    </Container>
  );
}

const Top = () => {
  return (
    <div className="flex flex-row gap-4">
      {/* Image skeleton */}
      <div className="relative h-28 w-28 overflow-hidden rounded-md skeleton"></div>

      <div className="flex flex-col gap-2 flex-grow">
        {/* Title skeleton */}
        <div className="skeleton h-6 w-3/4 rounded"></div>
        {/* Description skeleton */}
        <div className="skeleton h-4 w-full rounded"></div>
        <div className="skeleton h-4 w-5/6 rounded"></div>
      </div>
    </div>
  );
};

const Bottom = () => {
  return (
    <div className="flex items-center justify-between mt-auto">
      <div className="flex flex-wrap gap-2">
        {/* Tags skeleton */}
        {[...Array(3)].map((_, j) => (
          <span key={j} className="skeleton h-6 w-12 rounded-full"></span>
        ))}
      </div>

      {/* Date skeleton */}
      <div className="skeleton h-4 w-16"></div>
    </div>
  );
};
