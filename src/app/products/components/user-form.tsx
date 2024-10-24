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
        className="flex flex-col justify-center items-center gap-4 w-[320px] md:w-[550px] md:flex-row"
        action={handleSubmit}
      >
        <Input
          name="url"
          type="text"
          placeholder="Here place your new product url..."
          required
        />
        <Button variant="outline">Add product</Button>
      </form>
    </>
  );
}
