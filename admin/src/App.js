// in src/App.js
import * as React from "react";
import { Admin, Resource, ListGuesser } from "react-admin";
import jsonServerProvider from "ra-data-json-server";
import dataProvider from "./dataProvider.js";

//const dataProvider = jsonServerProvider("https://jsonplaceholder.typicode.com");
const App = () => (
  <Admin dataProvider={dataProvider}>
    <Resource name="products" list={ListGuesser} />
  </Admin>
);

export default App;
