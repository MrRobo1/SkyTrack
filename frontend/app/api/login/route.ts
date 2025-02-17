import { NextResponse } from "next/server";
import { LOGIN_PILOT } from "@/app/lib/graphql/mutations";
import { print } from "graphql";

const GRAPHQL_ENDPOINT = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT;

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    const queryString = print(LOGIN_PILOT);
    const variables = { loginData: { email, password } };

    const res = await fetch(GRAPHQL_ENDPOINT as string, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
      body: JSON.stringify({ query: queryString, variables }),
    });

    console.log("GraphQL status code:", res.status, res.statusText);

    if (!res.ok) {
      return NextResponse.json(
        { error: "GraphQL request failed" },
        { status: 500 }
      );
    }

    const responseBody = await res.json();
    const token = responseBody?.data?.login?.token;

    if (!token) {
      return NextResponse.json(
        { error: "Invalid credentials or no token returned" },
        { status: 401 }
      );
    }

    const response = NextResponse.json({ success: true });

    response.cookies.set({
      name: "token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
