import { db } from "../../../drizzle";
import { images } from "../../../drizzle/schema";
import { SingleProduct } from "./singleProduct";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function ListOfProducts() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const userImages = await db
    .select()
    .from(images)
    .where({ userId: session?.user.id });

  return (
    <div className="w-full grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
      {userImages.map((singleImage: any) => (
        <div key={singleImage.id}>
          <SingleProduct singleImage={singleImage} />
        </div>
      ))}
    </div>
  );
}
