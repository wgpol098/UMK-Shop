import { useState } from "react";
import {
  Carousel,
  CardDeck,
  CardColumns,
  CardGroup,
  Button,
  Form,
  FormControl,
  Pagination,
} from "react-bootstrap";
import Image from "next/image";
import SmallProductLayout from "./subLayouts/SmallProductLayout";
import { useRouter } from "next/router";

export default function BodyProductsLayout(props) {
  const [titleFilter, setTitleFilter] = useState("");
  const router = useRouter();
  let productsArray = [];
  props.products?.length > 0 &&
    props.products.map((x) => {
      productsArray.push(<SmallProductLayout title={x.title} id={x._id} />);
    });

  console.log(props);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    setTitleFilter(title);
    router.push(`/products?page=${props.page}&title=${title}`);
  };

  const handleOnPageChange = (e) => {
    e.preventDefault();
    const page = e.target.getAttribute("page");
    if (titleFilter !== "")
      router.push(`/products?page=${page}&title=${titleFilter}`);
    else router.push(`/products?page=${page}`);
  };

  let items = [];
  for (let number = 1; number <= 5; number++) {
    items.push(
      <Pagination.Item
        key={number}
        page={number - 1}
        active={number - 1 === props.page}
        onClick={handleOnPageChange}
      >
        {number}
      </Pagination.Item>
    );
  }

  return (
    <div>
      <div className="products-title">
        <span className="products-title-text">Dostępne produkty</span>
      </div>
      <div style={{ margin: "0 10px 0 10px" }}>
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
      <CardGroup className="card-products">{productsArray}</CardGroup>
      <div style={{ margin: "10px 25px 25px 25px" }}>
        <Pagination>
          <Pagination.First />
          <Pagination.Prev />
          <Pagination.Item>{1}</Pagination.Item>
          <Pagination.Ellipsis />
          {items}
          <Pagination.Ellipsis />
          <Pagination.Item>{20}</Pagination.Item>
          <Pagination.Next />
          <Pagination.Last />
        </Pagination>
      </div>
    </div>
  );
}
