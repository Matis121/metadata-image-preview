"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LuPlus } from "react-icons/lu";
import { useRef, useState } from "react";
import { Input } from "../ui/input";
import SubmitButton from "../submitButton";
import toast from "react-hot-toast";
import { z } from "zod";
import { createTag } from "@/server/actions/tags";

export default function TagForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const CollectionSchema = z.object({
    name: z.string(),
  });

  const handleSubmit = async (formData: FormData) => {
    const newTag = {
      name: formData.get("name") as string,
    };
    const result = CollectionSchema.safeParse(newTag);
    if (!result.success) {
      toast.error("Try again!");
      return;
    }
    await createTag(newTag.name);
    formRef.current?.reset();
    setOpenDialog(false);
  };

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <div className="text-neutral-300 flex items-center gap-1 mr-2 px-2 mt-1 dark:text-neutral-500 hover:cursor-pointer dark:hover:text-yellow-200">
          <LuPlus size={16} />
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create new tag</DialogTitle>
          <form
            ref={formRef}
            className="flex flex-col justify-center items-end gap-4 w-full mt-8"
            action={handleSubmit}
          >
            <Input name="name" type="text" required />
            <SubmitButton buttonValue="Confirm" />
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
