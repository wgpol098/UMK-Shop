import { useState } from "react";
import { Card, Button, Alert } from "react-bootstrap";
import { Basket2Fill } from "react-bootstrap-icons";

export default function BodyProductLayout(props) {
  const [added, setAdded] = useState(false);
  const product = props.product;

  const handleAddToBasket = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_ENTRYPOINT}/cart/addtocart?id=${product._id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          method: "POST",
        }
      );
      setAdded(true);
    } catch (err) {
     
      setAdded(false);
    }
  };

  return product ? (
    <>
      <div className="single-product-wrapper">
        <Card
          style={{
            minWidth: "20rem",
            margin: "10px 0 10px 0",
            flex: "1",
            backgroundColor: "#7a8c68",
            color: "#fff",
            textTransform: "uppercase",
            fontFamily: "Lato-Light, Arial, sans-serif",
          }}
        >
          <Card.Img variant="top" src={product.imagePath} alt={product.title} />
          <Card.Body
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Card.Title style={{ textAlign: "center" }}>
              {product.title}
            </Card.Title>
          </Card.Body>
        </Card>
        <div className="single-product-descr">
          <Card className="single-product-descr-section">
            <Card.Body>
              <Card.Title>Opis:</Card.Title>
              <Card.Text>{product.description}</Card.Text>
            </Card.Body>
          </Card>
          <Card className="single-product-descr-section">
            <Card.Body>
              <Card.Title>Zostało:</Card.Title>
              <Card.Text>{product.count} szt.</Card.Text>
            </Card.Body>
          </Card>
          <Card className="single-product-descr-section">
            <Card.Body>
              <Card.Title>Cena:</Card.Title>
              <Card.Text className="product-price">
                <span style={{ fontWeight: "bold" }}>{product.price}</span> zł{" "}
                <span
                  style={{ textDecoration: "line-through", fontSize: "24px" }}
                >
                  ({2 * parseFloat(product.price)} zł)
                </span>
              </Card.Text>
            </Card.Body>
            <Button
              variant="blue-umk"
              block
              className="product-add-to-cart"
              onClick={handleAddToBasket}
            >
              Dodaj do koszyka{" "}
              <Basket2Fill size={24} style={{ margin: "5px 20px 5px 20px" }} />
            </Button>
          </Card>
        </div>
      </div>
      {added && (
        <Alert variant="success" style={{ margin: "20px" }}>
          Product został dodany do koszyka
        </Alert>
      )}
    </>
  ) : null;
}
