import React from "react";
import "./MyCard.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
const Mycard = (props) => {
  return (
    <Card key={props.id} className="mycard ">
      <div key={props.id} className="card-imgwrapper">
        <Card.Img className="mycard-img" src={props.img} />
      </div>
      <Card.Body>
        <Card.Title className="mycard-title">{props.title}</Card.Title>
        <Card.Text className="mycard-description">
          {props.description}
        </Card.Text>
        <Button className="mycard-btn">{props.btn}</Button>
      </Card.Body>
    </Card>
  );
};

export default Mycard;
