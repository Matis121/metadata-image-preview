"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AddNewProduct } from "../server/addNewProduct";
import { useRef } from "react";

export function NewUserForm() {
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (formData: FormData) => {
    const url = formData.get("url") as string;
    await AddNewProduct(url);
    formRef.current?.reset();
  };

  return (
    <>
      <form
        ref={formRef}
        className="flex items-center gap-2 w-[550px]"
        action={handleSubmit}
      >
        <Input
          name="url"
          type="text"
          placeholder="Here place your new product url..."
          required
        />
        <Button variant="outline" className="self-end">
          Add product
        </Button>
      </form>
    </>
  );
}
