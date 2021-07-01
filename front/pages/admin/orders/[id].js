import MainAdminLayout from "../../../layouts/admin/MainAdminLayout";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import { useEffect } from "react";
import jwt_decode from "jwt-decode";

export async function getServerSideProps(context) {
  let id = context.params.id;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENTRYPOINT}/order/${id}`
  );
  const order = res && (await res.json());

  return {
    props: {
      order: order,
    },
  };
}

export default function Order({ order }) {
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

  return isLoggedAdmin ? <MainAdminLayout type={3.1} order={order} /> : null;
}
