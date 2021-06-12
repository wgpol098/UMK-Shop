import MainAdminLayout from "../../../layouts/admin/MainAdminLayout";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import { useEffect } from "react";
import jwt_decode from "jwt-decode";

export async function getServerSideProps(context) {
  let id = context.params.id;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENTRYPOINT}/products/${id}`
  );
  const product = res && (await res.json());

  return {
    props: {
      product: product,
    },
  };
}

export default function Product({ product }) {
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

  return isLoggedAdmin ? <MainAdminLayout type={1.1} product={product} /> : null;
}
