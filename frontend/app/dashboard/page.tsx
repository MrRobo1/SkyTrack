import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen text-white">
      <div className="pt-16 container mx-auto p-4 space-y-6">
        <h1 className="text-left text-2xl font-bold">Stat</h1>
      </div>

      <div>
        <h1>Last flight</h1>
      </div>
    </div>
  );
}
