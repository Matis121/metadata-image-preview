import SignOutButton from "@/components/signOutButton";
import { LuTrash2 } from "react-icons/lu";
import { LuGlobe2 } from "react-icons/lu";
import { LuShapes } from "react-icons/lu";
import { ProductForm } from "@/app/products/_components/productForm";
import { Toaster } from "react-hot-toast";

function Navigation() {
  return (
    <nav className="sticky top-0 h-[100vh] w-[380px] flex flex-col gap-4 py-3 text-xl font-semibold bg-white dark:bg-neutral-900 shadow-sm border-r dark:border-neutral-600">
      <a className="font-bold dark:text-neutral-300 px-4" href="/">
        QuickLinks
      </a>
      <div className="flex flex-col">
        <a
          href=""
          className="dark:text-neutral-300 text-[15px] font-normal flex justify-between px-4 py-1 hover:dark:bg-neutral-800"
        >
          <div className="flex gap-2 items-center">
            <LuGlobe2 size={18} />
            <p>All bookmarks</p>
          </div>
          <span>38</span>
        </a>
        <a
          href=""
          className="dark:text-neutral-300 text-[15px] font-normal flex justify-between px-4 py-1 hover:dark:bg-neutral-800"
        >
          <div className="flex gap-2 items-center">
            <LuShapes size={18} />
            <p>Unsorted</p>
          </div>
          <span>7</span>
        </a>
        <a
          href=""
          className="dark:text-neutral-300 text-[15px] font-normal flex justify-between px-4 py-1 hover:dark:bg-neutral-800"
        >
          <div className="flex gap-2 items-center">
            <LuTrash2 size={18} />
            <p>Trash</p>
          </div>
          <span>21</span>
        </a>
      </div>
      <div className="mt-auto">
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
      <body className="w-full flex bg-neutral-50 dark:bg-neutral-800">
        <Navigation />
        <div className="py-3 w-full">
          <div className="flex flex-col gap-6">
            <div className="flex w-full justify-end px-4">
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
