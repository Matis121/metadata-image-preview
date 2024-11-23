"use client";

import { useState } from "react";
import { deleteProduct } from "../../../server/actions/products";
import EditProductForm from "../editProduct/editProductForm";
import Image from "next/image";
import { LuTrash2 } from "react-icons/lu";
import { LuPencil } from "react-icons/lu";
import Link from "next/link";
import SpinnerAnimation from "@/components/spinnerAnimation";

export default function SingleProduct({
  singleProduct,
  collections,
  showCollection,
}: {
  singleProduct: any;
  collections: any;
  showCollection?: boolean;
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
            <SpinnerAnimation />
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
          <div className="flex dark:text-neutral-400 text-sm">
            {showCollection && <p>Collection: {singleProduct.collectionId}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
