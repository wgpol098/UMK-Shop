import {
  Navbar,
  NavDropdown,
  Form,
  FormControl,
  Button,
  Nav,
} from "react-bootstrap";

export default function BodyLoginLayout(props) {
  const handleSubmit = async (e) => {
    console.log(e.target.email.value);
    console.log(e.target.password.value);
    e.preventDefault();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_ENTRYPOINT}/user/login`,
      {
        body: JSON.stringify({
          email: e.target.email.value,
          password: e.target.password.value,
        }),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        method: "POST",
      }
    );

    const result = await res.json();
  };

  return (
    <div
      style={{
        margin: "20px",
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Form style={{ width: "250px" }} onSubmit={handleSubmit} method="POST">
        <Form.Group controlId="formBasicEmail">
          <Form.Label>E-mail adres</Form.Label>
          <Form.Control type="email" name="email" placeholder="Email" />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Hasło</Form.Label>
          <Form.Control type="password" name="password" placeholder="Hasło" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Zaloguj
        </Button>
      </Form>
    </div>
  );
}
