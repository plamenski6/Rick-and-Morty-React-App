import React, { useState } from "react";
import { Card, Modal } from "react-bootstrap";

import classes from "./index.module.css";

import Characters from "../../utils/Characters";

const LocationsCard = ({ data }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let arrayNum = [];
  data.residents.map((res, index) => {
    let theNum = res.replace(/^\D+/g, "");
    theNum = res.match(/\d+/)[0];
    arrayNum.push(theNum);
  })
  let urlCharacters = `https://rickandmortyapi.com/api/character/${arrayNum},`;
  
  return (
    <>
      <Card className={classes.card} onClick={handleShow}>
        <Card.Body>
          <Card.Title>{data.name}</Card.Title>
          <Card.Text>{data.dimension}</Card.Text>
        </Card.Body>
      </Card>
      <Modal
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
        onHide={handleClose}
      >
        <Modal.Header closeButton className={classes["location-modal"]}>
          <Modal.Title>{data.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body className={classes["location-modal"]}>
          <h4>
            Type: <span className={classes.details}>{data.type}</span>
          </h4>
          <h4>
            Dimension: <span className={classes.details}>{data.dimension}</span>
          </h4>
          {arrayNum.length > 0 ? (
            <div className={classes.residents}>
              <h4 className={classes["title-char"]}>Characters</h4>
              <Characters data={urlCharacters} />
            </div>
          ) : (
            <div className= {classes.noChars}>
              <h4>There are no characters here.</h4>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default LocationsCard;
