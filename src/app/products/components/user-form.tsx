"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AddNewProduct } from "../server/addNewProduct";
import { useRef } from "react";
import { LuPlus } from "react-icons/lu";

export function NewUserForm() {
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (formData: FormData) => {
    const url = formData.get("url") as string;
    await AddNewProduct(url);
    formRef.current?.reset();
  };

  return (
    <div className="py-6 px-16 w-full flex items-center justify-center bg-white rounded-xl border shadow-sm">
      <form
        ref={formRef}
        className="flex flex-col justify-center items-center gap-4 w-[320px] md:w-[550px] md:flex-row"
        action={handleSubmit}
      >
        <Input
          name="url"
          type="text"
          placeholder="Paste your url to add new product..."
          required
        />
        <Button variant="outline">
          <LuPlus /> Add product
        </Button>
      </form>
    </div>
  );
}
