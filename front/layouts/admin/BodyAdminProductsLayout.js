import { Button } from "react-bootstrap";
import Image from "next/image";

export default function BodyAdminProductsLayout(props) {
  let productsArray = [];
  props.products &&
    props.products.map((x) => {
      productsArray.push(
        <a href={`admin/products/${x._id}`}>
          <li>
            {x.title} {x._id}
          </li>
        </a>
      );
    });

  console.log(props);

  return (
    <div>
      <div className="products-title">
        <span className="products-title-text">Lista produktów</span>
      </div>
      <ul>{productsArray}</ul>
      <Button variant="blue-umk" href="/admin/products/create">
        Dodaj
      </Button>
    </div>
  );
}
