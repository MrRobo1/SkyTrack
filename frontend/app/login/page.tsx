"use client";
import { z } from "zod";
import Image from "next/image";
import Link from "next/link";
import { LOGIN_PILOT } from "@/app/lib/graphql/mutations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useMutation } from "@apollo/client";
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

const Login = () => {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);

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

  const [loginUser, { loading, error }] = useMutation(LOGIN_PILOT);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const { data } = await loginUser({
        variables: {
          loginData: {
            email: values.email,
            password: values.password,
          },
        },
      });

      const token = data?.login?.token;
      if (token) {
        localStorage.setItem("token", token);
        router.push("/dashboard");
      } else {
        console.error("Token is missing from the response");
      }
    } catch (error) {
      console.error("Error logging in:", error);
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
                {error && (
                  <p className="text-red-500 mt-2">Error: {error.message}</p>
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
};

export default Login;
