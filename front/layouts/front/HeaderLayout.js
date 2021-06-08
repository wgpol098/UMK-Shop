import {
  Navbar,
  NavDropdown,
  Form,
  FormControl,
  Button,
  Nav,
} from "react-bootstrap";
import { useCookies } from "react-cookie";
import { Basket2Fill, PersonSquare } from "react-bootstrap-icons";
import { useEffect, useState } from "react";

export default function HeaderLayout(props) {
  const [cartEmpty, setCartEmpty] = useState(true);
  const [cookies, setCookie, removeCookie] = useCookies("user");

  useEffect(async () => {
    const res1 = await fetch(
      `${process.env.NEXT_PUBLIC_API_ENTRYPOINT}/cart/`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        method: "GET",
      }
    )
      .then(async (data) => await data.json())
      .then((prods) => setCartEmpty(prods?.totalQuantity > 0 ? false : true));
  });

  console.log(cartEmpty);

  const handleLogout = async () => {
    try {
      // const res = await fetch(
      //   `${process.env.NEXT_PUBLIC_API_ENTRYPOINT}/user/logout`,
      //   {
      //     headers: {
      //       "Content-Type": "application/json",
      //       authorization: cookies.userToken,
      //     },
      //     method: "POST",
      //   }
      // );
      removeCookie("userToken");
      setTimeout(() => {
        location.reload();
      }, 10);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <header>
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
                alt="umk"
              />
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
              <span>ul. Gagarina 11, 87-100 Toruń</span>
              <span>
                Informacja o aktualnie dostępnej ofercie: tel. (56) 611 46 57.
              </span>
            </div>
            {props.isLoggedAdmin && (
              <Button
                style={{ margin: "auto 0 0 0" }}
                className="btn btn-blue-umk"
                href="/admin"
              >
                Panel Admina
              </Button>
            )}
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
              <Nav.Link href="/">Strona główna</Nav.Link>
              <Nav.Link href="/products">Lista produktów</Nav.Link>
              <Nav.Link href="/">Regulamin</Nav.Link>
              <Nav.Link href="/">Kontakt</Nav.Link>
            </Nav>
            <Nav.Link href="/koszyk" className="header-icon">
              <Basket2Fill />
              {!cartEmpty && <div className="basket-prods" />}
            </Nav.Link>
            <Nav.Link href="/user" className="header-icon">
              <PersonSquare />
            </Nav.Link>

            {!props.isLogged ? (
              <>
                <Button
                  variant="outline-light"
                  style={{ margin: "0 10px 0 0" }}
                  href="/login"
                >
                  Zaloguj się
                </Button>
                <Button
                  variant="outline-light"
                  style={{ margin: "0 10px 0 0" }}
                  href="/register"
                >
                  Zarejestruj się
                </Button>
              </>
            ) : (
              <Button
                variant="outline-light"
                style={{ margin: "0 10px 0 0", textTransform: "uppercase" }}
                onClick={handleLogout}
              >
                Wyloguj się
              </Button>
            )}
          </Navbar.Collapse>
        </Navbar>
      </div>
    </header>
  );
}
