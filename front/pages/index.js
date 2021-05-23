import MainLayout from "../layouts/front/MainLayout";

export async function getStaticProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENTRYPOINT}/products`);
  const products = res && (await res.json());

  return {
    props: {
      products: products,
    },
    revalidate: 10,
  };
}

export default function Index({ products }) {
  console.log(products);
  return (
    <>
      <MainLayout type={0} products={products} />
    </>
  );
}
