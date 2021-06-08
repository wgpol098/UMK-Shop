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

export default function BodyAdminProductCreate(props) {
  const [cookies] = useCookies("user");
  const router = useRouter();

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
              `${process.env.NEXT_PUBLIC_API_ENTRYPOINT}/products/`,
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
                method: "POST",
              }
            ).then((x) => {
              if (x?.status == 201) router.push("/admin/products");
            });
          });
        });
      } else {
        await fetch(`${process.env.NEXT_PUBLIC_API_ENTRYPOINT}/products`, {
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
          method: "POST",
        }).then((x) => {
          if (x?.status == 201) router.push("/admin/products");
        });
      }
      //const result = await res.json();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="products-title">
        <span className="products-title-text">Dodaj nowy product</span>
      </div>
      <div className="admin-edit-form">
        <Form style={{ width: "500px" }} onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Nazwa</Form.Label>
            <Form.Control type="text" name="title" placeholder="Nazwa" />
          </Form.Group>
          <Form.Group>
            <Form.Label>Opis</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              placeholder="Opis"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Cena (zł)</Form.Label>
            <Form.Control type="number" name="price" placeholder="Cena" />
          </Form.Group>
          <Form.Group>
            <Form.Label>Ilość</Form.Label>
            <Form.Control type="number" name="count" placeholder="Ilość" />
          </Form.Group>
          <Form.Group>
            <Form.Label>Zdjęcie produktu</Form.Label>
            <Form.File name="image" accept="image/*" />
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
