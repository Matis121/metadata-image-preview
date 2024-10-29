import { ListOfProducts } from "@/app/products/_components/listOfProducts";
import { UserForm } from "@/app/products/_components/userForm";

export default async function Home() {
  return (
    <div className="w-full flex flex-col items-center gap-20">
      <UserForm />
      <ListOfProducts />
    </div>
  );
}
