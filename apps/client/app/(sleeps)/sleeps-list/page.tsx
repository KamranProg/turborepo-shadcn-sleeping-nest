"use client";

import { useCallback, useMemo, useState } from "react";

import { useRouter } from "next/navigation";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import { DataTable } from "@repo/ui/components/ui/data-table";
import { DeleteAlertDialoge } from "@repo/ui/components/ui/delete-alert-dialoge";

import { getColumns } from "./columns";
import { useDeleteSleep, useFindAllSleeps } from "../../../hooks";
import { Sleep } from "../../../types";

export default function EmployeesPage() {
  const router = useRouter();
  const {
    data: sleeps,
    isLoading,
    error,
    isError,
    refetch,
  } = useFindAllSleeps();

  const [selectedItem, setSelectedItem] = useState<Sleep | undefined>(
    undefined,
  );

  const { mutate: deleteSleep } = useDeleteSleep(() => {
    console.log(`Success, ${selectedItem} has been deleted`);
    refetch(); // Reload data
  });

  const onHandleDelete = () => {
    console.log(`dialog handleDelete ${selectedItem}`);
    if (selectedItem) {
      // call mutation with Sleep id
      deleteSleep({ id: selectedItem.id });
    }
    setSelectedItem(undefined); // close dialog
  };

  if (isError) {
    throw error;
  }

  // wont work as SleepsList is using Sleep type where sleepDuration is of type Date
  // const sleepsWithFormatedDate = sleeps?.map((sleeps) => ({
  //   ...sleeps,
  //   sleepDuration: dateTimeFormat(sleeps.sleepDuration.toString()),
  // }));

  const isListNotEmpty = sleeps && sleeps.length;

  const onView = useCallback((item: Sleep) => {
    const { id } = item;
    router.push(`/sleeps-list/${id}/view`);
  }, []);

  const onEdit = useCallback((item: Sleep) => {
    const { id } = item;
    router.push(`/sleeps-list/${id}/edit`);
  }, []);

  const onDelete = useCallback((item: Sleep) => {
    if (item) setSelectedItem(item);
  }, []);

  const columns = useMemo(() => getColumns({ onView, onEdit, onDelete }), []);

  console.log(`selectedItem: ${selectedItem}`);
  return (
    <>
      <h1 className="pb-4 text-center uppercase">Sleeps List</h1>
      <Card>
        <CardHeader>{/* <CardTitle>Sleeps List</CardTitle> */}</CardHeader>
        <CardContent>
          {isListNotEmpty && <DataTable columns={columns} data={sleeps} />}
        </CardContent>
      </Card>
      <DeleteAlertDialoge
        open={!!selectedItem}
        onDelete={onHandleDelete}
        onCabcel={() => {
          console.log("dialog on cancel delete");
          setSelectedItem(undefined);
        }}
      />
    </>
  );
}
