import React, { useState } from "react";
import "./Address.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { paymentMethod } from "./useReducer";


function Address() {

  const [userData,setUserData]=useState({
    // fullname: "",
    // address: "",
    // state: "",
    // pincode: "",
    // country: "",
    mobile:""
  })

  const { fullname, address, state, picode, country, mobile } = useSelector((state) => state.gettingData);
  const dispatch = useDispatch();
  const [errors,setErrors] =useState("")

  const handleSubmit = () => {
    dispatch(paymentMethod({userData:userData}));
    let form = true;

    if(mobile.trim()===""){
      setErrors((prevErrors)=>({
        ...prevErrors,
        mobile:"enter the valid mobile number"
      }))
      form=false;
    }
    else{
      setErrors((prevErrors)=>({...prevErrors,mobile:""}));
    }
    // setUserData({
    //   fullname: "",
    //   address: "",
    //   state: "",
    //   pincode: "",
    //   country: "",
    //   mobile:""
    // })
  };
  
 

  return (
    <div>
      <div className="main">
        <div className="section-1 mx-auto my-5">
          <div className="head">
            <strong className="mx-3">
              <span>Add an address</span>
            </strong>
            <i className="bi bi-backspace mx-3 fs-4" style={{ float: "right" }}></i>
            <hr />
          </div>
          <div className="sec-2">
            <form action="" className="mx-4" onClick={handleSubmit}>
              <label htmlFor="">
                <b>Country/Region</b>
                <i className="bi bi-asterisk text-danger mx-1" style={{ fontSize: "9px" }}></i>
              </label>
              <select
                value={userData.country} // Bind select to Redux state
                onChange={(e)=>setUserData((prev)=>{return{
                  ...prev,
                  country:e.target.value
                }})}
                style={{
                  width: "95%",
                  borderRadius: "10px",
                  marginBottom: "20px",
                }}
              >
                <option value="select One">Select One</option>
                <option value="India">India</option>
                <option value="Mexico">Mexico</option>
                <option value="Pakistan">Pakistan</option>
                <option value="USA">USA</option>
                <option value="Vietnam">Vietnam</option>
              </select>

              <label htmlFor="">
                <b>Full name (First and Last name)</b>
                <i className="bi bi-asterisk text-danger mx-1" style={{ fontSize: "9px" }}></i>
              </label>
              <input
                type="text"
                value={userData.fullname} // Bind input to Redux state
                placeholder="Enter your name"
                style={{ width: "95%", marginBottom: "20px" }}
                onChange={(e)=>setUserData((prev)=>{
                  return{
                  ...prev,
                  fullname:e.target.value
                }})}
              />

              <label htmlFor="">
                <b>Mobile number</b>
                <i className="bi bi-asterisk text-danger mx-1" style={{ fontSize: "9px" }}></i>
              </label>
              <input
                type="text"
                value={userData.mobile} // Bind input to Redux state
                placeholder="Enter Your Mobile number"
                style={{ width: "95%", marginBottom: "20px" }}
                onChange={(e)=>setUserData((prev)=>{
                  return{
                  ...prev,
                  mobile:e.target.value
                }})}
              />

              <label htmlFor="">
                <b>Pincode</b>
                <i className="bi bi-asterisk text-danger mx-1" style={{ fontSize: "9px" }}></i>
              </label>
              <input
                type="text"
                value={userData.pincode} // Bind input to Redux state
                placeholder="6 digits [0-9] PIN code"
                style={{ width: "95%", marginBottom: "20px" }}
                onChange={(e)=>setUserData((prev)=>{
                  return{
                  ...prev,
                  pincode:e.target.value
                }})}
              />
              {console.log("bdcbdjc",country)}
              <label htmlFor="">
                <b>Flat,House.no,Buliding,Company,Apartment</b>
                <i className="bi bi-asterisk text-danger mx-1" style={{ fontSize: "9px" }}></i>
              </label>
              <input
                type="text"
                value={userData.address} // Bind input to Redux state
                placeholder="Enter your address"
                style={{ width: "95%", marginBottom: "20px" }}
                onChange={(e)=>setUserData((prev)=>{
                  return{
                  ...prev,
                  address:e.target.value
                }})}

              />

              <label htmlFor="">
                <b>Area,Street,Sector,Village</b>
              </label>
              <input
                type="text"
                placeholder="Enter the area"
                style={{ width: "95%", marginBottom: "20px" }}
              />

              <label htmlFor="">
                <b>Landmark</b>
              </label>
              <input
                type="text"
                placeholder="E.g. near apollo hospital"
                style={{ width: "95%", marginBottom: "20px" }}
              />

              <div className="last">
                <div className="row">
                  <div className="col">
                    <label htmlFor="">
                      <b>Town/City</b>
                    </label>
                    <input type="text" style={{ width: "100%", marginBottom: "20px" }} />
                  </div>
                  <div className="col">
                    <label htmlFor="">
                      <b>State</b>
                      <i className="bi bi-asterisk text-danger mx-1" style={{ fontSize: "9px" }}></i>
                    </label>
                    <select
                      value={userData.state} // Bind select to Redux state
                      onChange={(e)=>setUserData((prev)=>{
                        return{
                        ...prev,
                        state:e.target.value
                      }})}
                      style={{ width: "90%", marginBottom: "20px" }}
                    >
                      <option value="India">Select One</option>
                      <option value="ANDHRA PRADESH">ANDHRA PRADESH</option>
                      <option value="ASSAM">ASSAM</option>
                      <option value="BIHAR">BIHAR</option>
                      <option value="CHANDIGARH">CHANDIGARH</option>
                      <option value="DELHI">DELHI</option>
                      <option value="HARYANA">HARYANA</option>
                    </select>
                  </div>
                </div>
              </div>

              <input type="checkbox" style={{ float: "left" }} className="my-1" />
              <label htmlFor="" className="mx-3">
                Make this my default address
              </label>
              <br />

              <Link to="/paymentPage">
                <button className="btn bg-warning">Use this address</button>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Address;

