"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
import { updateProduct } from "@/server/actions/products";
import { useEffect, useState } from "react";

export default function EditProductForm({
  open,
  setOpen,
  productData,
  collections,
}: any) {
  const [data, setData] = useState({
    image: productData.imagePath,
    title: productData.title,
    description: productData.description,
    collectionId: productData.collectionId,
  });

  useEffect(() => {
    console.log(data);
  }, [data]);

  const handleSubmit = async () => {
    await updateProduct(productData.id, data);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
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
              value={data.image}
              onChange={(e) =>
                setData((prevItems) => ({
                  ...prevItems,
                  image: e.target.value,
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
            />
          </div>
          <div>
            <label className="text-neutral-700 text-sm" htmlFor="collection">
              Collection
            </label>
            <Select
              name="collection"
              onValueChange={(value) =>
                setData((prevData) => ({
                  ...prevData,
                  collectionId: value,
                }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a collection" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="unsorted">Unsorted</SelectItem>
                </SelectGroup>
                <SelectGroup>
                  {collections.length > 0 && (
                    <SelectLabel>Collections</SelectLabel>
                  )}
                  {collections?.map((element) => (
                    <SelectItem key={element.id} value={element.id.toString()}>
                      {element.title}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <Button className="ml-auto mt-4">Save changes</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
