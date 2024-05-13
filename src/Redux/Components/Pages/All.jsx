import { Button, Container, Toolbar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import { fetchLimit, fetchSort, fetchUser } from "../Reducer/mediaSlice";
import Header from "../Header/Header";

export default function All() {
  let dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  // console.log(search);

  const handleSort = () => {
    dispatch(fetchSort()).then((res) => {
      console.log("dispatch for all sort user:", res.payload);
      setData(res.payload);
    });
  };

  const handleLimit = () => {
    dispatch(fetchLimit()).then((res) => {
      console.log("dispatch for all limit user:", res.payload);
      setData(res.payload);
    });
  };

  const handleReset = () => {
    dispatch(fetchUser()).then((res) => {
      console.log("dispatch for all view user:", res.payload);
      setData(res.payload);
    });
  };

  useEffect(() => {
    dispatch(fetchUser()).then((res) => {
      console.log("dispatch for all view user:", res.payload);
      setData(res.payload);
    });
  }, []);

  return (
    <>
      <Header />
      <h3>This is All user Data</h3>

      <Container className="user-table">
        <input type="text" name="" id="" placeholder="Search Product" onChange={(e) => setSearch(e.target.value)} />
        <div className="btn">
          <button onClick={() => handleSort()}>sort</button>
          <button onClick={() => handleLimit()}>limit</button>
          <button onClick={() => handleReset()}>Reset</button>
        </div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  ID
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  User Name (First Name)
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  Email
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  Phone
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  Address (City)
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data
                .filter((view) => {
                  return search.toLocaleLowerCase() === "" ? view : view.name.firstname.toLocaleLowerCase().includes(search) ? view : view.email.toLocaleLowerCase().includes(search);
                })
                .map((view) => (
                  <TableRow key={view.id}>
                    <TableCell align="center">{view.id}</TableCell>
                    <TableCell align="center">{view.name.firstname}</TableCell>
                    <TableCell align="center">{view.email}</TableCell>
                    <TableCell align="center">{view.phone}</TableCell>
                    <TableCell align="center">
                      {view.address.city},{view.address.number},{view.address.street},{view.address.zipcode}
                    </TableCell>
                    <TableCell align="center">
                      <Button variant="contained">
                        <Link to={`single/${view.id}`} style={{textDecoration:"none", color:'white'}}>Single</Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
}
