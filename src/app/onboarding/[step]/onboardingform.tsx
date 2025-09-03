"use client";
import { createSchoolAction } from "@/app/actions/onboarding";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const formSchema = z.object({
  schoolName: z.string().min(1, { message: "Nazwa szkoły jest wymagana" }),
  firstName: z.string().optional(),
  surname: z.string().optional(),
  phone: z.string().min(9, { message: "Podaj poprawny numer telefonu" }),
});

function OnboardindForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      surname: "",
      phone: "",
      schoolName: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const result = await createSchoolAction(values);
    if (result?.error) {
      console.log("Error:", result.error);
    }
    if (result.ok) redirect("/dashboard");
  }

  return (
    <CardContent>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="schoolName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nazwa szkoły</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Numer telefonu</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Imię</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="surname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nazwisko</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit">Zatwierdź</Button>
        </form>
      </Form>
    </CardContent>
  );
}

export default OnboardindForm;
