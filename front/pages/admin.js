import MainAdminLayout from "../layouts/admin/MainAdminLayout";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import { useEffect } from "react";

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

export default function Admin({ products }) {
  const [cookies] = useCookies("user");
  const router = useRouter();
  console.log(cookies.userToken);

  let isLogged = cookies.userToken ? true : false;

  useEffect(() => {
    if (!isLogged) router.push("/"); //TODO only admin
  });

  console.log(products);
  return isLogged ? <MainAdminLayout type={0} products={products} /> : null;
}
