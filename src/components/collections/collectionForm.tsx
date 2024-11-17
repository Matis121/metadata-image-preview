"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LuPlus } from "react-icons/lu";
import { addCollection } from "@/server/actions/collections";
import { Button } from "../ui/button";
import { useRef, useState } from "react";
import { Input } from "../ui/input";
import SubmitButton from "../submitButton";
import toast from "react-hot-toast";
import { z } from "zod";

export default function CollectionForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [openDialog, setOpenDialog] = useState(false);

  const CollectionSchema = z.object({
    name: z.string(),
  });

  const handleSubmit = async (formData: FormData) => {
    const newCollection = {
      name: formData.get("name") as string,
    };

    const result = CollectionSchema.safeParse(newCollection);
    if (!result.success) {
      toast.error("Try again!");
      return;
    }

    await addCollection(newCollection.name);
    formRef.current?.reset();
    setOpenDialog(false);
  };

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <div className="text-neutral-300 flex items-center gap-1 px-4 mt-1 hover:cursor-pointer">
          <LuPlus size={18} />
          <p className="text-sm font-normal">New collection</p>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New collection</DialogTitle>
          <form
            ref={formRef}
            className="flex flex-col justify-center items-end gap-4 w-full mt-8"
            action={handleSubmit}
          >
            <Input name="name" type="text" required />
            <SubmitButton buttonValue="Add new" />
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
