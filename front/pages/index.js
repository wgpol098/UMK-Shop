import MainLayout from "../layouts/MainLayout";

export async function getStaticProps() {
  const res = await fetch(
    `${process.env.API_ENTRYPOINT}/products/getallproducts`
  );
  const products = res && (await res.json());

  console.log(process.env.API_ENTRYPOINT);
  return {
    props: {
      products: products,
    },
    revalidate: 10,
  };
}

export default function Index({ products }) {
  return (
    <>
      <MainLayout type={0} products={products} />
    </>
  );
}
