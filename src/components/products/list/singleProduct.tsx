"use client";

import { useState } from "react";
import { deleteProduct } from "../../../server/actions/products";
import EditProductForm from "../editProduct/editProductForm";
import Image from "next/image";
import { LuTrash2 } from "react-icons/lu";
import { LuPencil } from "react-icons/lu";
import Link from "next/link";

export default function SingleProduct({
  singleProduct,
  collections,
}: {
  singleProduct: any;
  collections: any;
}) {
  const [isDeletingProduct, setIsDeletingProduct] = useState(false);
  const [openEditProdudct, setOpenEditProduct] = useState(false);

  const handleDeleteProduct = async () => {
    setIsDeletingProduct(true);
    await deleteProduct(singleProduct.id);
    setIsDeletingProduct(false);
  };

  return (
    <div>
      <EditProductForm
        open={openEditProdudct}
        setOpen={setOpenEditProduct}
        productData={singleProduct}
        collections={collections}
      />
      <div
        className={`relative flex flex-col justify-center rounded-md aspect-square break-words border dark:border-neutral-600 overflow-hidden ${isDeletingProduct && "opacity-70"} hover:contrast-75`}
      >
        <LuPencil
          size={35}
          onClick={() => setOpenEditProduct(true)}
          className="hover:cursor-pointer absolute flex top-2 right-12 p-2 bg-neutral-800 text-white shadow-md rounded-md hover:bg-neutral-700 transition-all"
        />
        {isDeletingProduct ? (
          <span className="absolute flex top-2 right-2 p-2 bg-neutral-800 text-white shadow-md rounded-md hover:bg-neutral-700 transition-all">
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
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </span>
        ) : (
          <LuTrash2
            size={35}
            onClick={handleDeleteProduct}
            className="hover:cursor-pointer absolute flex top-2 right-2 p-2 bg-neutral-800 text-white shadow-md rounded-md hover:bg-neutral-700 transition-all"
          />
        )}
        <Link
          href={`${singleProduct.productUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full hover:cursor-pointer"
        >
          <Image
            alt="component image"
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
          <div className="flex justify-between dark:text-neutral-400 text-sm">
            <p>Website: xyz.pl</p>
            <p>11:52</p>
          </div>
        </div>
      </div>
    </div>
  );
}
