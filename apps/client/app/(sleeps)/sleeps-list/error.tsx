"use client";

export default function ErrorBoundary({ error }: { error: Error }) {
  return <div className="text-center text-destructive">An error accured: {error.message}</div>;
}
