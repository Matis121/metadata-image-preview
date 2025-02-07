import { SignUpButton } from "@clerk/nextjs";

export default function Register() {
  return (
    <div className="w-full flex flex-col items-center gap-10">
      <h1 className="mb-4 text-xl text-neutral-800">Register to QuickLinks</h1>
      <SignUpButton></SignUpButton>
    </div>
  );
}
