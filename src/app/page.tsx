import { DisplayProducts } from "./products/components/display-products";
import { NewUserForm } from "./products/components/user-form";

export default async function Home() {
  return (
    <div className="w-full flex flex-col items-center gap-20">
      <NewUserForm />
      <DisplayProducts />
    </div>
  );
}
