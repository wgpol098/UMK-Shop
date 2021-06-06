import { Button, Table, Form, FormControl } from "react-bootstrap";
import Image from "next/image";
import Pagination from "rc-pagination";
import { useState } from "react";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";

export default function BodyAdminProductsLayout(props) {
  const [cookie, setCookie] = useCookies(["user"]);
  const [titleFilter, setTitleFilter] = useState("");
  const router = useRouter();

  const handleDelete = async (e) => {
    e.preventDefault();
    if (e.target.id) {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_ENTRYPOINT}/products/${e.target.id}`,
          {
            headers: {
              "Content-Type": "application/json",
              authorization: cookie.userToken,
            },
            credentials: "include",
            method: "DELETE",
          }
        );
        location.reload();
      } catch (err) {
        console.log(err);
      }
    }
  };

  let productsArray = [];
  props.products &&
    props.products.map((x) => {
      productsArray.push(
        //href={`admin/products/${x._id}`}
        <tr>
          <td>{x?._id}</td>
          <td>{x?.title}</td>
          <td>{x?.image}</td>
          <td>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <Button className="btn-blue-umk" href={`admin/products/${x._id}`}>
                Edytuj
              </Button>
              <Button
                className="btn-yellow-umk"
                onClick={handleDelete}
                id={x?._id}
              >
                Usuń
              </Button>
            </div>
          </td>
        </tr>
      );
    });

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    setTitleFilter(title);
    router.push(`/admin/products?page=${props.page}&title=${title}`);
  };

  const handleOnPageChange = (page) => {
    console.log(page - 1);
    if (titleFilter !== "")
      router.push(`/admin/products?page=${page - 1}&title=${titleFilter}`);
    else router.push(`/admin/products?page=${page - 1}`);
  };

  return (
    <div>
      <div className="products-title">
        <span className="products-title-text">Lista produktów</span>
      </div>
      <div style={{ margin: "25px" }}>
        <div style={{ margin: "0 0 25px 0" }}>
          <Form inline onSubmit={handleOnSubmit}>
            <FormControl
              type="text"
              placeholder="Podaj nazwę produktu..."
              name="title"
              className="mr-sm-2"
            />
            <Button className="btn btn-blue-umk" type="submit">
              Szukaj
            </Button>
          </Form>
        </div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>id</th>
              <th>Nazwa</th>
              <th>Zdjęcie</th>
              <th style={{ textAlign: "center" }}>Akcję</th>
            </tr>
          </thead>
          <tbody>{productsArray}</tbody>
        </Table>
        <div style={{ margin: "25px 0 25px 0" }}>
          <Pagination
            onChange={handleOnPageChange}
            current={props.page + 1}
            total={30} //TODO change to totalItems
            pageSize={9}
            locale=""
          />
        </div>
        <Button variant="blue-umk" href="/admin/products/create">
          Dodaj
        </Button>
      </div>
    </div>
  );
}
