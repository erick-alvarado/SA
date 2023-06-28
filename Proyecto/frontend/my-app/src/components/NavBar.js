import LoginButton from './LoginButton';
import LogOutButton from './LogoutButton';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Registro from './RegistroButton';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const nickname = localStorage.getItem("nickname") || 2;
  const id = localStorage.getItem("id") || 5;

  // 0 = No logeado
  // 1 = Cliente
  // 2 = Proveedor 

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">Econo Ahorro</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">

          <Nav className="me-auto" navbar>
            {nickname == 1 &&
              <Nav className="me-auto" navbar>
                <Nav.Link as={Link} to={`/cliente/${id}`}>Perfil</Nav.Link>
                <Nav.Link href="/cliente/subasta"> Crear Subasta </Nav.Link>
                <Nav.Link href="/cliente/subastaList"> Subastas </Nav.Link>
                <Nav.Link href="/cliente/misSubastas"> Mis Subastas </Nav.Link>
                <Nav.Link href="/cliente/historial"> Historial </Nav.Link>
              </Nav>
            }
            {nickname == 2 &&
              <Nav className="me-auto" navbar>
                <Nav.Link href="/proveedor"> Perfil </Nav.Link>
                <Nav.Link href="/proveedor/productos"> Productos </Nav.Link>
                <Nav.Link href="/proveedor/ventas"> Ventas </Nav.Link>
                <Nav.Link href="/proveedor/subasta"> Crear Subasta </Nav.Link>
                <Nav.Link href="/proveedor/subastaList"> Subastas </Nav.Link>
                <Nav.Link href="/proveedor/misSubastas"> Mis Subastas </Nav.Link>
                <Nav.Link href="/proveedor/historial"> Historial </Nav.Link>
              </Nav>
            }
            {nickname == 3 &&
              <Nav className="me-auto" navbar>
                <Nav.Link href="/Planilla"> Planilla </Nav.Link>
                <Nav.Link href="/Usuarios"> Usuarios </Nav.Link>

              </Nav>


            }
            {nickname == 0 &&
              <Nav className="me-auto" navbar>
              </Nav>
            }
          </Nav>

          {nickname == 0 && <Registro />}
          {nickname == 0 && <LoginButton />}
          {nickname != 0 && <LogOutButton />}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default NavBar;