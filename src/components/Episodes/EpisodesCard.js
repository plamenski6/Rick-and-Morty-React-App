import React, { useState } from "react";
import { Card, Modal } from "react-bootstrap";

import classes from "./index.module.css";

import Characters from "../../utils/Characters";

const EpisodesCard = ({ data }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let arrayNum = data.characters.map((res, index) => {
    let theNum = res.replace(/^\D+/g, "");
    theNum = res.match(/\d+/)[0];
    return theNum;
  });
  let urlCharacters = `https://rickandmortyapi.com/api/character/${arrayNum},`;

  return (
    <>
      <Card className={classes.card} onClick={handleShow}>
        <Card.Body>
          <Card.Title>{data.name}</Card.Title>
          <Card.Text>{data.episode}</Card.Text>
        </Card.Body>
      </Card>
      <Modal
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
        onHide={handleClose}
      >
        <Modal.Header closeButton className={classes["episode-modal"]}>
          <Modal.Title>{data.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body className={classes["episode-modal"]}>
          <h4>
            Release Date:{" "}
            <span className={classes.details}>{data["air_date"]}</span>
          </h4>
          <h4>
            Episode: <span className={classes.details}>{data.episode}</span>
          </h4>
          {arrayNum.length > 0 ? (
            <div className={classes.characters}>
              <h4 className={classes["title-char"]}>Characters</h4>
              <Characters data={urlCharacters} />
            </div>
          ) : (
            <div className={classes.noChars}>
              <h4>There are no characters here.</h4>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default EpisodesCard;
