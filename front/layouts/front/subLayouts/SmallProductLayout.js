import Image from "next/image";
import { Card, Button } from "react-bootstrap";
import Link from "next/link";

export default function SmallProductLayout(props) {
  return (
    <Link href={`/products/${props.id}`}>
      <a style={{ textDecoration: "none" }}>
        <Card className="small-product-wrapper">
          <Card.Img variant="top" src="/img/maseczka.jpg" />
          <Card.Body>
            <Card.Title style={{ textAlign: "center" }}>
              {props.title}
            </Card.Title>
          </Card.Body>
        </Card>
      </a>
    </Link>
  );
}
