"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Dispatch, SetStateAction, useRef } from "react";
import { Input } from "../ui/input";
import SubmitButton from "../submitButton";
import toast from "react-hot-toast";
import { z } from "zod";
import { editTag } from "@/server/actions/tags";

type TagEdit = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  tagId: number;
  tagTitle: string;
  isDropdownOpen: boolean;
};

export default function TagEditForm({
  open,
  setOpen,
  tagId,
  tagTitle,
  isDropdownOpen,
}: TagEdit) {
  const formRef = useRef<HTMLFormElement>(null);
  const CollectionSchema = z.object({
    name: z.string(),
  });

  const handleSubmit = async (formData: FormData) => {
    const newTagName = {
      name: formData.get("name") as string,
    };
    const result = CollectionSchema.safeParse(newTagName);
    if (!result.success) {
      toast.error("Try again!");
      return;
    }
    await editTag(tagId, newTagName.name);
    formRef.current?.reset();
    setOpen(false);
  };

  return (
    <Dialog open={open && !isDropdownOpen} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New tag name</DialogTitle>
          <form
            ref={formRef}
            className="flex flex-col justify-center items-end gap-4 w-full mt-8"
            action={handleSubmit}
          >
            <Input name="name" type="text" defaultValue={tagTitle} required />
            <SubmitButton buttonValue="Confirm" />
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
