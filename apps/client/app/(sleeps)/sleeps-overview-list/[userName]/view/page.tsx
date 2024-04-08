"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";

import SleepOverviewChart from "../../components/SleepOverviewChart";
import { useFindSleepsByDays } from "../../../../../hooks";

interface Props {
  params: { userName: string };
}

export default function ViewSleepOverview({ params }: Props) {
  const { userName } = params;
  const {
    data: userSleepsOverXDays,
    // isLoading,
    error,
    isError,
  } = useFindSleepsByDays(7, userName); // gets last 7 days sleeps for a user

  // if (isError) {
  //   return <GenericError error={error} />;
  // }

  return (
    <>
      <h1 className="pb-4 text-center uppercase">Sleep Overview Details</h1>

      <Card>
        <CardHeader>
          <CardTitle>Sleeps Overview for {userName}</CardTitle>
        </CardHeader>
        <CardContent>
          {userSleepsOverXDays && (
            <SleepOverviewChart items={userSleepsOverXDays} />
          )}
        </CardContent>
      </Card>
    </>
  );
}
