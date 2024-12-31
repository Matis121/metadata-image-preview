import { Product, ProductTag, Tag } from "@/drizzle/schema";
import { getSingleCollection } from "@/server/actions/collections";
import Image from "next/image";
import Link from "next/link";
import { LuFolder } from "react-icons/lu";

type ProductInformations = {
  singleProduct: Product;
  showCollection?: boolean;
  tags: Tag[];
  productTags: ProductTag[];
};

export default async function productInformations({
  singleProduct,
  showCollection,
  tags,
  productTags,
}: ProductInformations) {
  const singleCollection = await getSingleCollection(
    singleProduct.collectionId ?? 0
  );

  const getTagName = (id: number) => {
    const filteredTag = tags.find((tag: Tag) => tag.id === id);
    return filteredTag ? filteredTag.name : null;
  };

  return (
    <div className="relative flex flex-col justify-center rounded-md aspect-square break-words border dark:border-neutral-600 overflow-hidden">
      <Link
        href={`${singleProduct.productUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full hover:cursor-pointer"
      >
        <Image
          alt="Product Image"
          width={300}
          height={300}
          style={{ width: "100%" }}
          src={singleProduct.imagePath}
        />
      </Link>
      <div className="bg-white absolute bottom-0 px-3 py-2 w-full border-t flex flex-col gap-2 dark:bg-neutral-800">
        <p className="text-neutral-800 dark:text-neutral-200 text-[15px] font-semibold line-clamp-2">
          {singleProduct.title}
        </p>
        <div>
          {productTags && (
            <div className="flex flex-wrap gap-x-2">
              {productTags.map((tag) => (
                <p key={tag.id} className="text-sm text-yellow-200 font-light">
                  #{getTagName(tag.tagId)}
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
  );
}
