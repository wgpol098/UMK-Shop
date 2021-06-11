import MainAdminLayout from "../../layouts/admin/MainAdminLayout";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import { useEffect } from "react";
import jwt_decode from "jwt-decode";
import Cookies from "cookies";

export const getServerSideProps = async ({ req, res, query: { page = 0 } }) => {
  const cookies = new Cookies(req, res);
  const token = cookies.get("userToken");

  const res1 = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENTRYPOINT}/order?limit=9&page=${page}&all=T`,
    {
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
      credentials: "include",
      method: "GET",
    }
  );
  const orders = res1 && (await res1.json());
  return {
    props: {
      orders: orders,
      page: parseInt(page, 10),
    },
  };
};

export default function Orders({ orders }) {
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

  console.log(orders);
  return isLoggedAdmin ? <MainAdminLayout type={3} orders={orders} /> : null;
}
