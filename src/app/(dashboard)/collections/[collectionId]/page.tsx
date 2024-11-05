import { ListOfProducts } from "@/app/products/_components/listOfProducts";

export default async function Home({
  params,
}: {
  params: {
    collectionId: string;
  };
}) {
  return (
    <div className="w-full flex flex-col items-center gap-20">
      <p>{params.collectionId}</p>
      <ListOfProducts />
    </div>
  );
}
