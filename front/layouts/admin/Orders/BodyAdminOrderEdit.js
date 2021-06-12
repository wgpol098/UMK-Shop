import {
  Navbar,
  NavDropdown,
  Form,
  FormControl,
  Button,
  Nav,
  Image,
} from "react-bootstrap";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";

export default function BodyAdminOrderEdit(props) {
  const [cookies] = useCookies("user");
  const router = useRouter();
  const order = props.order;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_API_ENTRYPOINT}/order/${order._id}`,
        {
          body: JSON.stringify({
            status: e.target.status.value,
          }),
          headers: {
            "Content-Type": "application/json",
            authorization: cookies.userToken,
          },
          method: "PUT",
        }
      ).then((x) => {
        if (x?.status == 204) router.push("/admin/orders");
      });
    } catch (err) {
     
    }
  };

  const cartEl = [];
  Object.entries(order.cart.items).forEach(([key, value]) => {
    cartEl.push(<li>{value.item.title}</li>);
  });

  return (
    <div>
      <div className="products-title">
        <span className="products-title-text">Zamówienie: {order._id}</span>
      </div>
      <div className="admin-edit-form">
        <Form style={{ width: "500px" }} onSubmit={handleSubmit}>
          <div className="login-title" style={{ fontSize: 24 }}>
            Dane ogólne
          </div>
          <Form.Group>
            <Form.Label>Użytkownik</Form.Label>
            <Form.Control
              type="text"
              placeholder="Użytkownik"
              defaultValue={order.user}
              disabled
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Data</Form.Label>
            <Form.Control
              type="text"
              defaultValue={new Date(order?.date).toLocaleString()}
              disabled
            />
          </Form.Group>
          <div className="login-title" style={{ fontSize: 24 }}>
            Produkty
          </div>
          <ul>{cartEl}</ul>
          <div className="login-title" style={{ fontSize: 24 }}>
            Status
          </div>
          <Form.Group>
            <Form.Label>Status zamówienia</Form.Label>
            <Form.Control
              placeholder="Status"
              name="status"
              defaultValue={order.status}
            />
          </Form.Group>
          <div className="admin-edit-form-buttons">
            <Button variant="blue-umk" type="submit">
              Zapisz
            </Button>
            <Button
              variant="blue-umk"
              onClick={() => {
                router.push("/admin/orders");
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
