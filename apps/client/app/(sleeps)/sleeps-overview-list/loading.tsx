import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/components/ui/card";
import { Skeleton } from "@repo/ui/components/ui/skeleton";

export default function Loading() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="uppercase">Sleeps List</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-[60px_1fr_1fr_1fr_1fr] gap-4 items-center">
        <Skeleton className="size-10 rounded-full" />
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
        <Skeleton className="size-10 rounded-full" />
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
      </CardContent>
    </Card>
  );
}
