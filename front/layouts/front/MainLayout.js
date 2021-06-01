import HeaderLayout from "./HeaderLayout";
import BodyIndexLayout from "./BodyIndexLayout";
import BodyLoginLayout from "./BodyLoginLayout";
import BodyProductLayout from "./BodyProductLayout";
import BodyCartLayout from "./BodyCartLayout";
import BodyRegisterLayout from "./BodyRegisterLayout";

import Head from "next/head";
import { useEffect } from "react";
import React from "react";

import { useCookies } from "react-cookie";
import jwt_decode from "jwt-decode";
import BodyProductsLayout from "./BodyProductsLayout";

function renderBody(props) {
  switch (props.type) {
    // case -1:
    //   return <BodyLoading />;
    // case 404:
    //   return <BodyNotFound />;
    case 0:
      return <BodyIndexLayout {...props} />;
    case 1:
      return <BodyProductLayout {...props} />;
    case 2:
      return <BodyLoginLayout {...props} />;
    case 3:
      return <BodyCartLayout {...props} />;
    case 4:
      return <BodyRegisterLayout {...props} />;
    case 5:
      return <BodyProductsLayout {...props} />;
    default:
      return <BodyIndexLayout />;
  }
}

export default function MainLayout(props) {
  const [cookies] = useCookies("user");
  console.log(cookies.userToken);

  let decoded = null;

  try {
    if (cookies.userToken) decoded = jwt_decode(cookies.userToken);
  } catch (err) {
    console.log(err);
  }

  let isLoggedAdmin = decoded?.role == "admin" ? true : false;

  return (
    <div className="main-container">
      <Head>
        <title>Sklep internetowy UMK</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container">
        <HeaderLayout
          isLogged={cookies.userToken ? true : false}
          isLoggedAdmin={isLoggedAdmin}
        />
        {renderBody(props)}
      </div>
      {/* <div class="footer">
        <span>footer</span>
      </div> */}
    </div>
  );
}
