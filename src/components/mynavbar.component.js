import React, { Component } from "react";
// import { Link } from "react-router-dom";
import { Nav, Navbar, Container } from "react-bootstrap";

export default class Mynavbar extends Component {
  render() {
    return (
      <div>
        <Navbar bg="primary" variant="dark">
          <Container>
            <Navbar.Brand href="/">Movies</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      </div>
    );
  }
}
