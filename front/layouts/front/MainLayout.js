import HeaderLayout from "./HeaderLayout";
import BodyIndexLayout from "./BodyIndexLayout";
import BodyLoginLayout from "./BodyLoginLayout";
import BodyProductLayout from "./BodyProductLayout";
import BodyCartLayout from "./BodyCartLayout";
import BodyRegisterLayout from "./BodyRegisterLayout";
import BodyProductsLayout from "./BodyProductsLayout";
import BodyOrderLayout from "./BodyOrderLayout";
import BodyOrderSuccessLayout from "./BodyOrderSuccessLayout";
import BodyUserLayout from "./BodyUserLayout";

import Head from "next/head";
import { useEffect } from "react";
import React from "react";

import { useCookies } from "react-cookie";
import jwt_decode from "jwt-decode";

function renderBody(props) {
  switch (props.type) {
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
    case 6:
      return <BodyOrderLayout {...props} />;
    case 7:
      return <BodyOrderSuccessLayout {...props} />;
    case 8:
      return <BodyUserLayout {...props} />;
    default:
      return <BodyIndexLayout />;
  }
}

export default function MainLayout(props) {
  const [cookies] = useCookies("user");

  let decoded = null;

  try {
    if (cookies.userToken) decoded = jwt_decode(cookies.userToken);
  } catch (err) {
  }

  let isLoggedAdmin = decoded?.role == "admin" ? true : false;

  return (
    <div className="main-container">
      <Head>
        <title>Sklep internetowy UMK</title>
        <meta
          name="description"
          content="Sklep internetowy Uniwersytetu Mikołaja Kopernika (UMK)."
        ></meta>
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
