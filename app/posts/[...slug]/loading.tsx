import Container from "@/components/Container";
import Link from "next/link";

export default function loading() {
  return (
    <Container className="flex flex-col gap-2">
      <div className="mx-auto w-full">
        <Link href="/" className="text-blue-500 hover:underline">
          ← Back to all posts
        </Link>
      </div>

      {/* Title skeleton */}
      <div className="skeleton h-12 w-3/4" />

      {/* Text block skeletons */}
      <div className="skeleton h-4 w-full" />
      <div className="skeleton h-4 w-5/6" />
      <div className="skeleton h-4 w-2/3" />
      <div className="skeleton h-4 w-3/4" />
      <div className="skeleton h-4 w-1/2" />
    </Container>
  );
}
