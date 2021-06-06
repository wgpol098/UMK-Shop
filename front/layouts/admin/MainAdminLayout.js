import HeaderAdminLayout from "./HeaderAdminLayout";
import BodyAdminProductsLayout from "./Products/BodyAdminProductsLayout";
import BodyAdminProductEdit from "./Products/BodyAdminProductEdit";
import BodyAdminProductCreate from "./Products/BodyAdminProductCreate";
import BodyAdminDashboardLayout from "./BodyAdminDashboardLayout";
import BodyAdminUsersLayout from "./Users/BodyAdminUsersLayout";
import BodyAdminUserEdit from "./Users/BodyAdminUserEdit";
import BodyAdminUserCreate from "./Users/BodyAdminUserCreate";

import Head from "next/head";
import { useEffect } from "react";
import React from "react";

function renderBody(props) {
  switch (props.type) {
    case 0:
      return <BodyAdminDashboardLayout {...props} />;
    case 1:
      return <BodyAdminProductsLayout {...props} />;
    case 1.1:
      return <BodyAdminProductEdit {...props} />;
    case 1.2:
      return <BodyAdminProductCreate {...props} />;
    case 2:
      return <BodyAdminUsersLayout {...props} />;
    case 2.1:
      return <BodyAdminUserEdit {...props} />;
    case 2.2:
      return <BodyAdminUserCreate {...props} />;
    default:
      return <BodyAdminDashboardLayout {...props} />;
  }
}

export default function MainLayout(props) {
  return (
    <div className="main-container">
      <Head>
        <title>Sklep internetowy UMK - Panel Admina</title>
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
