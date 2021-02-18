import React, { useState, useEffect } from "react";
import { Container, Row, Col, Spinner, Pagination } from "react-bootstrap";

import classes from "./index.module.css";

import EpisodesCard from "./EpisodesCard";

const Episodes = () => {
  const [data, setData] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [requestInfo, setRequestInfo] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const getEpisodes = async (page = 1) => {
    const fetchPage = page ? `?page=${page}` : "";

    const response = await fetch(
      `https://rickandmortyapi.com/api/episode${fetchPage}`,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    const episodes = await response.json();
    setRequestInfo(episodes.info);
    setData(
      episodes.results.sort((a, b) =>
        a.name > b.name ? 1 : b.name > a.name ? -1 : 0
      )
    );
    setActivePage(page);
    setIsLoading(false);
  };

  useEffect(() => {
    getEpisodes();
  }, []);

  let items = [];
  for (let number = 1; number <= requestInfo.pages; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === activePage}
        onClick={() => getEpisodes(number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  return (
    <div className={classes.episodes}>
      <h2>Episodes</h2>
      <Pagination size="sm">{items}</Pagination>
      {!isLoading ? (
        <Container fluid>
          {data.length > 0 &&
            data?.map((episode, index) => {
              if (index % 4 === 0) {
                return (
                  <Row key={index}>
                    {data?.[index] && (
                      <Col xs={6} md={3} className={classes.col}>
                        <EpisodesCard data={data[index]} />
                      </Col>
                    )}
                    {data?.[index + 1] && (
                      <Col xs={6} md={3} className={classes.col}>
                        <EpisodesCard data={data[index + 1]} />
                      </Col>
                    )}
                    {data?.[index + 2] && (
                      <Col xs={6} md={3} className={classes.col}>
                        <EpisodesCard data={data[index + 2]} />
                      </Col>
                    )}
                    {data?.[index + 3] && (
                      <Col xs={6} md={3} className={classes.col}>
                        <EpisodesCard data={data[index + 3]} />
                      </Col>
                    )}
                  </Row>
                );
              }
            })}
        </Container>
      ) : (
        <Spinner animation="border" className={classes.spinner} />
      )}
    </div>
  );
};

export default Episodes;
