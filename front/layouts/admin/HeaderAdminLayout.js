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
import { useRouter } from "next/router";

export default function HeaderLayout(props) {
  const router = useRouter();
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  const handleLogout = async () => {
    try {
      removeCookie("userToken");
      setTimeout(() => {
        router.push("/");
      }, 10);
    } catch (err) {
     
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
          <Button
            style={{ margin: "auto 0 0 0" }}
            className="btn btn-blue-umk"
            href="/"
          >
            Strona główna
          </Button>
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
            <Nav.Link href="/admin">Pulpit</Nav.Link>
            <Nav.Link href="/admin/products">Produkty</Nav.Link>
            <Nav.Link href="/admin/users">Użytkownicy</Nav.Link>
            <Nav.Link href="/admin/orders">Zamówienia</Nav.Link>
          </Nav>
          <Button
            variant="outline-light"
            style={{ margin: "0 10px 0 0", textTransform: "uppercase" }}
            onClick={handleLogout}
          >
            Wyloguj się
          </Button>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}
