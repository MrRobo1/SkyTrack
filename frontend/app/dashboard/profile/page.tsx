"use client";
import { useQuery } from "@apollo/client";
import { GET_PROFILE } from "@/app/lib/graphql/queries";
import ProfileCard from "@/app/ui/profile/profilCard";

export default function Page() {
  const { data, loading, error } = useQuery(GET_PROFILE);

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p>Error loading profile: {error.message}</p>;
  if (!data || !data.getProfile) {
    return <p>You are not logged in.</p>;
  }

  const { name, email, registration_date } = data.getProfile;

  const rawDate = new Date(registration_date);
  const fomattedDate = rawDate.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <ProfileCard
      username={name}
      email={email}
      registration_date={fomattedDate}
    />
  );
}
