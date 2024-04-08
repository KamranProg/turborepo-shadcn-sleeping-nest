"use client";

import { useRouter } from "next/navigation";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import { DataTable } from "@repo/ui/components/ui/data-table";
import { getColumns } from "./columns";
import { AggregatedSleep, Sleep } from "../../../types";
import { useFindSleepsByDays } from "../../../hooks";
import { useCallback, useMemo } from "react";

function aggregateSleeps(sleeps: Sleep[]): AggregatedSleep[] {
  const aggregatedSleepsMap = new Map<string, AggregatedSleep>();

  // Aggregate sleeps by name and count the number of records
  sleeps.forEach((sleep) => {
    const existingAggregatedSleep = aggregatedSleepsMap.get(sleep.name);
    if (existingAggregatedSleep) {
      existingAggregatedSleep.logs++; // Increment logs count
    } else {
      const newAggregatedSleep: AggregatedSleep = {
        id: sleep.id,
        name: sleep.name,
        gender: sleep.gender,
        logs: 1, // Initialize logs count to 1
        createdAt: sleep.createdAt,
      };
      aggregatedSleepsMap.set(sleep.name, newAggregatedSleep);
    }
  });

  // Convert the map values to an array
  const aggregatedSleeps: AggregatedSleep[] = Array.from(
    aggregatedSleepsMap.values(),
  );

  return aggregatedSleeps;
}

export default function SleepsOverviewList() {
  const router = useRouter();
  const {
    data: sleeps,
    isLoading,
    error,
    isError,
    refetch,
  } = useFindSleepsByDays();

  const handleDelete = () => {
    // Reload data
    refetch();
  };

  // if (isError) {
  //   return <GenericError error={error} />;
  // }

  const onView = useCallback((item: AggregatedSleep) => {
    const { name } = item;
    router.push(`/sleeps-overview-list/${name}/view`);
  }, []);

  const aggregatedSleeps: AggregatedSleep[] =
    (sleeps && aggregateSleeps(sleeps)) || [];

  const isListNotEmpty = aggregatedSleeps && aggregatedSleeps.length;

  const columns = useMemo(() => getColumns({ onView }), []);

  return (
    <>
      <h1 className="pb-4 text-center uppercase">Sleep Overview List</h1>
      <Card>
        <CardHeader>
          {/* <CardTitle>Sleeps Overview List:</CardTitle> */}
        </CardHeader>
        <CardContent>
          {isListNotEmpty && (
            <DataTable columns={columns} data={aggregatedSleeps} />
          )}
        </CardContent>
      </Card>
    </>
  );
}
