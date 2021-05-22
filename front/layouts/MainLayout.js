import HeaderLayout from "./HeaderLayout";
import BodyIndexLayout from "./BodyIndexLayout";

import Head from "next/head";
import { useEffect } from "react";
import React from "react";

function renderBody(props) {
  switch (props.type) {
    // case -1:
    //   return <BodyLoading />;
    // case 404:
    //   return <BodyNotFound />;
    case 0:
      return <BodyIndexLayout {...props} />;
    // case 1:
    //   return <BodyProduct />;
    default:
      return <BodyIndexLayout />;
  }
}

export default function MainLayout(props) {
  return (
    <div className="main-container">
      <Head>
        <title>Sklep internetowy UMK</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container">
        <HeaderLayout />
        {renderBody(props)}
      </div>

      <div class="footer">
        <span>footer</span>
      </div>
    </div>
  );
}
