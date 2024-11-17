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
import { updateProductCollection } from "@/server/actions/products";

export default function EditProductForm({
  open,
  setOpen,
  productData,
  collections,
}: any) {
  const handleSubmit = async (formData: FormData) => {
    const collectionId = formData.get("collection");
    await updateProductCollection(productData.id, collectionId);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit product</DialogTitle>
          <DialogDescription>Change your collection</DialogDescription>
        </DialogHeader>
        <form action={handleSubmit}>
          <Select name="collection">
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
          <DialogFooter>
            <Button>Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
