import MainAdminLayout from "../layouts/admin/MainAdminLayout";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import { useEffect } from "react";
import jwt_decode from "jwt-decode";

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

  let decoded = null;

  try {
    decoded = jwt_decode(cookies.userToken);
  } catch (err) {
    console.log(err);
  }

  let isLoggedAdmin = decoded?.role == "admin" ? true : false;

  useEffect(() => {
    if (!isLoggedAdmin) router.push("/");
  });

  console.log(products);
  return isLoggedAdmin ? (
    <MainAdminLayout type={0} products={products} />
  ) : null;
}
