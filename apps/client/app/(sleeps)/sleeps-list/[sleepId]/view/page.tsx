"use client"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";

import { useFindOneSleep } from "../../../../../hooks";
import { dateTimeFormat } from "../../../../../utils/dateTimeHelpers";

interface Props {
  params: { sleepId: string };
}

export default function ViewSleep({ params }: Props) {
  const itemId = Number(params?.sleepId);

  const {
    data: sleep,
    // isLoading,
    error,
    isError,
  } = useFindOneSleep(itemId);

  if (isError) {
    throw error;
  }

  return (
    <>
       <h1 className="pb-4 text-center uppercase">Sleep details</h1>
      <Card>
        <CardHeader>
          <CardTitle>Name: {sleep?.name}</CardTitle>
        </CardHeader>
        <CardContent>
          Gender: {sleep?.gender}
          <br />
          Sleep duration: {sleep?.sleepDuration}
          <br />
          Date: {dateTimeFormat(sleep?.createdAt?.toString())}
          <br />
        </CardContent>
      </Card>
    </>
  );
}
