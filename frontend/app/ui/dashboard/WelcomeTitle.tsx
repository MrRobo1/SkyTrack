interface ProfileCardProps {
  username: string;
}

export default function WelcomeTitle({ username }: ProfileCardProps) {
  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-bold">
        Good to see you {username}!
      </h1>
    </div>
  );
}
