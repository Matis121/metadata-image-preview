import { Button } from "@/components/ui/button";
import { Product } from "@/drizzle/schema";
import { getSingleCollection } from "@/server/actions/collections";
import Image from "next/image";
import Link from "next/link";
import { LuFolder } from "react-icons/lu";

type ProductInformations = {
  singleProduct: Product;
  showCollection?: boolean;
  productTags: ProductTag[];
};

type ProductTag = {
  id: number;
  productId: number;
  tagId: number;
  tagName: string;
};

export default async function productInformations({
  singleProduct,
  showCollection,
  productTags,
}: ProductInformations) {
  const singleCollection = await getSingleCollection(
    singleProduct.collectionId ?? 0
  );

  return (
    <>
      <div className="flex gap-8 border dark:border-neutral-600 rounded-md overflow-hidden min-h-48">
        <div className="min-w-48 max-w-48 overflow-hidden flex items-center justify-center border-r border-neutral-600">
          <Link
            href={`${singleProduct.productUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full hover:cursor-pointer flex justify-center items-center max-h-48"
          >
            <Image
              alt="Product Image"
              width={400}
              height={400}
              src={singleProduct.imagePath}
            />
          </Link>
        </div>
        <div className="flex flex-col gap-4 mr-24 w-full py-4">
          <Link
            href={`${singleProduct.productUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-800 dark:text-neutral-200 text-base font-semibold line-clamp-2 hover:cursor-pointer"
          >
            {singleProduct.title}
          </Link>
          <p className="text-neutral-800 dark:text-neutral-200 text-sm line-clamp-3">
            {singleProduct.description}
          </p>
          <div className="mt-auto">
            <div className="mb-2">
              {productTags && (
                <div className="flex flex-wrap gap-x-2">
                  {productTags.map((tag: ProductTag) => (
                    <p
                      key={tag.id}
                      className="text-sm text-yellow-200 font-light"
                    >
                      #{tag.tagName}
                    </p>
                  ))}
                </div>
              )}
            </div>
            <div className="flex dark:text-neutral-400 text-sm">
              {showCollection &&
                (singleCollection?.title === undefined ? (
                  <p className="px-2 rounded-md bg-yellow-100 text-neutral-600">
                    Unsorted
                  </p>
                ) : (
                  <div className="flex items-center gap-2 py-1">
                    <LuFolder />
                    <p>{singleCollection?.title}</p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
