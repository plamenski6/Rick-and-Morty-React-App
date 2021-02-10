import React, { useState, useEffect } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";

import classes from "./index.module.css";

import CharCards from "./CharsCards";

const Characters = ({ data }) => {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getEpisodeCharacters = async () => {
      const response = await fetch(data, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      const character = await response.json();
      setCharacters(character);
      setIsLoading(false);
    };
    getEpisodeCharacters();
  }, [data]);
  
  return (
    <div className={classes.characters}>
      {!isLoading ? (
        <Container fluid>
          {characters.length > 0 &&
            characters?.map((char, index) => {
              if (index % 4 === 0) {
                return (
                  <Row key={index}>
                    <Col xs={6} lg={3} className={classes["modal-col"]}>
                      {characters?.[index] && (
                        <CharCards data={characters[index]} />
                      )}
                    </Col>
                    <Col xs={6} lg={3} className={classes["modal-col"]}>
                      {characters?.[index + 1] && (
                        <CharCards data={characters[index + 1]} />
                      )}
                    </Col>
                    <Col xs={6} lg={3} className={classes["modal-col"]}>
                      {characters?.[index + 2] && (
                        <CharCards data={characters[index + 2]} />
                      )}
                    </Col>
                    <Col xs={6} lg={3} className={classes["modal-col"]}>
                      {characters?.[index + 3] && (
                        <CharCards data={characters[index + 3]} />
                      )}
                    </Col>
                  </Row>
                );
              }
            })}
        </Container>
      ) : (
        <Spinner animation="border"/>
      )}
    </div>
  );
};

export default Characters;
