import { Button, Table, Form, FormControl } from "react-bootstrap";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";

export default function BodyAdminProductsLayout(props) {
  const [cookie, setCookie] = useCookies(["user"]);
  const router = useRouter();

  console.log(props);

  const handleDelete = async (e) => {
    e.preventDefault();
    if (e.target.id) {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_ENTRYPOINT}/user/${e.target.id}`,
          {
            headers: {
              "Content-Type": "application/json",
              authorization: cookie.userToken,
            },
            credentials: "include",
            method: "DELETE",
          }
        );
        location.reload();
      } catch (err) {
        console.log(err);
      }
    }
  };

  let usersArray = [];
  props.users &&
    props.users.map((x) => {
      usersArray.push(
        //href={`admin/products/${x._id}`}
        <tr>
          <td>{x?._id}</td>
          <td>
            {x?.first_name} {x?.last_name}
          </td>
          <td>{x?.email}</td>
          <td>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <Button className="btn-blue-umk" href={`/admin/users/${x._id}`}>
                Edytuj
              </Button>
              <Button
                className="btn-yellow-umk"
                onClick={handleDelete}
                id={x?._id}
              >
                Usuń
              </Button>
            </div>
          </td>
        </tr>
      );
    });

  return (
    <div>
      <div className="products-title">
        <span className="products-title-text">Lista użytkowników</span>
      </div>
      <div style={{ margin: "25px" }}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>id</th>
              <th>Imię i Nazwisko</th>
              <th>E-mail</th>
              <th style={{ textAlign: "center" }}>Akcję</th>
            </tr>
          </thead>
          <tbody>{usersArray}</tbody>
        </Table>
        <Button variant="blue-umk" href="/admin/users/create">
          Dodaj
        </Button>
      </div>
    </div>
  );
}
