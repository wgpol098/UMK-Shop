import {
  Carousel,
  CardDeck,
  CardColumns,
  CardGroup,
  Button,
} from "react-bootstrap";
import Image from "next/image";
import SmallProductLayout from "./subLayouts/SmallProductLayout";

export default function BodyIndexLayout(props) {
  let productsArray = [];
  props.products?.length > 0 &&
    props.products.map((x) => {
      productsArray.push(<SmallProductLayout title={x.title} id={x._id} />);
    });

  //console.log(props);

  return (
    <div>
      <div
        style={{
          borderBottom: "5px solid #ffd537",
          borderTop: "5px solid #ffd537",
        }}
      >
        <Carousel fade>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="/img/maseczka.jpg"
              alt="First slide"
            />
            <Carousel.Caption className="carousel-title-wrapper">
              <div className="carousel-title">
                <span>Maska ochronna UMK</span>
              </div>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="/img/kubek-logo-UMK-2.jpg"
              alt="Second slide"
            />
            <Carousel.Caption className="carousel-title-wrapper">
              <div className="carousel-title">
                <span>Kubek z logo UMK</span>
              </div>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="/img/koszulka-uniwersytecka.jpg"
              alt="Third slide"
            />
            <Carousel.Caption className="carousel-title-wrapper">
              <div className="carousel-title">
                <span>Koszulka uniwersytecka</span>
              </div>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
      <div className="products-title">
        <span className="products-title-text">Najpopularnejsze</span>
      </div>
      <CardGroup className="card-products">{productsArray}</CardGroup>
      <div style={{ margin: "10px 25px 25px 25px" }}>
        <Button href="/products" className="btn btn-blue-umk" block>
          Więcej productów
        </Button>
      </div>
    </div>
  );
}
