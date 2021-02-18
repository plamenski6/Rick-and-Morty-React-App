import React, { useState, useEffect } from "react";
import { Container, Row, Col, Spinner, Button } from "react-bootstrap";

import classes from "./index.module.css";

import CharactersCard from "./CharactersCard";

const Characters = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [requestInfo, setRequestInfo] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const getCharacters = async () => {
    const response = await fetch(`https://rickandmortyapi.com/api/character`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const characters = await response.json();
    setRequestInfo(characters.info);
    let updatedCharacters = [...data];
    updatedCharacters = updatedCharacters.concat(characters.results);
    setData(updatedCharacters);
    setIsLoading(false);
  };

  const nextCharacters = async (nextUrl) => {
    if (nextUrl) {
      const response = await fetch(nextUrl, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      const characters = await response.json();
      setRequestInfo(characters.info);
      let updatedCharacters = [...data];
      updatedCharacters = updatedCharacters.concat(characters.results);
      setData(updatedCharacters);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCharacters();
    nextCharacters();
  }, []);

  useEffect(() => {
    const searchInput = searchTerm.toLowerCase();
    const results = data.filter((char) =>
      char.name.toLowerCase().includes(searchInput)
    );
    setSearchResults(results);
  }, [searchTerm, setSearchResults, data]);

  return (
    <div className={classes.characters}>
      <h2>Characters</h2>
      <input
        className={classes["search-bar"]}
        type="text"
        placeholder="Search character"
        value={searchTerm}
        onChange={handleChange}
        ref={(input) => input && input.focus()}
      />
      {!isLoading ? (
        <>
          <Container fluid>
            {searchResults.length > 0 ? (
              searchResults?.map((character, index) => {
                if (index % 4 === 0) {
                  return (
                    <Row key={index} className={classes.row}>
                      {searchResults?.[index] && (
                        <Col xs={6} md={3} className={classes.col}>
                          <CharactersCard data={searchResults[index]} />
                        </Col>
                      )}
                      {searchResults?.[index + 1] && (
                        <Col xs={6} md={3} className={classes.col}>
                          <CharactersCard data={searchResults[index + 1]} />
                        </Col>
                      )}
                      {searchResults?.[index + 2] && (
                        <Col xs={6} md={3} className={classes.col}>
                          <CharactersCard data={searchResults[index + 2]} />
                        </Col>
                      )}
                      {searchResults?.[index + 3] && (
                        <Col xs={6} md={3} className={classes.col}>
                          <CharactersCard data={searchResults[index + 3]} />
                        </Col>
                      )}
                    </Row>
                  );
                }
              })
            ) : (
              <div className={classes.noCharacters}>
                <p className={classes["no-char"]}>
                  Sorry, cannot find character ;(
                </p>
              </div>
            )}
          </Container>
          <Button
            size="lg"
            variant="secondary"
            onClick={() => nextCharacters(requestInfo.next)}
          >
            LOAD MORE CHARACTERS
          </Button>
        </>
      ) : (
        <Spinner animation="border" className={classes.spinner} />
      )}
    </div>
  );
};

export default Characters;
