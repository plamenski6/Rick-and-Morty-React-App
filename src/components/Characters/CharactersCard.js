import React, { useState } from "react";
import { Card, Modal } from "react-bootstrap";

import classes from "./index.module.css";

const CharactersCard = ({ data }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  return (
    <>
      <Card className={classes.card} onClick={handleShow}>
        <Card.Img variant="top" src={data.image} className={classes.image} />
        <Card.Body>
          <Card.Title>{data.name}</Card.Title>
        </Card.Body>
      </Card>
      <Modal
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>{data.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div classes={classes.char}>
            <div className={classes["image-char"]}>
              <img src={data.image} alt="character" />
            </div>
            <div className={classes["info-char"]}>
              {data.type ? (
                <>
                  <p>
                    Type: <span className={classes.details}>{data.type}</span>
                  </p>
                  <p>
                    Species:{" "}
                    <span className={classes.details}>{data.species}</span>
                  </p>
                  <p>
                    Gender:{" "}
                    <span className={classes.details}>{data.gender}</span>
                  </p>
                  <p>
                    Status:{" "}
                    <span className={classes.details}>{data.status}</span>
                  </p>
                  <p>
                    Origin:{" "}
                    <span className={classes.details}>{data.origin.name}</span>
                  </p>
                  <p>
                    Location:{" "}
                    <span className={classes.details}>{data.location.name}</span>
                  </p>
                </>
              ) : (
                <>
                  <p>
                    Species:{" "}
                    <span className={classes.details}>{data.species}</span>
                  </p>
                  <p>
                    Gender:{" "}
                    <span className={classes.details}>{data.gender}</span>
                  </p>
                  <p>
                    Status:{" "}
                    <span className={classes.details}>{data.status}</span>
                  </p>
                  <p>
                    Origin:{" "}
                    <span className={classes.details}>{data.origin.name}</span>
                  </p>
                  <p>
                    Location:{" "}
                    <span className={classes.details}>{data.location.name}</span>
                  </p>
                </>
              )}
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CharactersCard;
