import { Button, Table, Form, FormControl, Image } from "react-bootstrap";
import Pagination from "rc-pagination";
import { useState } from "react";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";

export default function BodyAdminOrdersLayout(props) {
  const [cookie, setCookie] = useCookies(["user"]);
  const router = useRouter();

  const handleDelete = async (e) => {
    e.preventDefault();
    if (e.target.id) {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_ENTRYPOINT}/order/${e.target.id}`,
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
       
      }
    }
  };

  let ordersArray = [];
  props.orders?.data &&
    props.orders?.data.map(async (x) => {
      ordersArray.push(
        //href={`admin/products/${x._id}`}
        <tr>
          <td>{x?._id}</td>
          <td>
            <a href={`/admin/users/${x?.user}`}>{x?.user}</a>
          </td>
          <td>{new Date(x?.date).toLocaleString()}</td>
          <td>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <Button className="btn-blue-umk" href={`/admin/orders/${x._id}`}>
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

  const handleOnPageChange = (page) => {
    router.push(`/admin/orders?page=${page - 1}`);
  };

  return (
    <div>
      <div className="products-title">
        <span className="products-title-text">Lista zamówień</span>
      </div>
      <div style={{ margin: "25px" }}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>id</th>
              <th>Użytkownik</th>
              <th>Data</th>
              <th style={{ textAlign: "center" }}>Akcję</th>
            </tr>
          </thead>
          <tbody>{ordersArray}</tbody>
        </Table>
        <div style={{ margin: "25px 0 25px 0" }}>
          <Pagination
            onChange={handleOnPageChange}
            current={props.page + 1}
            total={props?.orders?.total} //TODO change to totalItems
            pageSize={9}
            locale=""
          />
        </div>
      </div>
    </div>
  );
}
