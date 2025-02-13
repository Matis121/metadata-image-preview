"use client";

import { Product } from "@/drizzle/schema";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

export const columns: ColumnDef<Product>[] = [
  {
    header: "Image",
    cell: ({ row }: any) => {
      return (
        <div className="w-14 h-14 rounded-md overflow-hidden">
          <Image
            alt="Product Image"
            width={300}
            height={300}
            style={{ width: "100%" }}
            src={row.original.imagePath}
          />
        </div>
      );
    },
  },
  {
    accessorKey: "title",
    header: "Name",
  },
  {
    header: "URL",
    cell: ({ row }: any) => {
      return (
        <div>
          <a href={`${row.original.productUrl}`}>{row.original.productUrl}</a>
        </div>
      );
    },
  },
];
