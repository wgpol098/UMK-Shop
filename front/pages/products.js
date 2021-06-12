import MainLayout from "../layouts/front/MainLayout";

export const getServerSideProps = async ({ query: { page = 0, title } }) => {
  const filter = title
    ? JSON.stringify({ title: { $regex: `.*${title}.*`, $options: "i" } })
    : "{}";
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENTRYPOINT}/products?limit=9&page=${page}&filter=${filter}`
  );
  const products = res && (await res.json());
  return {
    props: {
      products: products,
      page: parseInt(page, 10),
    },
  };
};

export default function Products({ products, page }) {
  return (
    <>
      <MainLayout type={5} products={products} page={page} />
    </>
  );
}
