import MainLayout from "../../../layouts/admin/MainAdminLayout";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import { useEffect } from "react";

// export async function getStaticProps(context) {
//   let id = context.params.id;

//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_API_ENTRYPOINT}/products/${id}`
//   );
//   const product = res && (await res.json());

//   return {
//     props: {
//       product: product,
//     },
//     revalidate: 10,
//   };
// }

export default function Product() {
  const [cookies] = useCookies("user");
  const router = useRouter();
  console.log(cookies.userToken);

  let isLogged = cookies.userToken ? true : false;

  useEffect(() => {
    if (!isLogged) router.push("/"); //TODO only admin
  });

  return isLogged ? <MainLayout type={2} /> : null;
}
