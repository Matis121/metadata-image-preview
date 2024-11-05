"use client";

import Image from "next/image";
import { LuX } from "react-icons/lu";
import { useState } from "react";
import { DeleteProduct } from "../actions/deleteProduct";

export function SingleProduct({ singleImage }: { singleImage: any }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    await DeleteProduct(singleImage.id);
    setIsDeleting(false);
  };

  const printComponent = () => {
    if (singleImage.imagePath !== undefined) {
      return (
        <div
          className={`relative flex flex-col justify-center rounded-md aspect-square break-words border dark:border-neutral-600 overflow-hidden ${isDeleting && "opacity-70"}`}
        >
          {isDeleting ? (
            <span className="absolute flex top-2 right-2 p-2 bg-neutral-800 text-white shadow-md rounded-full hover:bg-neutral-700 transition-all">
              <svg
                className="h-5 w-5 animate-spin text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </span>
          ) : (
            <LuX
              size={35}
              onClick={handleDelete}
              className="hover:cursor-pointer absolute flex top-2 right-2 p-2 bg-neutral-800 text-white shadow-md rounded-full hover:bg-neutral-700 transition-all"
            />
          )}
          <a
            href={`${singleImage.productUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full hover:cursor-pointer"
          >
            <Image
              alt="component image"
              width={300}
              height={300}
              style={{ width: "100%" }}
              src={singleImage.imagePath}
            />
          </a>
          <div className="bg-white absolute bottom-0 px-3 py-2 w-full border-t flex flex-col gap-2 dark:bg-neutral-800">
            <p className="text-neutral-800 dark:text-neutral-300 text-[15px] font-semibold line-clamp-2">
              {singleImage.title}
            </p>
            <div className="flex justify-between dark:text-neutral-400 text-sm">
              <p>Website: xyz.pl</p>
              <p>11:52</p>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="relative h-full flex items-center justify-center border rounded-lg">
        <span className="absolute top-2 right-2 p-2 border bg-white rounded-full hover:bg-neutral-100 transition-all">
          <LuX size={20} />
        </span>
        <p>No image available.</p>
      </div>
    );
  };

  return <>{printComponent()}</>;
}
