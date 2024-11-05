"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AddProduct } from "../actions/addProduct";
import { LuPlus } from "react-icons/lu";
import { useFormStatus } from "react-dom";
import { useRef } from "react";
import { z } from "zod";
import toast from "react-hot-toast";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button variant="outline" disabled={pending}>
      {pending ? (
        <svg
          className="h-5 w-5 animate-spin text-black"
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
      ) : (
        <LuPlus />
      )}
      Create product
    </Button>
  );
}
export function ProductForm() {
  const formRef = useRef<HTMLFormElement>(null);

  const ProductSchema = z.object({
    productUrl: z.string().url(),
  });

  const handleSumbit = async (formData: FormData) => {
    const newProduct = {
      productUrl: formData.get("url") as string,
    };
    const result = ProductSchema.safeParse(newProduct);
    if (!result.success) {
      toast.error("The url address is not correct");
      return;
    }

    await AddProduct(newProduct.productUrl);
    formRef.current?.reset();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <LuPlus />
          Add product
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add your new product</DialogTitle>
          <DialogDescription>
            <form
              ref={formRef}
              className="flex flex-col justify-center items-end gap-4 w-full mt-8"
              action={handleSumbit}
            >
              <Input
                name="url"
                type="text"
                placeholder="Paste your url to add new product..."
                required
              />
              <SubmitButton />
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
