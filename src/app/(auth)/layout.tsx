export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="w-full bg-neutral-100">
        <div className=" w-full h-screen flex items-center justify-center flex-colpx-4 md:px-16 lg:px-24">
          {children}
        </div>
      </body>
    </html>
  );
}
