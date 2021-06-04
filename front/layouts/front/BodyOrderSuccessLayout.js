import { useEffect, useState } from "react";
import {
  Navbar,
  NavDropdown,
  Form,
  FormControl,
  Button,
  Nav,
  Container,
  Col,
  Row,
} from "react-bootstrap";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";

export default function BodyOrderSuccessLayout(props) {
  const [cookie, setCookie] = useCookies(["user"]);
  const router = useRouter();

  //console.log(props); //czy pobiera /carts?
  //console.log(Object.entries(cartData?.items));

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div className="login-title">Zamówinie zostało złożone</div>
      <div
        className="login-title"
        style={{ borderBottom: "none", fontSize: "28px" }}
      >
        Dziękujemy!
        <br />
        Skontaktujemy się z Tobą w najbliższym czasie
      </div>
    </div>
  );
}
