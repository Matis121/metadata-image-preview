import { Toaster } from "react-hot-toast";
import Navigation from "@/components/sidebar/sidebar";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full flex bg-neutral-50 dark:bg-neutral-800">
      <Toaster position="top-center" />
      <Navigation />
      <div className="w-full mb-8">
        <div className="flex flex-col gap-6">{children}</div>
      </div>
    </div>
  );
}
