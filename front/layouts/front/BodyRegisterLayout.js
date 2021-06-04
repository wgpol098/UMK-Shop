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

export default function BodyRegisterLayout(props) {
  const [cookie, setCookie] = useCookies(["user"]);
  const router = useRouter();

  const handleSubmit = async (e) => {
    // console.log(e.target.email.value);
    // console.log(e.target.password.value);
    e.preventDefault();
    console.log(e.target["agreements[]"]);

    //TODO add addresses first!

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_ENTRYPOINT}/user/register`,
        {
          body: JSON.stringify({
            email: e.target.email.value,
            password: e.target.password.value,
            first_name: e.target.FirstName.value,
            last_name: e.target.LastName.value,
            phone_number: e.target.phone_number.value,
            birthdate: e.target.birthdate.value,
          }),
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          method: "POST",
        }
      );

      if (res?.status == 200) router.push("/login");
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
      <div className="login-title">Rejestracja użytkownika</div>
      <Form
        style={{ width: "350px", margin: "0 0 50px 0" }}
        onSubmit={handleSubmit}
      >
        <Form.Group>
          <Form.Label>Imię</Form.Label>
          <Form.Control
            type="text"
            name="FirstName"
            placeholder="Imię"
            //required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Nazwisko</Form.Label>
          <Form.Control
            type="text"
            name="LastName"
            placeholder="Nazwisko"
            //required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Data urodzenia</Form.Label>
          <Form.Control
            type="date"
            name="birthdate"
            //required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>E-mail adres</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="E-mail"
            //required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Numer telefonu</Form.Label>
          <Form.Control
            type="tel"
            name="phone_number"
            placeholder="Nr. telefonu"
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
        <Form.Group>
          <Form.Check
            type="checkbox"
            //name="agreements[]"
            value="1"
            label="Zgadzam się na przetwarzanie danych"
            //required
          />
        </Form.Group>
        <Form.Group>
          <Form.Check
            type="checkbox"
            //name="agreements[]"
            value="2"
            label="Zgadzam się że ten projekt jest najlepszy i mam wstawić ocenę bardzo dobrą"
            //required
          />
        </Form.Group>
        <Button
          variant="blue-umk"
          type="submit"
          block
          style={{ margin: "25px 0 0 0" }}
        >
          Zarejestruj
        </Button>
      </Form>
    </div>
  );
}
