import { LuFolder } from "react-icons/lu";

export default function CollectionHeader({
  headerName,
}: {
  headerName: string;
}) {
  return (
    <div className="flex gap-2 items-center py-2 -mt-1 px-4 dark:text-neutral-200 border-t dark:border-neutral-600">
      <LuFolder size={18} />
      <p className="font-semibold">{headerName}</p>
    </div>
  );
}
