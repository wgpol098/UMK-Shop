import HeaderAdminLayout from "./HeaderAdminLayout";
import BodyAdminProductsLayout from "./BodyAdminProductsLayout";
import BodyAdminProductEdit from "./BodyAdminProductEdit";
import BodyAdminProductCreate from "./BodyAdminProductCreate";

import Head from "next/head";
import { useEffect } from "react";
import React from "react";

function renderBody(props) {
  switch (props.type) {
    case 0:
      return <BodyAdminProductsLayout {...props} />;
    case 1:
      return <BodyAdminProductEdit {...props} />;
    case 2:
      return <BodyAdminProductCreate {...props} />;
    default:
      return <BodyAdminProductsLayout {...props} />;
  }
}

export default function MainLayout(props) {
  return (
    <div className="main-container">
      <Head>
        <title>Sklep internetowy UMK Panel Admina</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container">
        <HeaderAdminLayout />
        {renderBody(props)}
      </div>

      {/* <div class="footer">
        <span>footer</span>
      </div> */}
    </div>
  );
}
