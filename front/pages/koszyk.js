import MainLayout from "../layouts/front/MainLayout";

// export async function getServerSideProps() {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENTRYPOINT}/carts/`, {
//     headers: {
//       "Content-Type": "application/json",
//     },
//     credentials: "include",
//     method: "GET",
//   });

//   console.log(res);
//   const productsCart = res && (await res.json());

//   return {
//     props: {
//       productsCart: productsCart,
//     },
//     revalidate: 10,
//   };
// }

export default function Cart() {
// { productsCart }
  return (
    <>
      <MainLayout
        type={3} //productsCart={productsCart}
      />
    </>
  );
}
