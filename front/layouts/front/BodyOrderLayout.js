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
  const [userData, setUserData] = useState({});
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

    try {
      let dataObj = {};
      await fetch(`${process.env.NEXT_PUBLIC_API_ENTRYPOINT}/user/`, {
        headers: {
          "Content-Type": "application/json",
          authorization: cookie.userToken,
        },
        method: "GET",
      })
        .then(async (data) => await data.json())
        .then(async (_userData) => {
          //setUserData(_userData[0]);
          dataObj = _userData[0];
          await fetch(
            `${process.env.NEXT_PUBLIC_API_ENTRYPOINT}/address/${_userData[0].shipping_address_id}`,
            {
              headers: {
                "Content-Type": "application/json",
                authorization: cookie.userToken,
              },
              method: "GET",
            }
          )
            .then(async (data1) => await data1.json())
            .then((adr1) => Object.assign(dataObj, { shipping: adr1 }))
            .then(async () => {
              await fetch(
                `${process.env.NEXT_PUBLIC_API_ENTRYPOINT}/address/${_userData[0].invoice_address_id}`,
                {
                  headers: {
                    "Content-Type": "application/json",
                    authorization: cookie.userToken,
                  },
                  method: "GET",
                }
              )
                .then(async (data2) => await data2.json())
                .then((adr2) =>
                  setUserData(Object.assign(dataObj, { invoice: adr2 }))
                );
            });
        });
    } catch (err) {
     
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const p_id = e.target.payment_id.value;
    const d_id = e.target.delivery_id.value;
    const city = e.target.city.value;
    const street = e.target.street.value;
    const zip = e.target.zip.value;
    const country = e.target.country.value;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_ENTRYPOINT}/order?status=0&payment_id=${p_id}&delivery_id=${d_id}&city=${city}&street=${street}&zip=${zip}&country=${country}`,
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
     
    }
  };

  let cartElements = [];

  if (cartData?.items && Object.keys(cartData.items).length !== 0) {
    Object.entries(cartData.items).forEach(([key, value]) => {
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
            <span className="cart-price">
              {selectedDelivery?.price ? selectedDelivery?.price : "-"} Zł
            </span>
          </Col>
        </Row>
        <Row className="cart-header">
          <Col sm={10}>
            <span className="cart-title">Podsumowanie: </span>
          </Col>
          <Col sm={2}>
            <span className="cart-price">
              {selectedDelivery?.price
                ? cartData?.totalPrice + selectedDelivery?.price
                : cartData?.totalPrice}{" "}
              Zł
            </span>
          </Col>
        </Row>
      </Container>
      <Form
        style={{ width: "350px", margin: "0 0 50px 0" }}
        onSubmit={handleSubmit}
      >
        <div className="login-title" style={{ fontSize: 24 }}>
          Adres dostawy
        </div>
        <Form.Group>
          <Form.Label>Miasto</Form.Label>
          <Form.Control
            type="text"
            name="city"
            placeholder="Miasto"
            required
            defaultValue={userData?.invoice?.city}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Ulica</Form.Label>
          <Form.Control
            type="text"
            name="street"
            placeholder="Adres do wysyłki"
            required
            defaultValue={userData?.invoice?.street}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>ZIP kod</Form.Label>
          <Form.Control
            type="text"
            name="zip"
            placeholder="ZIP"
            required
            defaultValue={userData?.invoice?.zip}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Państwo</Form.Label>
          <Form.Control
            type="text"
            name="country"
            placeholder="Państwo"
            required
            defaultValue={userData?.invoice?.country}
          />
        </Form.Group>
        <div className="login-title" style={{ fontSize: 24 }}>
          Typy dostawy
        </div>
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
