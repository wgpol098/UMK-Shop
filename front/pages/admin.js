import MainAdminLayout from "../layouts/admin/MainAdminLayout";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import { useEffect } from "react";
import jwt_decode from "jwt-decode";

export default function Admin({ products }) {
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
    <MainAdminLayout type={0} />
  ) : null;
}
