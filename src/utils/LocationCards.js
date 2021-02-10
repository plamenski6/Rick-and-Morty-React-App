import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

import classes from "./index.module.css";

const LocationCards = ({ data }) => {
  const [character, setCharacter] = useState([]);

  useEffect(() => {
    const getEpisodeCharacters = async () => {
      const response = await fetch(data, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      const character = await response.json();
      setCharacter(character);
    };
    getEpisodeCharacters();
  }, [data]);

  return (
    <Container fluid>
      {character.length > 0 &&
        character?.map((char, index) => {
          if (index % 4 === 0) {
            return (
              <Row key={index}>
                <Col xs={6} lg={3} className={classes["modal-col"]}>
                  {character?.[index] && (
                    <Card className={classes["chars-card"]}>
                      <Card.Img variant="top" src={character[index].image} />
                      <Card.Body>
                        <Card.Title>{character[index].name}</Card.Title>
                      </Card.Body>
                    </Card>
                  )}
                </Col>
                <Col xs={6} lg={3} className={classes["modal-col"]}>
                  {character?.[index + 1] && (
                    <Card className={classes["chars-card"]}>
                      <Card.Img
                        variant="top"
                        src={character[index + 1].image}
                      />
                      <Card.Body>
                        <Card.Title>{character[index + 1].name}</Card.Title>
                      </Card.Body>
                    </Card>
                  )}
                </Col>
                <Col xs={6} lg={3} className={classes["modal-col"]}>
                  {character?.[index + 2] && (
                    <Card className={classes["chars-card"]}>
                      <Card.Img
                        variant="top"
                        src={character[index + 2].image}
                      />
                      <Card.Body>
                        <Card.Title>{character[index + 2].name}</Card.Title>
                      </Card.Body>
                    </Card>
                  )}
                </Col>
                <Col xs={6} lg={3} className={classes["modal-col"]}>
                  {character?.[index + 3] && (
                    <Card className={classes["chars-card"]}>
                      <Card.Img
                        variant="top"
                        src={character[index + 3].image}
                      />
                      <Card.Body>
                        <Card.Title>{character[index + 3].name}</Card.Title>
                      </Card.Body>
                    </Card>
                  )}
                </Col>
              </Row>
            );
          }
        })}
    </Container>
  );
};

export default LocationCards;
