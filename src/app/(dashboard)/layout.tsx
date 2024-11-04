import SignOutButton from "@/components/signOutButton";
import { ProductForm } from "@/app/products/_components/productForm";
import { Toaster } from "react-hot-toast";

function Navigation() {
  return (
    <nav className="h-[100vh] w-[300px] flex flex-col justify-between p-3 text-xl font-semibold bg-white dark:bg-neutral-950 shadow-sm border-r dark:border-neutral-600">
      <a className="font-bold uppercase dark:text-neutral-200" href="/">
        Fitsy
      </a>
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
      <body className="w-full flex bg-neutral-50 dark:bg-neutral-950">
        <Navigation />
        <div className="px-6 py-3">
          <div className="flex flex-col gap-6">
            <div className="flex w-full justify-end">
              <ProductForm />
            </div>
            <div>{children}</div>
          </div>
        </div>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
