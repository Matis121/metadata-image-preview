"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Collection, Product, Tag } from "@/drizzle/schema";
import { updateProduct } from "@/server/actions/products";
import { addTagsToProduct } from "@/server/actions/tags";
import { Dispatch, SetStateAction, useState } from "react";
import Tags from "./tags";

type ProductTag = {
  id: number;
  productId: number;
  tagId: number;
  tagName: string;
};

type EditProduct = {
  clerkUserId: string;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  productData: Product;
  collections: Collection[];
  tags: Tag[];
  productTags: ProductTag[];
};

export default function EditProductForm({
  clerkUserId,
  open,
  setOpen,
  productData,
  collections,
  tags,
  productTags,
}: EditProduct) {
  const [data, setData] = useState<Partial<Product>>({
    title: productData.title,
    description: productData.description,
    collectionId: productData.collectionId,
    imagePath: productData.imagePath,
  });

  const [productTagId, setProductTagId] = useState<number>();

  const handleSubmit = async () => {
    await updateProduct(productData.id, data as Product);
    if (productTagId !== undefined) {
      await addTagsToProduct(clerkUserId, productData.id, [productTagId]);
    }
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="md:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Edit product</DialogTitle>
          <DialogDescription>Change your collection</DialogDescription>
        </DialogHeader>
        <form action={handleSubmit} className="flex flex-col gap-2">
          <div>
            <label className="text-neutral-700 text-sm" htmlFor="image">
              Image
            </label>
            <Input
              type="text"
              name="image"
              id="image"
              value={data.imagePath}
              onChange={(e) =>
                setData((prevItems) => ({
                  ...prevItems,
                  imagePath: e.target.value,
                }))
              }
            />
          </div>
          <div>
            <label className="text-neutral-700 text-sm" htmlFor="name">
              Title
            </label>
            <Input
              type="text"
              name="name"
              id="name"
              value={data.title}
              onChange={(e) =>
                setData((prevData) => ({
                  ...prevData,
                  title: e.target.value,
                }))
              }
            />
          </div>
          <div>
            <label className="text-neutral-700 text-sm" htmlFor="description">
              Description
            </label>
            <Textarea
              name="description"
              id="description"
              value={data.description}
              onChange={(e) =>
                setData((prevData) => ({
                  ...prevData,
                  description: e.target.value,
                }))
              }
              className="min-h-28"
            />
          </div>
          <div>
            <label className="text-neutral-700 text-sm" htmlFor="collection">
              Collection
            </label>
            <Select
              name="collection"
              value={data.collectionId?.toString()}
              onValueChange={(value) =>
                setData((prevData) => ({
                  ...prevData,
                  collectionId: parseFloat(value),
                }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a collection" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="0">Unsorted</SelectItem>
                </SelectGroup>
                <SelectGroup>
                  {collections.length > 0 && (
                    <SelectLabel>Collections</SelectLabel>
                  )}
                  {collections?.map((collection: Collection) => (
                    <SelectItem
                      key={collection.id}
                      value={collection.id.toString()}
                    >
                      {collection.title}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-neutral-700 text-sm" htmlFor="tag">
              Tags
            </label>
            <Tags
              clerkUserId={clerkUserId}
              tags={tags}
              productTags={productTags}
              productData={productData}
            />
          </div>
          <Button className="ml-auto mt-4">Save changes</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
