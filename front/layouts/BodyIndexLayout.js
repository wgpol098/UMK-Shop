import { Carousel, CardDeck, CardColumns, CardGroup } from "react-bootstrap";
import Image from "next/image";
import SmallProductLayout from "./subLayouts/SmallProductLayout";

export default function BodyIndexLayout(props) {
  let productsArray = [];
  props.products &&
    props.products.map((x) => {
      productsArray.push(<SmallProductLayout title={x.title} />);
    });

  console.log(props);

  return (
    <div>
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/img/testimg.png"
            alt="First slide"
          />
          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/img/testimg.png"
            alt="Second slide"
          />

          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/img/testimg.png"
            alt="Third slide"
          />

          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      {/* <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          marginVertical: "10px",
        }}
      > */}
      <CardGroup style={{ justifyContent: "space-around" }}>
        {productsArray}
      </CardGroup>
      {/* </div> */}
    </div>
  );
}
