import { LuFolder } from "react-icons/lu";

export default function CollectionHeader({
  headerName,
  emoji,
  isTagHeader,
}: {
  headerName: string;
  emoji?: string | null | undefined;
  isTagHeader?: boolean;
}) {
  return (
    <div className="flex gap-2 items-center py-2 -mt-1 px-4 dark:text-neutral-200 border-t dark:border-neutral-600">
      {emoji ? (
        <span>{emoji}</span>
      ) : isTagHeader ? (
        <p className="text-yellow-200">#</p>
      ) : (
        <LuFolder size={18} />
      )}
      <p className="font-semibold">{headerName}</p>
    </div>
  );
}
