import {
  Navbar,
  NavDropdown,
  Form,
  FormControl,
  Button,
  Nav,
} from "react-bootstrap";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function BodyUserLayout(props) {
  const [userData, setUserData] = useState({});
  const [cookie, setCookie] = useCookies(["user"]);
  const router = useRouter();

  useEffect(async () => {
    if (!cookie.userToken) router.push("/login");
    else {
      let dataObj = {};
      try {
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
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let adr1 = null;
    let adr2 = null;
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_API_ENTRYPOINT}/address/${userData.shipping_address_id}?city=${e.target.city1.value}&street=${e.target.street1.value}&zip=${e.target.zip1.value}&country=${e.target.country1.value}`,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: cookie.userToken,
          },
          method: "PUT",
        }
      )
        .then(async (data1) => data1)
        .then(async (addres1) => {
          adr1 = addres1._id;
          await fetch(
            `${process.env.NEXT_PUBLIC_API_ENTRYPOINT}/address/${userData.invoice_address_id}?city=${e.target.city2.value}&street=${e.target.street2.value}&zip=${e.target.zip2.value}&country=${e.target.country2.value}`,
            {
              headers: {
                "Content-Type": "application/json",
                authorization: cookie.userToken,
              },
              method: "PUT",
            }
          )
            .then(async (data2) => data2)
            .then(async (addres2) => {
              adr2 = addres2._id;
              await fetch(
                `${process.env.NEXT_PUBLIC_API_ENTRYPOINT}/user/edit`,
                {
                  body: JSON.stringify({
                    email: e.target.email.value,
                    first_name: e.target.first_name.value,
                    last_name: e.target.last_name.value,
                    birthdate: e.target.birthdate.value,
                    phone_number: e.target.phone_number.value,
                    password: e.target.password.value,
                    invoice_address_id: adr1,
                    shipping_address_id: adr2,
                  }),
                  headers: {
                    "Content-Type": "application/json",
                    authorization: cookie.userToken,
                  },
                  method: "PUT",
                }
              ).then((x) => {
                if (x.status == 200) router.push("/user");
              });
            });
        });
    } catch (err) {
     
    }
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div className="login-title">Twoje konto</div>
      <Form
        style={{ width: "350px", margin: "0 0 50px 0" }}
        onSubmit={handleSubmit}
      >
        <div className="login-title" style={{ fontSize: 24 }}>
          Dane ogólne
        </div>
        <Form.Group>
          <Form.Label>Imię</Form.Label>
          <Form.Control
            type="text"
            name="first_name"
            placeholder="Imię"
            defaultValue={userData?.first_name}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Nazwisko</Form.Label>
          <Form.Control
            type="text"
            name="last_name"
            placeholder="Nazwisko"
            defaultValue={userData?.last_name}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Data urodzenia</Form.Label>
          <Form.Control
            type="date"
            name="birthdate"
            defaultValue={userData?.birthdate}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>E-mail adres</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="E-mail"
            defaultValue={userData?.email}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Numer telefonu</Form.Label>
          <Form.Control
            type="tel"
            name="phone_number"
            placeholder="Nr. telefonu"
            defaultValue={userData?.phone_number}
            required
          />
        </Form.Group>

        <div className="login-title" style={{ fontSize: 24 }}>
          Adres do korespondencji
        </div>

        <Form.Group>
          <Form.Label>Miasto</Form.Label>
          <Form.Control
            type="text"
            name="city1"
            placeholder="Miasto"
            required
            defaultValue={userData?.invoice?.city}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Ulica</Form.Label>
          <Form.Control
            type="text"
            name="street1"
            placeholder="Adres do wysyłki"
            required
            defaultValue={userData?.invoice?.street}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>ZIP kod</Form.Label>
          <Form.Control
            type="text"
            name="zip1"
            placeholder="ZIP"
            required
            defaultValue={userData?.invoice?.zip}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Państwo</Form.Label>
          <Form.Control
            type="text"
            name="country1"
            placeholder="Państwo"
            required
            defaultValue={userData?.invoice?.country}
          />
        </Form.Group>

        <div className="login-title" style={{ fontSize: 24 }}>
          Adres dostawy
        </div>

        <Form.Group>
          <Form.Label>Miasto</Form.Label>
          <Form.Control
            type="text"
            name="city2"
            placeholder="Miasto"
            required
            defaultValue={userData?.shipping?.city}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Ulica</Form.Label>
          <Form.Control
            type="text"
            name="street2"
            placeholder="Adres do wysyłki"
            required
            defaultValue={userData?.shipping?.street}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>ZIP kod</Form.Label>
          <Form.Control
            type="text"
            name="zip2"
            placeholder="ZIP"
            required
            defaultValue={userData?.shipping?.zip}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Państwo</Form.Label>
          <Form.Control
            type="text"
            name="country2"
            placeholder="Państwo"
            required
            defaultValue={userData?.shipping?.country}
          />
        </Form.Group>

        <div className="login-title" style={{ fontSize: 24 }}>
          Hasło
        </div>

        <Form.Group>
          <Form.Label>Hasło</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Hasło"
            //required
          />
        </Form.Group>
        <Button
          variant="blue-umk"
          type="submit"
          block
          style={{ margin: "25px 0 0 0" }}
        >
          Zapisz
        </Button>
      </Form>
    </div>
  );
}
