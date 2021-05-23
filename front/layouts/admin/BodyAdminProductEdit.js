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

export default function BodyAdminProductEdit(props) {
  const [cookies] = useCookies("user");
  const router = useRouter();
  const product = props.product;

  console.log(product);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e.target.description);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_ENTRYPOINT}/products/${product._id}`,
        {
          body: JSON.stringify({
            title: e.target.title.value,
            description: e.target.description.value,
            price: e.target.price.value,
            count: e.target.count.value,
          }),
          headers: {
            "Content-Type": "application/json",
            authorization: cookies.userToken,
          },
          method: "PUT",
        }
      );

      //const result = await res.json();

      router.push("/admin/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="products-title">
        <span className="products-title-text">Product: {product.title}</span>
      </div>
      <div className="admin-edit-form">
        <Form style={{ width: "500px" }} onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Nazwa</Form.Label>
            <Form.Control
              type="text"
              name="title"
              placeholder="Nazwa"
              defaultValue={product.title}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Opis</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              placeholder="Opis"
              defaultValue={product.description}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Cena (zł)</Form.Label>
            <Form.Control
              type="number"
              name="price"
              placeholder="Cena"
              defaultValue={product.price}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Ilość</Form.Label>
            <Form.Control
              type="number"
              name="count"
              placeholder="Ilość"
              defaultValue={product.count}
            />
          </Form.Group>
          <div className="admin-edit-form-buttons">
            <Button variant="blue-umk" type="submit">
              Zapisz
            </Button>
            <Button
              variant="blue-umk"
              onClick={() => {
                router.push("/admin/");
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
