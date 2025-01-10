"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { editCollection } from "@/server/actions/collections";
import { Dispatch, SetStateAction, useRef } from "react";
import { Input } from "../ui/input";
import SubmitButton from "../submitButton";
import toast from "react-hot-toast";
import { z } from "zod";

type CollectionEdit = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  collectionId: number;
  collectionTitle: string;
  isDropdownOpen: boolean;
};

export default function CollectionEditForm({
  open,
  setOpen,
  collectionId,
  collectionTitle,
  isDropdownOpen,
}: CollectionEdit) {
  const formRef = useRef<HTMLFormElement>(null);

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

    await editCollection(collectionId, newCollection.name);
    formRef.current?.reset();
    setOpen(false);
  };

  return (
    <Dialog open={open && !isDropdownOpen} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New collection name</DialogTitle>
          <form
            ref={formRef}
            className="flex flex-col justify-center items-end gap-4 w-full mt-8"
            action={handleSubmit}
          >
            <Input
              name="name"
              type="text"
              defaultValue={collectionTitle}
              required
            />
            <SubmitButton buttonValue="Confirm" />
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
