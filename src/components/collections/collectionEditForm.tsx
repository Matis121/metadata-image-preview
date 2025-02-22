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
import { CollectionOrTagSchema } from "@/schema/validations";

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

  const handleSubmit = async (formData: FormData) => {
    const newCollection = {
      name: formData.get("name") as string,
    };

    const result = CollectionOrTagSchema.safeParse(newCollection);
    if (!result.success) {
      result.error.errors.forEach((err) => {
        toast.error(`${err.message}`);
      });
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
