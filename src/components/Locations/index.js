import React, { useState, useEffect } from "react";
import { Container, Row, Col, Spinner, Pagination } from "react-bootstrap";

import classes from "./index.module.css";

import LocationsCard from "./LocationsCard";

const Locations = () => {
  const [data, setData] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [requestInfo, setRequestInfo] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const getLocations = async (page = 1) => {
    const fetchPage = page ? `?page=${page}` : "";

    const response = await fetch(
      `https://rickandmortyapi.com/api/location${fetchPage}`,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    const locations = await response.json();
    setRequestInfo(locations.info);
    setData(
      locations.results.sort((a, b) =>
        a.name > b.name ? 1 : b.name > a.name ? -1 : 0
      )
    );
    setActivePage(page);
    setIsLoading(false);
  };

  useEffect(() => {
    getLocations();
  }, []);

  let items = [];
  for (let number = 1; number <= requestInfo.pages; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === activePage}
        onClick={() => getLocations(number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  return (
    <div className={classes.locations}>
      <h2>Locations</h2>
      <Pagination size="sm">{items}</Pagination>
      {!isLoading ? (
        <Container fluid>
          {data.length > 0 &&
            data?.map((location, index) => {
              if (index % 4 === 0) {
                return (
                  <Row key={index}>
                    <Col xs={6} md={3} className={classes.col}>
                      {data?.[index] && <LocationsCard data={data[index]} />}
                    </Col>
                    <Col xs={6} md={3} className={classes.col}>
                      {data?.[index + 1] && (
                        <LocationsCard data={data[index + 1]} />
                      )}
                    </Col>
                    <Col xs={6} md={3} className={classes.col}>
                      {data?.[index + 2] && (
                        <LocationsCard data={data[index + 2]} />
                      )}
                    </Col>
                    <Col xs={6} md={3} className={classes.col}>
                      {data?.[index + 3] && (
                        <LocationsCard data={data[index + 3]} />
                      )}
                    </Col>
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

export default Locations;
