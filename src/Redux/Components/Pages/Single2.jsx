import { Container, Toolbar } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import CardContent from "@mui/material/CardContent";
// import style from "../Layouts/style.css";
import { fetchSingle } from "../Reducer/mediaSlice";
import Header from "../Header/Header";

export default function Single2() {
  let { sid } = useParams();
  // console.log(sid);

  const [single, setSingle] = useState("");
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSingle(sid)).then((res) => {
      // console.log("dispatch for all single user:", res.payload);
      setSingle(res.payload);
      setAddress(res.payload.address);
      setName(res.payload.name);
    });
  }, []);

  console.log("Single Data: ", single);

  return (
    <>
      <Header />
      <br></br>
      <h2>This is single user Data</h2>
      <br></br>

      <Container>
        <CardContent className="single-card">
          <div className="single-content">
            <h4>Username: {single.username} </h4>
            <h4>
              Full Name: {name.firstname} {name.lastname}
            </h4>
            <h4>Email Address: {single.email}</h4>
            <h4>Phone No: {single.phone}</h4>
            <h4>
              Address: {address.city}, {address.number}, {address.street}, {address.zipcode}
            </h4>
          </div>
        </CardContent>
      </Container>
    </>
  );
}
