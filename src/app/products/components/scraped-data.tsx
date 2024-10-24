"use client";

import Image from "next/image";
import { LuX } from "react-icons/lu";
import { DeleteProduct } from "../server/deleteProduct";

export function ScrapedData({ singleImage }: { singleImage: any }) {
  console.log(singleImage.id);
  const printComponent = () => {
    if (singleImage.imagePath !== undefined) {
      return (
        <div className="relative flex items-center justify-center flex-col h-[400px] break-words border overflow-hidden hover:cursor-pointer">
          <span className="absolute top-2 right-2 p-2 border bg-white rounded-full hover:bg-neutral-100 transition-all">
            <LuX size={20} onClick={() => DeleteProduct(singleImage.id)} />
          </span>
          <a
            href={`${singleImage.productUrl}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              alt="component image"
              width={400}
              height={400}
              style={{ width: "100%", height: "auto" }}
              src={singleImage.imagePath}
            />
          </a>
        </div>
      );
    }
    return (
      <div className="relative h-full flex items-center justify-center border">
        <span className="absolute top-2 right-2 p-2 border bg-white rounded-full hover:bg-neutral-100 transition-all">
          <LuX size={20} />
        </span>
        <p>No image available.</p>
      </div>
    );
  };

  return <>{printComponent()}</>;
}
