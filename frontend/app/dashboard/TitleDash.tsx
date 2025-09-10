"use client";

import { useQuery } from "@apollo/client";
import { GET_PROFILE } from "@/app/lib/graphql/queries";
import WelcomeTitle from "@/app/ui/dashboard/WelcomeTitle";

export default function TitleDash() {
  const { data, loading, error } = useQuery(GET_PROFILE);

  if (loading) return <p>Loading Title...</p>;
  if (error) return <p>Error loading Title: {error.message}</p>;
  if (!data || !data.getProfile) {
    return <p>You are not logged in.</p>;
  }

  const { name } = data.getProfile;

  return <WelcomeTitle username={name} />;
}
