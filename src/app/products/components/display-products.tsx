import { db } from "../../db";
import { images } from "../../db/schema";
import { ScrapedData } from "./scraped-data";

export async function DisplayProducts() {
  const allImages = await db.select().from(images);

  return (
    <section className="w-full mt-6 grid grid-cols-3 gap-5">
      {allImages.map((singleImage: any) => (
        <div key={singleImage.id}>
          <ScrapedData imageUrl={singleImage.url} />
        </div>
      ))}
    </section>
  );
}
