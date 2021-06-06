import MainAdminLayout from "../../layouts/admin/MainAdminLayout";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import { useEffect } from "react";
import jwt_decode from "jwt-decode";
import Cookies from "cookies";

Users.getInitialProps = async ({ req, res }) => {
  const cookies = req && new Cookies(req, res);
  const res1 = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENTRYPOINT}/user?all=T`,
    {
      headers: {
        "Content-Type": "application/json",
        authorization: cookies?.get("userToken"),
      },
      credentials: "include",
      method: "GET",
    }
  );
  const users = res1 && (await res1.json());
  return {
    users: users,
  };
};

export default function Users({ users }) {
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

  console.log(users);
  return isLoggedAdmin ? <MainAdminLayout type={2} users={users} /> : null;
}
