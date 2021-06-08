import {
  Navbar,
  NavDropdown,
  Form,
  FormControl,
  Button,
  Nav,
} from "react-bootstrap";
import Image from "next/image";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";

export default function BodyAdminUserEdit(props) {
  const [cookies] = useCookies("user");
  const router = useRouter();
  const user = props.user;

  const handleSubmit = async (e) => {
    // console.log(e.target.email.value);
    // console.log(e.target.password.value);
    e.preventDefault();

    //TODO add addresses first!

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_ENTRYPOINT}/user/edit?edit=T`,
        {
          body: JSON.stringify({
            email: e.target.email.value,
            password: e.target.password.value,
            first_name: e.target.FirstName.value,
            last_name: e.target.LastName.value,
            phone_number: e.target.phone_number.value,
            birthdate: e.target.birthdate.value,
            role: e.target.role.value,
          }),
          headers: {
            "Content-Type": "application/json",
            authorization: cookies.userToken,
          },
          credentials: "include",
          method: "PUT",
        }
      ).then((x) => {
        if (x?.status == 204) router.push("/admin/users");
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="products-title">
        <span className="products-title-text">Użytkownik: {user.email}</span>
      </div>
      <div className="admin-edit-form">
        <Form style={{ width: "500px" }} onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Typ użytkownika</Form.Label>
            <Form.Control
              as="select"
              name="role"
              defaultValue={user.role}
              //required
            >
              <option value="user">Użytkownik</option>
              <option value="admin">Admin</option>
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Imię</Form.Label>
            <Form.Control
              type="text"
              name="FirstName"
              placeholder="Imię"
              defaultValue={user.first_name}
              //required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Nazwisko</Form.Label>
            <Form.Control
              type="text"
              name="LastName"
              placeholder="Nazwisko"
              defaultValue={user.last_name}
              //required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Data urodzenia</Form.Label>
            <Form.Control
              type="date"
              name="birthdate"
              defaultValue={user.birthdate}
              //required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>E-mail adres</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="E-mail"
              defaultValue={user.email}
              //required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Numer telefonu</Form.Label>
            <Form.Control
              type="tel"
              name="phone_number"
              placeholder="Nr. telefonu"
              defaultValue={user.phone_number}
              //required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Adres do korespondencji</Form.Label>
            <Form.Control
              type="text"
              //name="address1"
              placeholder="Adres do korespondencji"
              //required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Adres do wysyłki</Form.Label>
            <Form.Control
              type="text"
              //name="address2"
              placeholder="Adres do wysyłki"
              //required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Hasło</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Hasło"
              //required
            />
          </Form.Group>
          <div className="admin-edit-form-buttons">
            <Button variant="blue-umk" type="submit">
              Zapisz
            </Button>
            <Button
              variant="blue-umk"
              onClick={() => {
                router.push("/admin/users");
              }}
            >
              Anuluj
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
