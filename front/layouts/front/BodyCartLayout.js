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

export default function BodyCartLayout(props) {
  const [cookie, setCookie] = useCookies(["user"]);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // try {
    //   const res = await fetch(
    //     `${process.env.NEXT_PUBLIC_API_ENTRYPOINT}/carts/`,
    //     {
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       method: "GET",
    //     }
    //   );
    //   const result = await res.text();
    //   console.log(result);
    // } catch (err) {
    //   console.log(err);
    // }
  };

  const handleDel = async (e) => {
    e.preventDefault();

    // try {
    //   const res = await fetch(
    //     `${process.env.NEXT_PUBLIC_API_ENTRYPOINT}/carts/`,
    //     {
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       method: "GET",
    //     }
    //   );
    //   const result = await res.text();
    //   console.log(result);
    // } catch (err) {
    //   console.log(err);
    // }
  };

  console.log(props); //czy pobiera /carts?

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div className="login-title">Koszyk</div>
      {/* <Form style={{ width: "250px" }} onSubmit={handleSubmit}>
        <Button variant="blue-umk" type="submit" block>
          Zaloguj
        </Button>
      </Form> */}
    </div>
  );
}
