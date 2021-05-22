import {
  Navbar,
  NavDropdown,
  Form,
  FormControl,
  Button,
  Nav,
} from "react-bootstrap";

export default function HeaderLayout(props) {
  return (
    <Navbar bg="" expand="lg">
      <Navbar.Brand href="/">Sklep internetowy UMK</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/">Strona główna</Nav.Link>
          <Nav.Link href="/">Regulamin</Nav.Link>
          <Nav.Link href="/">Kontakt</Nav.Link>
          {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">
              Another action
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">
              Separated link
            </NavDropdown.Item>
          </NavDropdown> */}
        </Nav>
        <Form inline>
          <FormControl
            type="text"
            placeholder="Podaj nazwę artykułu..."
            className="mr-sm-2"
          />
          <Button variant="outline-success">Szukaj</Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
}
