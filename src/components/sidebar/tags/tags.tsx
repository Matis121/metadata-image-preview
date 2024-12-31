import { getTags } from "@/server/actions/tags";
import TagForm from "../../tags/tagForm";
import SingleTag from "./singleTag";

export default async function Tags() {
  const { tags } = await getTags();

  return (
    <div className="flex flex-col items-start w-full">
      <div className="flex justify-between w-full mb-1">
        <span className="px-4 py-1 dark:text-neutral-500 text-sm font-normal">
          Tags
        </span>
        <TagForm />
      </div>
      <div className="flex flex-col text-white w-full">
        {tags?.map((tag) => (
          <SingleTag id={tag.id.toString()} title={tag.name} key={tag.id} />
        ))}
      </div>
    </div>
  );
}
