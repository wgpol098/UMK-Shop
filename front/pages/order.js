import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import MainLayout from "../layouts/front/MainLayout";

export default function Order() {
  const [cookies] = useCookies("user");
  const router = useRouter();

  useEffect(() => {
    if (!cookies.userToken) router.push("/login");
  });

  return <>{cookies.userToken ? <MainLayout type={6} /> : null}</>;
}
