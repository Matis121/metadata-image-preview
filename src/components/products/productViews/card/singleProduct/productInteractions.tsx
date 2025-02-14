"use client";

import { useState } from "react";
import { deleteProduct } from "../../../../../server/actions/products";
import EditProductForm from "../../../editProduct/editProductForm";
import { LuTrash2, LuPencil } from "react-icons/lu";
import SpinnerAnimation from "@/components/spinnerAnimation";
import { Collection, Product, Tag } from "@/drizzle/schema";

type ProductTag = {
  id: number;
  productId: number;
  tagId: number;
  tagName: string;
};

type ProductInteractions = {
  clerkUserId: string;
  singleProduct: Product;
  collections: Collection[];
  tags: Tag[];
  productTags: ProductTag[];
};

export default function ProductInteractions({
  clerkUserId,
  singleProduct,
  collections,
  tags,
  productTags,
}: ProductInteractions) {
  const [isDeletingProduct, setIsDeletingProduct] = useState(false);
  const [openEditProdudct, setOpenEditProduct] = useState(false);

  const handleDeleteProduct = async () => {
    setIsDeletingProduct(true);
    await deleteProduct(singleProduct.id);
    setIsDeletingProduct(false);
  };

  return (
    <>
      <EditProductForm
        clerkUserId={clerkUserId}
        open={openEditProdudct}
        setOpen={setOpenEditProduct}
        productData={singleProduct}
        collections={collections}
        tags={tags}
        productTags={productTags}
      />
      <div
        className={`absolute top-0 right-0 ${isDeletingProduct && "opacity-70"}`}
      >
        <LuPencil
          size={35}
          onClick={() => setOpenEditProduct(true)}
          className="hover:cursor-pointer absolute flex top-2 right-12 p-2 bg-neutral-900 text-white shadow-md rounded-md hover:bg-neutral-700 transition-all"
        />
        {isDeletingProduct ? (
          <span className="absolute flex top-2 right-2 p-2 bg-neutral-900 text-white shadow-md rounded-md hover:bg-neutral-700 transition-all">
            <SpinnerAnimation />
          </span>
        ) : (
          <LuTrash2
            size={35}
            onClick={handleDeleteProduct}
            className="hover:cursor-pointer absolute flex top-2 right-2 p-2 bg-neutral-900 text-white shadow-md rounded-md hover:bg-neutral-700 transition-all"
          />
        )}
      </div>
    </>
  );
}
