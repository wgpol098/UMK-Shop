import {
  Navbar,
  NavDropdown,
  Form,
  FormControl,
  Button,
  Nav,
} from "react-bootstrap";
import Image from "next/image";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";

export default function BodyAdminUserCreate(props) {
  const [cookies] = useCookies("user");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let adr1 = null;
    let adr2 = null;

    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_API_ENTRYPOINT}/address?city=${e.target.city1.value}&street=${e.target.street1.value}&zip=${e.target.zip1.value}&country=${e.target.country1.value}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
        }
      )
        .then(async (data1) => await data1.json())
        .then(async (addres1) => {
          adr1 = addres1._id;
          await fetch(
            `${process.env.NEXT_PUBLIC_API_ENTRYPOINT}/address?city=${e.target.city2.value}&street=${e.target.street2.value}&zip=${e.target.zip2.value}&country=${e.target.country2.value}`,
            {
              headers: {
                "Content-Type": "application/json",
              },
              method: "POST",
            }
          )
            .then(async (data2) => await data2.json())
            .then(async (addres2) => {
              adr2 = addres2._id;
              await fetch(`${process.env.NEXT_PUBLIC_API_ENTRYPOINT}/user/`, {
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
                },
                method: "POST",
              }).then((x) => {
                if (x.status == 201) router.push("/admin/users");
              });
            });
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="products-title">
        <span className="products-title-text">Dodaj użytkownika</span>
      </div>
      <div className="admin-edit-form">
        <Form style={{ width: "500px" }} onSubmit={handleSubmit}>
          <div className="login-title" style={{ fontSize: 24 }}>
            Dane ogólne
          </div>
          <Form.Group>
            <Form.Label>Typ użytkownika</Form.Label>
            <Form.Control as="select" name="role" required>
              <option value="user">Użytkownik</option>
              <option value="admin">Admin</option>
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Imię</Form.Label>
            <Form.Control
              type="text"
              name="first_name"
              placeholder="Imię"
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Nazwisko</Form.Label>
            <Form.Control
              type="text"
              name="last_name"
              placeholder="Nazwisko"
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Data urodzenia</Form.Label>
            <Form.Control type="date" name="birthdate" required />
          </Form.Group>
          <Form.Group>
            <Form.Label>E-mail adres</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="E-mail"
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Numer telefonu</Form.Label>
            <Form.Control
              type="tel"
              name="phone_number"
              placeholder="Nr. telefonu"
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
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Ulica</Form.Label>
            <Form.Control
              type="text"
              name="street1"
              placeholder="Adres do wysyłki"
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>ZIP kod</Form.Label>
            <Form.Control type="text" name="zip1" placeholder="ZIP" required />
          </Form.Group>
          <Form.Group>
            <Form.Label>Państwo</Form.Label>
            <Form.Control
              type="text"
              name="country1"
              placeholder="Państwo"
              required
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
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Ulica</Form.Label>
            <Form.Control
              type="text"
              name="street2"
              placeholder="Adres do wysyłki"
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>ZIP kod</Form.Label>
            <Form.Control type="text" name="zip2" placeholder="ZIP" required />
          </Form.Group>
          <Form.Group>
            <Form.Label>Państwo</Form.Label>
            <Form.Control
              type="text"
              name="country2"
              placeholder="Państwo"
              required
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
              required
            />
          </Form.Group>
          <div className="admin-edit-form-buttons">
            <Button variant="blue-umk" type="submit">
              Zapisz
            </Button>
            <Button
              variant="blue-umk"
              onClick={() => {
                router.push("/admin/users");
              }}
            >
              Anuluj
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
