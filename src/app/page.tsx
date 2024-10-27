import { ListOfProducts } from "./products/_components/listOfProducts";
import { UserForm } from "./products/_components/userForm";

export default async function Home() {
  return (
    <div className="w-full flex flex-col items-center gap-20">
      <UserForm />
      <ListOfProducts />
    </div>
  );
}
