import { Card, Button } from "react-bootstrap";
import { Basket2Fill } from "react-bootstrap-icons";

export default function BodyProductLayout(props) {
  const product = props.product;

  const handleAddToBasket = async (e) => {
    e.preventDefault();

    //console.log(product._id);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_ENTRYPOINT}/carts/addtocard?id=${product._id}`,
        {
          // body: JSON.stringify({
          //   id: product._id,
          // }),
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
        }
      );

      //const result = await res.json();
      //console.log(result);
      const res1 = await fetch(
        `${process.env.NEXT_PUBLIC_API_ENTRYPOINT}/carts/`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "GET",
        }
      );
      const result = await res1.text();
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  };

  return product ? (
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
        <Card.Img variant="top" src="/img/maseczka.jpg" />
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
  ) : null;
}
