import MainAdminLayout from "../../layouts/admin/MainAdminLayout";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import { useEffect } from "react";
import jwt_decode from "jwt-decode";

Orders.getInitialProps = async ({ req, res }) => {
  const res1 = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENTRYPOINT}/orders`
  );
  const orders = res1 && (await res1.json());
  return {
    orders: orders,
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
  return isLoggedAdmin ? (
    <MainAdminLayout type={3} orders={orders} />
  ) : null;
}
