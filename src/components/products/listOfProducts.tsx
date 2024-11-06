import { db } from "../../drizzle";
import { images } from "../../drizzle/schema";
import { SingleProduct } from "./singleProduct";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { eq } from "drizzle-orm";

export default async function ListOfProducts() {
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
    <section className="flex flex-col gap-6">
      <div className="w-full grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
        {userImages.map((singleImage: any) => (
          <SingleProduct singleImage={singleImage} key={singleImage.id} />
        ))}
      </div>
      <div className="flex items-center justify-center text-neutral-400">
        <p>{userImages?.length} bookmarks</p>
      </div>
    </section>
  );
}
