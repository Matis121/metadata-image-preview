export default function CollectionHeader({
  headerName,
}: {
  headerName: string;
}) {
  return (
    <div className="flex pb-2 px-4 dark:text-neutral-300 border-b dark:border-neutral-600">
      <p className="font-semibold">{headerName}</p>
    </div>
  );
}
