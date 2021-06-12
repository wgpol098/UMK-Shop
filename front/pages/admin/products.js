import MainAdminLayout from "../../layouts/admin/MainAdminLayout";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import { useEffect } from "react";
import jwt_decode from "jwt-decode";

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
  const [cookies] = useCookies("user");
  const router = useRouter();

  let decoded = null;

  try {
    decoded = jwt_decode(cookies.userToken);
  } catch (err) {
   
  }

  let isLoggedAdmin = decoded?.role == "admin" ? true : false;

  useEffect(() => {
    if (!isLoggedAdmin) router.push("/");
  });

  return isLoggedAdmin ? (
    <MainAdminLayout type={1} products={products} page={page} />
  ) : null;
}
