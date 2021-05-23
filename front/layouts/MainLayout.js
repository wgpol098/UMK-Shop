import HeaderLayout from "./HeaderLayout";
import BodyIndexLayout from "./BodyIndexLayout";
import BodyLoginLayout from "./BodyLoginLayout";
import BodyProductLayout from "./BodyProductLayout";

import Head from "next/head";
import { useEffect } from "react";
import React from "react";

import { useCookies } from "react-cookie";

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
    default:
      return <BodyIndexLayout />;
  }
}

export default function MainLayout(props) {
  const [cookies] = useCookies("user");
  console.log(cookies.userToken);

  return (
    <div className="main-container">
      <Head>
        <title>Sklep internetowy UMK</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container">
        <HeaderLayout isLogged={cookies.userToken ? true : false} />
        {renderBody(props)}
      </div>

      {/* <div class="footer">
        <span>footer</span>
      </div> */}
    </div>
  );
}
