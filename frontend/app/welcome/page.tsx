"use client";
import { z } from "zod";
import Image from "next/image";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
const Welcome = () => {
  const [showForm, setShowForm] = useState(false);

  const formSchema = z.object({
    username: z
      .string()
      .min(3, {
        message: "Username must be at least 3 characters long",
      })
      .max(30),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <main
      className="flex items-center justify-center h-screen"
      onClick={() => setShowForm(true)}
    >
      {!showForm ? (
        <section>
          <div className="flex flex-col items-center text-center text-white">
            <h1 className="text-2xl font-bold mb-4">Welcome to</h1>
            <div>
              <Image
                className="mb-4"
                src="/logo.png"
                alt="image d'avion sur fond blanc"
                width={150}
                height={150}
              />
              <h2 className="text-3xl font-semibold mb-6">SkyTrack</h2>
            </div>
            <div>
              <p className="text-sm opacity-80 px-4 max-w-xs">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet,
                assumenda! Sint voluptate corporis a iure porro quibusdam
                expedita veritatis rerum praesentium, nisi vitae, modi, odit
                quod quaerat adipisci id harum!
              </p>
            </div>
          </div>
        </section>
      ) : (
        <section>
          <div className="flex flex-col items-center text-center text-white">
            <Image
              className=""
              src="/logo.png"
              alt="image d'avion sur fond blanc"
              width={140}
              height={140}
            />
            <h2 className="text-2xl font-semibold mb-6">SkyTrack</h2>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-center mb-3">Create your account</h2>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your username" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your email"
                          type="email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your password"
                          type="password"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Password must be at least 6 characters long.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex gap-4">
                  <Button type="submit" variant="outline">
                    Submit
                  </Button>
                  <Button asChild>
                    <Link href="/login">Login</Link>
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </section>
      )}
    </main>
  );
};

export default Welcome;
