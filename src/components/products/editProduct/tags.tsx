import { z } from "zod";
import {
  createTagAndAddToProduct,
  addTagsToProduct,
  removeTagFromProduct,
} from "@/server/actions/tags";
import { useMemo, useState } from "react";
import { Product, Tag } from "@/drizzle/schema";

type ProductTag = {
  id: number;
  productId: number;
  tagId: number;
  tagName: string;
};

export default function Tags({
  clerkUserId,
  tags,
  productTags,
  productData,
}: {
  clerkUserId: string;
  tags: Tag[];
  productTags: ProductTag[];
  productData: Product;
}) {
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const [tagName, setTagName] = useState("");

  const CollectionSchema = z.object({
    name: z.string().min(1).max(30),
  });

  // Filter out tags already used in the product
  const notUsedTags = useMemo(
    () =>
      tags.filter(
        (tag: Tag) =>
          !productTags.some(
            (productTag: ProductTag) => productTag.tagId === tag.id
          )
      ),
    [tags, productTags]
  );

  // Filter tags based on user input
  const filteredTags = useMemo(
    () =>
      notUsedTags.filter((tag: Tag) => tag.name && tag.name.includes(tagName)),
    [notUsedTags, tagName]
  );

  const handleKeyDown = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();

      if (filteredTags.length === 0) {
        const newTag = { name: tagName };
        const result = CollectionSchema.safeParse(newTag);
        if (!result.success) {
          return;
        }

        await createTagAndAddToProduct(
          clerkUserId,
          newTag.name,
          productData.id
        );
        setTagName("");
      } else {
        const selectedTag = filteredTags[highlightedIndex];
        await addTagsToProduct(clerkUserId, productData.id, [selectedTag.id]);
        setTagName("");
      }
    }
  };

  const handleRemoveTag = async (event: any, singleTagId: number) => {
    event.preventDefault();
    await removeTagFromProduct(productData.id, singleTagId);
  };

  const handleTagClick = async (event: any, tagId: number) => {
    event.preventDefault();
    await addTagsToProduct(clerkUserId, productData.id, [tagId]);
    setTagName("");
  };

  return (
    <div className="w-full border rounded-md shadow-sm flex flex-col">
      <div
        className={`flex gap-2 flex-wrap ${productTags.length > 0 ? "p-2" : null}`}
      >
        {productTags.map((singleTag: ProductTag) => (
          <button
            className="text-sm text-yellow-400 font-light hover:text-red-500 hover:cursor-pointer"
            key={singleTag.id}
            onClick={(event) => handleRemoveTag(event, singleTag.tagId)}
          >
            #{singleTag.tagName}
          </button>
        ))}
      </div>
      <div className="w-full relative">
        <input
          className="p-2 text-sm w-full bg-[--background]"
          name="name"
          type="text"
          value={tagName}
          onChange={(e) => setTagName(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add new tag..."
        />
        {tagName.length > 0 && filteredTags.length > 0 && (
          <div className="absolute flex flex-col gap-1 w-full p-2 bg-neutral-900 h-fit max-h-[160px] overflow-y-scroll">
            {filteredTags.map((singleTag: Tag, index: number) => (
              <p
                key={singleTag.id}
                className={`hover:cursor-pointer rounded-md px-2 py-1 ${highlightedIndex === index ? "bg-neutral-700" : ""}`}
                onMouseEnter={() => setHighlightedIndex(index)}
                onClick={(e) => handleTagClick(e, singleTag.id)}
              >
                #{singleTag.name}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
