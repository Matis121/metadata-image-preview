import { ProductForm } from "@/components/products/productForm";
import { Toaster } from "react-hot-toast";
import Navigation from "@/components/sidebar/navigation";

export default async function RootLayout({
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
