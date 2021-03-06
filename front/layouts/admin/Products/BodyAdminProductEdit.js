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

export default function BodyAdminProductEdit(props) {
  const [cookies] = useCookies("user");
  const router = useRouter();
  const product = props.product;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (e.target?.image?.files[0]) {
        const imgData = new FormData();
        imgData.append(
          "image",
          e.target.image.files[0],
          e.target.image.files[0].name
        );

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_ENTRYPOINT}/image/`,
          {
            body: imgData,
            headers: {
              authorization: cookies.userToken,
            },
            method: "POST",
          }
        ).then(async (x) => {
          await x.json().then(async (img) => {
            await fetch(
              `${process.env.NEXT_PUBLIC_API_ENTRYPOINT}/products/${product._id}`,
              {
                body: JSON.stringify({
                  title: e.target.title.value,
                  description: e.target.description.value,
                  price: e.target.price.value,
                  count: e.target.count.value,
                  imagePath: img.filepath,
                }),
                headers: {
                  "Content-Type": "application/json",
                  authorization: cookies.userToken,
                },
                method: "PUT",
              }
            ).then((x) => {
              if (x?.status == 204) router.push("/admin/products");
            });
          });
        });
      } else {
        await fetch(
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
        ).then((x) => {
          if (x?.status == 204) router.push("/admin/products");
        });
      }
      //const result = await res.json();
    } catch (err) {
     
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
            <Form.Label>Cena (z??)</Form.Label>
            <Form.Control
              type="number"
              name="price"
              placeholder="Cena"
              defaultValue={product.price}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Ilo????</Form.Label>
            <Form.Control
              type="number"
              name="count"
              placeholder="Ilo????"
              defaultValue={product.count}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Zdj??cie produktu</Form.Label>
            {product.imagePath && (
              <Image
                src={product.imagePath}
                thumbnail
                width={200}
                style={{ display: "block", margin: "10px 0" }}
              />
            )}
            <Form.File name="image" accept="image/*" />
          </Form.Group>
          <div className="admin-edit-form-buttons">
            <Button variant="blue-umk" type="submit">
              Zapisz
            </Button>
            <Button
              variant="blue-umk"
              onClick={() => {
                router.push("/admin/products");
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
