import {
  Navbar,
  NavDropdown,
  Form,
  FormControl,
  Button,
  Nav,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function BodyOrderLayout(props) {
  const [cartData, setCartData] = useState(null);
  const [cookie, setCookie] = useCookies(["user"]);
  const router = useRouter();

  useEffect(async () => {
    const res1 = await fetch(
      `${process.env.NEXT_PUBLIC_API_ENTRYPOINT}/carts/`,
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

  console.log(cartData);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_ENTRYPOINT}/order?status=0`,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: cookie.userToken,
          },
          credentials: "include",
          method: "POST",
        }
      );

      if (res?.status == 200) router.push("/order-success");
    } catch (err) {
      console.log(err);
    }
  };

  let cartElements = [];

  if (cartData?.items && Object.keys(cartData.items).length !== 0) {
    Object.entries(cartData.items).forEach(([key, value]) => {
      console.log(key, value);
      cartElements.push(
        <Row className="justify-content-md-center cart-element">
          <Col sm={8}>
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
      <div className="login-title">Składanie zamówienia</div>
      <Container className="cart-container">
        <Row className="cart-header">
          <Col sm={8}>
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
          <Col sm={10}>
            <span className="cart-title">Podsumowanie: </span>
          </Col>
          <Col sm={2}>
            <span className="cart-price">{cartData?.totalPrice} Zł</span>
          </Col>
        </Row>
      </Container>
      <Form
        style={{ width: "350px", margin: "0 0 50px 0" }}
        onSubmit={handleSubmit}
      >
        <Form.Group>
          <Form.Check
            type="checkbox"
            value="1"
            label="Zgadzam się że moje dane, w tym adresy do wysyłki i do korespodencji są prawidłowe"
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Check
            type="checkbox"
            value="2"
            label="Zgadzam się że ten projekt jest najlepszy i mam wstawić ocenę bardzo dobrą"
            required
          />
        </Form.Group>
        <div>
          <Button
            className="btn-blue-umk"
            type="submit"
            block
            style={{ margin: "25px 0 0 0" }}
          >
            Zamów
          </Button>
          <Button
            className="btn-yellow-umk"
            href="/koszyk"
            block
            style={{ margin: "25px 0 0 0" }}
          >
            Anuluj
          </Button>
        </div>
      </Form>
    </div>
  );
}
