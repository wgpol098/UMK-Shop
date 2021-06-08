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

export default function BodyCartLayout(props) {
  const [cartData, setCartData] = useState(null);
  const [cookie, setCookie] = useCookies(["user"]);
  const router = useRouter();

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
      .then((prods) => setCartData(prods));
  }, []);

  const handleAdd = async (e, key) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_ENTRYPOINT}/cart/addtocart?id=${key}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          method: "POST",
        }
      );
      location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDel = async (e, key) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_ENTRYPOINT}/cart/removeonefromcart?id=${key}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          method: "POST",
        }
      );
      location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const handleFlush = async (e, key) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_ENTRYPOINT}/cart/removeallfromcart`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          method: "POST",
        }
      );
      location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  //console.log(props); //czy pobiera /carts?
  //console.log(Object.entries(cartData?.items));

  console.log(cartData);

  let cartElements = [];

  if (cartData?.items && Object.keys(cartData.items).length !== 0) {
    Object.entries(cartData.items).forEach(([key, value]) => {
      console.log(key, value);
      cartElements.push(
        <Row className="justify-content-md-center cart-element">
          <Col sm={6}>
            <span className="cart-title">
              <a href={`/products/${value.item._id}`}>{value.item.title}</a>
            </span>
          </Col>
          <Col sm={2}>
            <span className="cart-quantity">{value.qty}</span>
          </Col>
          <Col sm={2}>
            <span className="cart-price">{value.price} Zł</span>
          </Col>
          <Col sm={1}>
            <Button variant="outline-danger" onClick={(e) => handleDel(e, key)}>
              -
            </Button>
          </Col>
          <Col sm={1}>
            <Button
              variant="outline-success"
              onClick={(e) => handleAdd(e, key)}
            >
              +
            </Button>
          </Col>
        </Row>
      );
    });
  }

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div className="login-title">Koszyk</div>
      {/* <Form style={{ width: "250px" }} onSubmit={handleSubmit}>
        <Button variant="blue-umk" type="submit" block>
          Zaloguj
        </Button>
      </Form> */}
      {cartData?.totalQuantity > 0 ? (
        <>
          <Container className="cart-container">
            <Row className="cart-header">
              <Col sm={6}>
                <span className="cart-title">Nazwa produktu</span>
              </Col>
              <Col sm={2}>
                <span className="cart-quantity">Ilość</span>
              </Col>
              <Col sm={2}>
                <span className="cart-price">Cena</span>
              </Col>
            </Row>
            {cartElements}
            <Row className="cart-header">
              <Col sm={8}>
                <span className="cart-title">Podsumowanie: </span>
              </Col>
              <Col sm={2}>
                <span className="cart-price">{cartData.totalPrice} Zł</span>
              </Col>
            </Row>
            <Row className="justify-content-md-end">
              <Button className="btn btn-yellow-umk" onClick={handleFlush}>
                Wyczyszcz koszyk
              </Button>
            </Row>
          </Container>
          <Button className="btn btn-blue-umk" href="/order">
            Złóż zamówienie
          </Button>
        </>
      ) : (
        <div
          className="login-title"
          style={{ fontSize: "24px", border: "none" }}
        >
          Koszyk jest pusty
        </div>
      )}
    </div>
  );
}
