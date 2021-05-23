import MainLayout from "../../layouts/MainLayout";

export async function getStaticProps(context) {
  let id = context.params.id;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENTRYPOINT}/products/${id}`
  );
  const product = res && (await res.json());

  return {
    props: {
      product: product,
    },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  const res1 = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENTRYPOINT}/products`
  );
  const products = res1 && (await res1.json());

  let paths = [];
  products &&
    products.data.map((x) => {
      paths.push(`/products/${x._id}`);
    });

  return {
    paths: paths,
    fallback: true,
  };
}

export default function Product({ product }) {
  return <MainLayout type={1} product={product} />;
}
