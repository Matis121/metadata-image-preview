import { db } from "../../../drizzle";
import { images } from "../../../drizzle/schema";
import { SingleProduct } from "./singleProduct";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { eq } from "drizzle-orm";

export async function ListOfProducts() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    return console.log("session not found");
  }
  const userImages = await db
    .select()
    .from(images)
    .where(eq(images.userId, session.user.id));

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
