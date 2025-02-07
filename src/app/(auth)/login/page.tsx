import { SignInButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="w-full flex flex-col items-center gap-10">
      <h1 className="mb-4 text-xl text-neutral-800">Login to QuickLinks</h1>
      <SignInButton></SignInButton>
    </div>
  );
}
