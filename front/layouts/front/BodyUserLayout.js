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
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_ENTRYPOINT}/user/profile`,
          {
            headers: {
              "Content-Type": "application/json",
              authorization: cookie.userToken,
            },
            method: "GET",
          }
        )
          .then(async (data) => await data.json())
          .then((userData) => setUserData(userData[0]));
      } catch (err) {
        console.log(err);
      }
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_ENTRYPOINT}/user/edit`,
        {
          body: JSON.stringify({
            email: e.target.email.value,
            first_name: e.target.first_name.value,
            last_name: e.target.last_name.value,
            birthdate: e.target.birthdate.value,
            phone_number: e.target.phone_number.value,
            password: e.target.password.value,
          }),
          headers: {
            "Content-Type": "application/json",
            authorization: cookie.userToken,
          },
          method: "PUT",
        }
      );

      router.push("/user");
    } catch (err) {
      console.log(err);
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
        <Form.Group>
          <Form.Label>Imię</Form.Label>
          <Form.Control
            type="text"
            name="first_name"
            placeholder="Imię"
            defaultValue={userData?.first_name}
            //required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Nazwisko</Form.Label>
          <Form.Control
            type="text"
            name="last_name"
            placeholder="Nazwisko"
            defaultValue={userData?.last_name}
            //required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Data urodzenia</Form.Label>
          <Form.Control
            type="date"
            name="birthdate"
            defaultValue={userData?.birthdate}
            //required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>E-mail adres</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="E-mail"
            defaultValue={userData?.email}
            //required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Numer telefonu</Form.Label>
          <Form.Control
            type="tel"
            name="phone_number"
            placeholder="Nr. telefonu"
            defaultValue={userData?.phone_number}
            //required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Adres do korespondencji</Form.Label>
          <Form.Control
            type="text"
            //name="address1"
            placeholder="Adres do korespondencji"
            //required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Adres do wysyłki</Form.Label>
          <Form.Control
            type="text"
            //name="address2"
            placeholder="Adres do wysyłki"
            //required
          />
        </Form.Group>
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
