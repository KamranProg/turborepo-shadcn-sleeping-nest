import { Button } from "@repo/ui/components/ui/button";
import { PersonStandingIcon } from "@repo/ui/components/ui/icons";
import Link from "next/link";

export default function LandingPage() {
  return (
    <>
      <h1 className="flex gap-2 items-center">
        <PersonStandingIcon size={50} className="text-pink-500" /> Sleep Logger
      </h1>
      <p>Start logging sleeps</p>
      <div className="flex gap-2 items-center">
        <Button asChild>
          <Link href="sleeps-overview-list">Go</Link>
        </Button>
      </div>
    </>
  );
}