import React, { useState } from "react";
import{Card, Button, Modal} from "react-bootstrap";

import classes from "./index.module.css";

import Origin from "./Origin";
import Location from "./Location";

const CharCards = ({ data }) => {
  
  const [showOrigin, setShowOrigin] = useState(false);
  const [showLocation, setShowLocation] = useState(false);

  const handleCloseOrigin = () => setShowOrigin(false);
  const handleShowOrigin = () => setShowOrigin(true);

  const handleCloseLocation = () => setShowLocation(false);
  const handleShowLocation = () => setShowLocation(true);

  return (
    <>
      <Card className={classes["chars-card"]}>
        <Card.Img variant="top" src={data.image} />
        <Card.Body>
          <Card.Title>{data.name}</Card.Title>
          <Card.Text className={classes.cardAtr}>
            Status: {data.status}
          </Card.Text>
          <Card.Text className={classes.cardAtr}>
            Species: {data.species}
          </Card.Text>
          <div className={classes.buttons}>
            <Button size="sm" variant="secondary" onClick={handleShowOrigin}>
              Origin
            </Button>
            <Button size="sm" variant="info" onClick={handleShowLocation}>
              Location
            </Button>
          </div>
        </Card.Body>
      </Card>

      {/* For origin */}
      <Modal size="xl" show={showOrigin} onHide={handleCloseOrigin}>
        <Modal.Header closeButton>
          <Modal.Title>Origin</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {data.origin && data.origin.url ? (
            <Origin data={data.origin} />
          ) : (
            <h4>There are no characters here.</h4>
          )}
        </Modal.Body>
      </Modal>

      {/* For location */}
      <Modal size="xl" show={showLocation} onHide={handleCloseLocation}>
        <Modal.Header closeButton>
          <Modal.Title>Location</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {data.location && data.location.url ? (
            <Location data={data.location} />
          ) : (
            <h4>There are no characters here.</h4>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CharCards;
