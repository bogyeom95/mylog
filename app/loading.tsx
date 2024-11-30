import Container from "@/components/Container";

export default function Loading() {
  return (
    <Container className="flex flex-col gap-2">
      {[...Array(10)].map((_, i) => (
        <div key={i} className="w-full transition duration-100 ease-in-out">
          <div className="flex flex-col gap-4 rounded-lg border border-base-300 bg-base-100 p-4">
            <CardHeader />
            <CardFooter />
          </div>
        </div>
      ))}
    </Container>
  );
}

const CardHeader = () => {
  return (
    <div className="flex flex-row gap-4">
      {/* Image skeleton */}
      <div className="skeleton relative h-36 w-36 overflow-hidden rounded-md"></div>

      <div className="flex flex-grow flex-col gap-2">
        {/* Title skeleton */}
        <div className="skeleton h-6 w-3/4 rounded"></div>
        {/* Description skeleton */}
        <div className="skeleton h-4 w-4/5 rounded"></div>
        <div className="skeleton h-4 w-2/3 rounded"></div>
        <div className="skeleton h-4 w-full rounded"></div>
      </div>
    </div>
  );
};

const CardFooter = () => {
  return (
    <div className="mt-auto flex items-center justify-between">
      <div className="flex flex-wrap gap-2">
        {/* Tags skeleton */}
        {[...Array(3)].map((_, j) => (
          <span key={j} className="skeleton h-4 w-12 rounded"></span>
        ))}
      </div>

      {/* Date skeleton */}
      <div className="flex gap-1">
        <div className="skeleton h-4 w-16 rounded"></div>
        <div className="skeleton h-4 w-8 rounded"></div>
        <div className="skeleton h-4 w-8 rounded"></div>
      </div>
    </div>
  );
};
