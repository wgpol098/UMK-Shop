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

export default function BodyOrderLayout(props) {
  const [cookie, setCookie] = useCookies(["user"]);
  const router = useRouter();

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
        <Button
          variant="blue-umk"
          type="submit"
          block
          style={{ margin: "25px 0 0 0" }}
        >
          Zamów
        </Button>
      </Form>
    </div>
  );
}
