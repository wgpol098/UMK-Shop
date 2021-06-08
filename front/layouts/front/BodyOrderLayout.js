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
  const [cartData, setCartData] = useState([]);
  const [deliveryData, setDeliveryData] = useState([]);
  const [paymentData, setPaymentData] = useState([]);
  const [selectedDelivery, setSelectedDelivery] = useState(null);
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
    //
    const res2 = await fetch(
      `${process.env.NEXT_PUBLIC_API_ENTRYPOINT}/delivery/`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        method: "GET",
      }
    )
      .then(async (data) => await data.json())
      .then((deliveries) => setDeliveryData(deliveries));
    //
    const res3 = await fetch(
      `${process.env.NEXT_PUBLIC_API_ENTRYPOINT}/payment/`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        method: "GET",
      }
    )
      .then(async (data) => await data.json())
      .then((payments) => setPaymentData(payments));
  }, []);

  console.log(cartData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const p_id = e.target.payment_id.value;
    const d_id = e.target.delivery_id.value;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_ENTRYPOINT}/order?status=0&payment_id=${p_id}&delivery_id=${d_id}`,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: cookie.userToken,
          },
          credentials: "include",
          method: "POST",
        }
      ).then((x) => {
        if (x?.status == 201) router.push("/order-success");
      });
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
        <Row className="justify-content-md-center cart-element">
          <Col sm={10}>
            <span className="cart-title">
              Dostawa: {selectedDelivery?.name}
            </span>
          </Col>
          <Col sm={2}>
            <span className="cart-price">{selectedDelivery?.price} Zł</span>
          </Col>
        </Row>
        <Row className="cart-header">
          <Col sm={10}>
            <span className="cart-title">Podsumowanie: </span>
          </Col>
          <Col sm={2}>
            <span className="cart-price">
              {cartData?.totalPrice + selectedDelivery?.price} Zł
            </span>
          </Col>
        </Row>
      </Container>
      <Form
        style={{ width: "350px", margin: "0 0 50px 0" }}
        onSubmit={handleSubmit}
      >
        <Form.Group>
          <Form.Label>Typ płatności</Form.Label>
          <Form.Control as="select" name="payment_id" required>
            {paymentData?.map((x) => (
              <option value={x._id}>{x.description}</option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Wybierz dostawę</Form.Label>
          <Form.Control
            as="select"
            name="delivery_id"
            required
            onChange={(e) =>
              setSelectedDelivery(
                deliveryData?.filter((x) => x._id == e.target.value)?.[0]
              )
            }
            value={selectedDelivery?._id}
          >
            {deliveryData?.map((x) => (
              <option value={x._id}>
                {x.name} {x.price != 0 && `(${x.price} ZŁ)`}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
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
