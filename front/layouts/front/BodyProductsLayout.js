import { useState } from "react";
import {
  Carousel,
  CardDeck,
  CardColumns,
  CardGroup,
  Button,
  Form,
  FormControl,
} from "react-bootstrap";
import Image from "next/image";
import SmallProductLayout from "./subLayouts/SmallProductLayout";
import { useRouter } from "next/router";
import Pagination from "rc-pagination";

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

  const handleOnPageChange = (page) => {
    //e.preventDefault();
    console.log(page - 1);
    // const page = e.target.getAttribute("page");
    if (titleFilter !== "")
      router.push(`/products?page=${page - 1}&title=${titleFilter}`);
    else router.push(`/products?page=${page - 1}`);
  };

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
      <div style={{ margin: "25px 25px 10px 25px" }}>
        <Pagination
          onChange={handleOnPageChange}
          current={props.page + 1}
          total={30} //TODO change to totalItems
          pageSize={9}
          locale=""
        />
      </div>
      <CardGroup className="card-products">{productsArray}</CardGroup>
      <div style={{ margin: "10px 25px 25px 25px" }}>
        <Pagination
          onChange={handleOnPageChange}
          current={props.page + 1}
          total={30} //TODO change to totalItems
          pageSize={9}
          locale=""
        />
      </div>
    </div>
  );
}
