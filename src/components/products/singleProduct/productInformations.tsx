import { getSingleCollection } from "@/server/actions/collections";
import Image from "next/image";
import Link from "next/link";

export default async function productInformations({
  singleProduct,
  showCollection,
}: {
  singleProduct: any;
  showCollection?: boolean;
}) {
  const { singleCollection }: any = await getSingleCollection(
    singleProduct.collectionId
  );

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
        <div className="flex dark:text-neutral-400 text-sm">
          {showCollection && <p>Collection: {singleCollection.title}</p>}
        </div>
      </div>
    </div>
  );
}
