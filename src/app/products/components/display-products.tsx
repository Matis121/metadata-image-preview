import { db } from "../../db";
import { images } from "../../db/schema";
import { ScrapedData } from "./scraped-data";

export async function DisplayProducts() {
  const allImages = await db.select().from(images);

  return (
    <section className="flex flex-col gap-8">
      <div className="w-full grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
        {allImages.map((singleImage: any) => (
          <div key={singleImage.id}>
            <ScrapedData singleImage={singleImage} />
          </div>
        ))}
      </div>
    </section>
  );
}
