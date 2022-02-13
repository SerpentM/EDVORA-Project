import Card from "./Card";
export default function Product(props) {
  return (
    <div style={{ position: "relative", maxWidth: "984px", width: "100%" }}>
      <h3>{props.productName}</h3>
      <hr></hr>
      <div style={{ display: "flex", position: "relative" }}>
        <div className="slideContainer" id={props.productName}>
          {props.productData
            .filter((obj) => {
              if (obj.address.state === props.filter.state) {
                return obj;
              }
              if (props.filter.state === "") {
                return obj;
              }
            })
            .map((obj, index) => {
              return (
                <Card
                  key={index}
                  image={obj.image}
                  amount={obj.price}
                  productName={obj.product_name}
                  date={obj.date}
                  discription={obj.discription}
                  brandName={obj.brand_name}
                ></Card>
              );
            })}
        </div>
        <button
          className="btn-right"
          onClick={() => {
            var scrollAmount = 0;
            var scrollMin = 0;
            var container1 = document.getElementById(`${props.productName}`);
            var scrollMax = container1.clientWidth;
            container1.scrollTo({
              top: 0,
              left: Math.max((scrollAmount += 2000), scrollMax),
              behavior: "smooth",
            });
          }}
        >
          &#62;
        </button>
      </div>
    </div>
  );
}
