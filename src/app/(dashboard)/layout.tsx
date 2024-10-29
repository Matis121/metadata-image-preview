import SignOutButton from "@/components/signOutButton";
import { Toaster } from "react-hot-toast";

function TopNav() {
  return (
    <nav className="flex items-center justify-between py-3 text-xl font-semibold border-b px-4 md:px-16 lg:px-24 bg-white shadow-sm">
      <div className="font-bold uppercase">Fitsy</div>
      <div>
        <SignOutButton />
      </div>
    </nav>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="w-full flex flex-col gap-8 mb-8 bg-neutral-100">
        <TopNav />
        <div className="px-4 md:px-16 lg:px-24">{children}</div>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
