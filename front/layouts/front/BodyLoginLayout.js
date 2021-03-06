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

export default function BodyLoginLayout(props) {
  const [cookie, setCookie] = useCookies(["user"]);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_ENTRYPOINT}/user/login`,
        {
          body: JSON.stringify({
            email: e.target.email.value,
            password: e.target.password.value,
          }),
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
        }
      );

      const result = await res.json();

      setCookie("userToken", result.accessToken, {
        path: "/",
        maxAge: 3600 * 24,
        sameSite: true,
      });

      router.push("/");
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
      <div className="login-title">Zaloguj się aby móc złożyć zamówienie</div>
      <Form style={{ width: "250px" }} onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>E-mail adres</Form.Label>
          {/* type="email" */}
          <Form.Control name="email" placeholder="Email" />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Hasło</Form.Label>
          <Form.Control type="password" name="password" placeholder="Hasło" />
        </Form.Group>
        <Button variant="blue-umk" type="submit" block>
          Zaloguj
        </Button>
      </Form>
    </div>
  );
}
