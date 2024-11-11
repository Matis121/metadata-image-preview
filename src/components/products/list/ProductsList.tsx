import SingleProduct from "./singleProduct";

export default async function ListOfProducts({ products }) {
  return (
    <section className="flex flex-col gap-6">
      <div className="w-full grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
        {products?.map((singleProduct: any) => (
          <SingleProduct singleProduct={singleProduct} key={singleProduct.id} />
        ))}
      </div>
      <div className="flex items-center justify-center text-neutral-400">
        <p>{products?.length} bookmarks</p>
      </div>
    </section>
  );
}
