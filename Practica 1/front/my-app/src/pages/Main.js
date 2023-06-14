import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
function Main() {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">REST SOAP</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="REST" id="basic-nav-dropdown">
              <NavDropdown.Item href="/getRest">GET REST</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/postRest">POST REST </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="SOAP" id="basic-nav-dropdown">
              <NavDropdown.Item href="/getSoap">GET SOAP</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/postSoap">POST SOAP</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Main;