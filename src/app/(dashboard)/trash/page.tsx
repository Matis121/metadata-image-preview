import { ListOfProducts } from "@/app/products/_components/listOfProducts";

export default async function Home() {
  return (
    <div className="w-full flex flex-col items-center gap-20">
      <p>trash</p>
      <ListOfProducts />
    </div>
  );
}
