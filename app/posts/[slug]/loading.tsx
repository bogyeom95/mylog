export default function loading() {
  return (
    <div className="max-w-4xl mx-auto p-4 space-y-4">
      {/* Title skeleton */}
      <div className="skeleton h-8 w-3/4 mb-4" />

      {/* Image skeleton */}
      <div className="skeleton h-64 w-full rounded-lg mb-6" />

      {/* Text block skeletons */}
      <div className="skeleton h-4 w-full mb-2" />
      <div className="skeleton h-4 w-5/6 mb-2" />
      <div className="skeleton h-4 w-2/3 mb-2" />
      <div className="skeleton h-4 w-3/4 mb-2" />
      <div className="skeleton h-4 w-1/2 mb-2" />
    </div>
  );
}
