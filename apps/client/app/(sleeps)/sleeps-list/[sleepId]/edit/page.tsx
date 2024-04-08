"use client";

import { Button } from "@repo/ui/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/components/ui/form";
import { Input } from "@repo/ui/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/ui/select";
import { PersonStandingIcon, Undo2 } from "@repo/ui/components/ui/icons";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  NestErrorData,
  Sleep,
  SleepInput,
  sleepInputSchema,
} from "../../../../../types";
import { useEffect, useState } from "react";
import { useFindOneSleep, useUpdateSleep } from "../../../../../hooks";
import { BasicAlerts } from "../../../../../shard-components/BasicAlerts";

interface Props {
  params: { sleepId: string };
}

export default function EditSleepForm({ params }: Props) {
  const router = useRouter();
  const { sleepId } = params;
  const itemId = Number(sleepId);

  const [responseError, setResponseError] = useState<NestErrorData | string>();

  const {
    data: findOnsSleep,
    isLoading,
    error,
    isError,
  } = useFindOneSleep(itemId);

  const { mutate: updateSleep } = useUpdateSleep(
    () => {
      router.push("/sleeps-list"); // onSuccess
    },
    (err) => {
      setResponseError(err); // onError
    },
  );

  // eslint-disable-next-line no-undef
  const form = useForm<SleepInput>({
    resolver: zodResolver(sleepInputSchema),
    defaultValues: isLoading ? {} : findOnsSleep,
  });

  const [openItemExistsAlert, setOpenItemExistsAlert] = useState(false);

  const handleDialogClose = () => {
    setOpenItemExistsAlert(false);
  };

  const handleSubmit = (data: SleepInput) => {
    console.log("Edit validation passed: ", data);
    if (itemId) {
      const payload = {
        ...data,
        sleepDuration: +data.sleepDuration,
      };
      updateSleep({
        sleepId: itemId,
        sleep: payload as Partial<Sleep>,
      }); // Update sleep
      // console.log(errors);
    }
  };

  const { reset } = form;

  useEffect(() => {
    if (findOnsSleep) {
      reset(findOnsSleep);
    }
  }, [findOnsSleep, reset]);

  // if useFindOneSleep error
  // if (isError) {
  //   return <GenericError error={error} />;
  // }

  const renderAlerts = (responseError: NestErrorData | string) => {
    if (typeof responseError === "string")
      return <BasicAlerts messages={[responseError as string]} />;
    const { data } = responseError;
    if (data) return <BasicAlerts messages={data?.message} />;
    return null;
  };

  return (
    <>
      <h1 className="pb-4 text-center uppercase">Edit Sleep</h1>

      <div className="flex flex-col justify-center items-center gap-2">
        <PersonStandingIcon size={50} />
        <Card className="w-full max-w-sm">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <CardHeader>
                {responseError && (
                  <>
                    <CardTitle>Something went wrong...</CardTitle>
                    <CardDescription>
                      {renderAlerts(responseError)}
                    </CardDescription>
                  </>
                )}
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gender</FormLabel>
                      <Select onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Male">Male</SelectItem>
                          <SelectItem value="Female">Female</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="sleepDuration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sleep Duration</FormLabel>
                      <FormControl>
                        <Input type="number" min={0} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter className=" justify-end gap-2">
                <Button asChild variant="outline" size="sm">
                  <Link href="/sleeps-list">
                    <Undo2 />
                  </Link>
                </Button>
                <Button type="submit" variant="outline" size="sm">
                  Submit
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>
      </div>
    </>
  );
}
