"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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

import { SleepInput, sleepInputSchema } from "../../../../../types";

export default function EditSleepForm() {
  const router = useRouter();

  // eslint-disable-next-line no-undef
  const form = useForm<SleepInput>({
    resolver: zodResolver(sleepInputSchema),
    defaultValues: {},
  });

  const handleSubmit = (data: SleepInput) => {
    console.log("Edit validation passed: ", data);
    router.push("/sleeps");
  };

  const dobFromDate = new Date();
  dobFromDate.setFullYear(dobFromDate.getFullYear() - 120);

  return (
    <>
      <h1 className="pb-4 text-center uppercase">Edit Sleep</h1>

      <div className="flex flex-col justify-center items-center gap-2">
        <PersonStandingIcon size={50} />
        <Card className="w-full max-w-sm">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <CardHeader>
                {/* <CardTitle>Edit Sleep</CardTitle>
                <CardDescription></CardDescription> */}
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
                  <Link href="/sleeps/sleeps-list">
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
