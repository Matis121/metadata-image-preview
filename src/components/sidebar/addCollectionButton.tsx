"use client";

import { LuPlus } from "react-icons/lu";
import { addCollection } from "@/server/actions/collections";
import { Button } from "../ui/button";

export default async function AddCollectionButton() {
  return (
    <Button onClick={async () => await addCollection()}>
      <LuPlus size={18} />
      Add new collection
    </Button>
  );
}
