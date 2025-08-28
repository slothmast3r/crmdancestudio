"use client";
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
import React from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const formSchema = z.object({
  schoolName: z.string().min(1, { message: "Nazwa szkoły jest wymagana" }),
  name: z.string().optional(),
  surname: z.string().optional(),
  phone: z.string().min(9, { message: "Podaj poprawny numer telefonu" }),
});

function OnboardindForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
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
                <FormLabel>Nazwa użytkownika</FormLabel>
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
