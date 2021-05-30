import MainLayout from "../layouts/front/MainLayout";

export async function getStaticProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENTRYPOINT}/carts`);
  const productsCart = res && (await res.json());

  return {
    props: {
      productsCart: productsCart,
    },
    revalidate: 10,
  };
}

export default function Cart({ productsCart }) {
  return (
    <>
      <MainLayout type={3} productsCart={productsCart} />
    </>
  );
}
