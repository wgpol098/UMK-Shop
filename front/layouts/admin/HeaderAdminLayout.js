import {
  Navbar,
  NavDropdown,
  Form,
  FormControl,
  Button,
  Nav,
} from "react-bootstrap";
import { useCookies } from "react-cookie";
import { Basket2Fill } from "react-bootstrap-icons";

export default function HeaderLayout(props) {
  const [cookies, setCookie, removeCookie] = useCookies(["userToken"]);

  const handleLogout = async () => {
    try {
      // const res = await fetch(
      //   `${process.env.NEXT_PUBLIC_API_ENTRYPOINT}/user/logout`,
      //   {
      //     body: JSON.stringify({}),
      //     headers: {
      //       "Content-Type": "application/json",
      //       authorization: cookies.userToken,
      //     },
      //     method: "POST",
      //   }
      // );

      // const result = await res.json();
      // console.log(result);
      removeCookie("userToken");
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="navbar-wrapper">
      <div style={{ display: "flex", margin: "0 10px 0 10px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            flex: 1,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img
              alt=""
              src="/img/logo-umk-big.png"
              width="350px"
              className="d-inline-block align-top"
            />{" "}
            <span style={{ fontSize: "25px", color: "#034ea1" }}>
              Sklep internetowy
            </span>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            flex: 1,
          }}
        >
          <div className="header-contact">
            <span style={{ fontSize: "25px", color: "#034ea1" }}>
              Panel admina
            </span>
          </div>
        </div>
      </div>
      <Navbar
        bg=""
        expand="lg"
        style={{
          padding: ".5rem 0 0 0",
          alignItems: "stretch",
        }}
      >
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse
          id="basic-navbar-nav"
          style={{ backgroundColor: "#034ea1", padding: "5px 0 5px 0" }}
        >
          <Nav className="mr-auto">
            <Nav.Link href="/admin">Produkty</Nav.Link>
            <Nav.Link href="/admin">Użytkownicy</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}
