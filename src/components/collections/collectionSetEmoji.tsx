"use client";

import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Dispatch, SetStateAction } from "react";
import { setCollectionEmoji } from "@/server/actions/collections";

type Emoji = {
  native: string;
  unified: string;
  id: string;
  keywords: string[];
  shortcodes: string[];
  name: string;
};

export default function CollectionSetEmoji({
  open,
  setOpen,
  collectionId,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  collectionId: number;
}) {
  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="flex flex-col justify-center items-center gap-8">
          <DialogTitle>Set your icon</DialogTitle>
          <Picker
            data={data}
            onEmojiSelect={async (emoji: Emoji) => {
              await setCollectionEmoji(collectionId, emoji.native);
              setOpen(false);
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
