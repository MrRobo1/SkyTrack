"use client";

import { z } from "zod";
import Image from "next/image";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/app/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/ui/form";
import { Input } from "@/app/ui/input";

export default function LoginForm() {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "An error occured");
      }
      router.push("/dashboard");
    } catch (error: unknown) {
      console.log("GRAPHQL=", process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT);

      console.error("Error logging in:", error);
      if (error instanceof Error) {
        setErrorMsg(error.message);
      } else {
        setErrorMsg("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      className="flex items-center justify-center h-screen"
      onClick={() => setShowForm(true)}
    >
      {!showForm ? (
        <section>
          <div className="flex flex-col items-center text-center text-white">
            <h1 className="text-2xl font-bold mb-4">Welcome Back to</h1>
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
                Connectez-vous pour accéder à votre tableau de bord et suivre
                vos informations de vol.
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
            <h2 className="text-center mb-3">Login</h2>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
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
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {errorMsg && (
                  <p className="text-red-500 mt-2">Error: {errorMsg}</p>
                )}
                <div className="flex gap-4">
                  <Button type="submit" variant="outline" disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                  </Button>
                  <Button asChild>
                    <Link href="/">Create Account</Link>
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </section>
      )}
    </main>
  );
}
