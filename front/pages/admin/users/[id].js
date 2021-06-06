import MainAdminLayout from "../../../layouts/admin/MainAdminLayout";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import { useEffect } from "react";
import jwt_decode from "jwt-decode";
import Cookies from "cookies";

User.getInitialProps = async ({ req, res, query }) => {
  let id = query.id;
  const cookies = new Cookies(req, res);

  const res1 = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENTRYPOINT}/user/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
        authorization: cookies.get("userToken"),
      },
      credentials: "include",
      method: "GET",
    }
  );
  const user = res1 && (await res1.json());

  return {
    user: user,
  };
};

export default function User({ user }) {
  const [cookies] = useCookies("user");
  const router = useRouter();
  console.log(cookies.userToken);

  let decoded = null;

  if (cookies.userToken) {
    try {
      decoded = jwt_decode(cookies.userToken);
    } catch (err) {
      console.log(err);
    }
  }

  let isLoggedAdmin = decoded?.role == "admin" ? true : false;

  useEffect(() => {
    if (!isLoggedAdmin) router.push("/");
  });

  return isLoggedAdmin ? <MainAdminLayout type={2.1} user={user} /> : null;
}
