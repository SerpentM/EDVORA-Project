export default function Card(props) {
  return (
    <div className="cardContainer">
      <img className="prodImage" src={props.image}></img>
      <p className="prodName">{props.productName}</p>
      <p className="brandName m-50">{props.brandName}</p>
      <h4 className="amount">{props.amount}</h4>
      <p className="location m-50">{props.location}</p>
      <p className="date m-50">{props.date}</p>
      <p className="description m-50">{props.discription}</p>
    </div>
  );
}
