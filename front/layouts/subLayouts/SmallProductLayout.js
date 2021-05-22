import Image from "next/image";
import { Card } from "react-bootstrap";

export default function SmallProductLayout(props) {
  return (
    <Card style={{ width: "18rem", margin: "10px 0 10px 0", flex: "unset" }}>
      <Card.Img variant="top" src="/img/maseczka.jpg" />
      <Card.Body>
        <Card.Title style={{ textAlign: "center" }}>{props.title}</Card.Title>
      </Card.Body>
    </Card>
  );
}
