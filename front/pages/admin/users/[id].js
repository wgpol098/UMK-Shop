import MainAdminLayout from "../../../layouts/admin/MainAdminLayout";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import { useEffect } from "react";
import jwt_decode from "jwt-decode";
import Cookies from "cookies";

export const getServerSideProps = async ({ req, res, query }) => {
  const id = query.id;
  const cookies = new Cookies(req, res);
  const token = cookies.get("userToken");

  let dataObj = {};
  await fetch(`${process.env.NEXT_PUBLIC_API_ENTRYPOINT}/user/${id}`, {
    headers: {
      "Content-Type": "application/json",
      authorization: token,
    },
    method: "GET",
  })
    .then(async (data) => await data.json())
    .then(async (_userData) => {
      //setUserData(_userData[0]);
      dataObj = _userData;
      await fetch(
        `${process.env.NEXT_PUBLIC_API_ENTRYPOINT}/address/${_userData.shipping_address_id}`,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: token,
          },
          credentials: "include",
          method: "GET",
        }
      )
        .then(async (data1) => await data1.json())
        .then((adr1) => Object.assign(dataObj, { shipping: adr1 }))
        .then(async () => {
          await fetch(
            `${process.env.NEXT_PUBLIC_API_ENTRYPOINT}/address/${_userData.invoice_address_id}`,
            {
              headers: {
                "Content-Type": "application/json",
                authorization: token,
              },
              method: "GET",
            }
          )
            .then(async (data2) => await data2.json())
            .then((adr2) => Object.assign(dataObj, { invoice: adr2 }));
        });
    });

  return {
    props: {
      user: dataObj,
    },
  };
};

export default function User({ user, token }) {
  const [cookies] = useCookies("user");
  const router = useRouter();
  console.log(token);

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

  return isLoggedAdmin ? <MainAdminLayout type={2.1} user={user} /> : null;
}
