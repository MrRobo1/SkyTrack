"use client";
import { z } from "zod";
import Image from "next/image";
import Link from "next/link";
import { CREATE_PILOT } from "@/app/lib/graphql/mutations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import { Button } from "@/app/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/ui/form";
import { Input } from "@/app/ui/input";

export default function Register() {
  const router = useRouter();
  const [createUser, { loading, error }] = useMutation(CREATE_PILOT);

  const formSchema = z.object({
    name: z
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
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await createUser({
        variables: {
          newPilotData: {
            name: values.name,
            email: values.email,
            password: values.password,
            avatar: "",
          },
        },
      });
      router.push("/login");
    } catch (error) {
      console.error("Error creating user:", error);
    }
  }

  return (
    <main className="flex min-h-screen">
      <section className="flex flex-col items-center justify-center w-1/2 text-white p-8">
        <h1 className="text-2xl font-bold mb-4">Welcome to</h1>
        <div className="flex flex-col items-center">
          <Image
            className="mb-4"
            src="/logo.png"
            alt="image d'avion sur fond blanc"
            width={150}
            height={150}
          />
          <h2 className="text-3xl font-semibold mb-6">SkyTrack</h2>
        </div>
        <p className="text-sm opacity-80 px-4 max-w-xs text-center">
          Create a user account and start exploring a world of features. With
          SkyTrack, you can easily track each of your flights, analyze your
          distances traveled, and manage your statistics. Join the community of
          passionate pilots now and take flight towards better flight
          management!
        </p>
      </section>

      <section className="flex flex-col items-center justify-center w-1/2 p-8">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-center mb-3">Create your account</h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
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
              {error && (
                <p className="text-red-500 mt-2">Error: {error.message}</p>
              )}
              <div className="flex flex-col gap-4">
                <Button
                  className="bg-blue-500 text-white"
                  type="submit"
                  variant="outline"
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Submit"}
                </Button>
                <p className="text-sm flex items-center gap-2">
                  Already have an account?
                  <Link
                    className="text-blue-500 hover:text-blue-700 transition-colors"
                    href="/login"
                  >
                    Log in
                  </Link>
                </p>
              </div>
            </form>
          </Form>
        </div>
      </section>
    </main>
  );
}
