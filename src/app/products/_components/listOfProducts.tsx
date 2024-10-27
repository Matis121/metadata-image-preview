import { db } from "../../../drizzle";
import { images } from "../../../drizzle/schema";
import { SingleProduct } from "./singleProduct";

export async function ListOfProducts() {
  const allImages = await db.select().from(images);

  return (
    <div className="w-full grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
      {allImages.map((singleImage: any) => (
        <div key={singleImage.id}>
          <SingleProduct singleImage={singleImage} />
        </div>
      ))}
    </div>
  );
}
