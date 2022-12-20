import React from "react";
import Table from "./Grid";

const stringSorter = (key, a, b) => {
  return a[key] > b[key] ? 1 : -1;
};

const tableColumns = [
  {
    header: "First Name",
    key: "fname",
    type: "string",
    sort: stringSorter.bind(null, "fname"),
  },
  {
    header: "Last Name",
    key: "lname",
    type: "string",
    sort: stringSorter.bind(null, "lname"),
  },
  {
    header: "Email",
    key: "email",
    type: "string",
    sort: stringSorter.bind(null, "email"),
  },
];

const data = [
  { fname: "A Ganesh", lname: "E Kumar", email: "ganesh1@abc.com", id: 1 },
  { fname: "B Ganesh", lname: "B Kumar", email: "ganesh3@abc.com", id: 2 },
  { fname: "C Ganesh", lname: "C Kumar", email: "ganesh2@abc.com", id: 3 },
  { fname: "D Ganesh", lname: "A Kumar", email: "ganesh7@abc.com", id: 4 },
  { fname: "E Ganesh", lname: "D Kumar", email: "ganesh8@abc.com", id: 5 },
  { fname: "F Ganesh", lname: "F Kumar", email: "ganesh9@abc.com", id: 6 },
  { fname: "G Ganesh", lname: "G Kumar", email: "ganesh10@abc.com", id: 7 },
  { fname: "H Ganesh", lname: "H Kumar", email: "ganesh11@abc.com", id: 8 },
  { fname: "i Ganesh", lname: "D Kumar", email: "ganesh8@abc.com", id: 9 },
  { fname: "j Ganesh", lname: "D Kumar", email: "ganesh8@abc.com", id: 10 },
  { fname: "k Ganesh", lname: "D Kumar", email: "ganesh8@abc.com", id: 11 },
  { fname: "l Ganesh", lname: "D Kumar", email: "ganesh8@abc.com", id: 12 },
  { fname: "m Ganesh", lname: "D Kumar", email: "ganesh8@abc.com", id: 13 },
  { fname: "n Ganesh", lname: "D Kumar", email: "ganesh8@abc.com", id: 14 },
  { fname: "o Ganesh", lname: "D Kumar", email: "ganesh8@abc.com", id: 15 },
  { fname: "pk", lname: "D Kumr", email: "ganesh8@bc.com", id: 16 },
  { fname: "wk", lname: "D Kumr", email: "ganesh8@bc.com", id: 17 },
];

const TestTable = () => {
  return <Table columns={tableColumns} name="Test " data={data} />;
};

export default TestTable;
