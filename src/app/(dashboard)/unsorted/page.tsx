import { ListOfProducts } from "@/components/products/listOfProducts";

export default function Home() {
  return (
    <div className="w-full flex flex-col items-center gap-20">
      <p>unsorted</p>
      <ListOfProducts />
    </div>
  );
}
