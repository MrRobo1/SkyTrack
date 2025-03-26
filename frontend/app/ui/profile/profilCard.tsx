interface ProfileCardProps {
  username: string;
  email: string;
  registration_date: string;
}
export default function ProfileCard({
  username,
  email,
  registration_date,
}: ProfileCardProps) {
  return (
    <main>
      <div className="max-w-md mx-auto bg-white rounded shadow p-4">
        <h2 className="text-xl font-bold mb-4">My Profile</h2>
        <p>Name: {username}</p>
        <p>Email: {email}</p>
        <p>Member since {registration_date}</p>
      </div>
    </main>
  );
}
