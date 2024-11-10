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

export default function AddCollectionButton() {
  const formRef = useRef<HTMLFormElement>(null);
  const [openDialog, setOpenDialog] = useState(false);

  const CollectionSchema = z.object({
    name: z.string(),
  });

  const handleSubmit = async (formData: FormData) => {
    const newCollection = {
      name: formData.get("name") as string,
    };

    console.log(newCollection.name);

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
        <Button>
          <LuPlus size={18} />
          Add new collection
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New collection</DialogTitle>
          <DialogDescription>
            <form
              ref={formRef}
              className="flex flex-col justify-center items-end gap-4 w-full mt-8"
              action={handleSubmit}
            >
              <Input name="name" type="text" required />
              <SubmitButton buttonValue="Add new" />
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
