import React, { useEffect, useState } from "react";
import logoImg from "../assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
import "./Payment.css";
import { Link } from "react-router-dom";
import visa from "../assets/visa.png";
import masterCard from "../assets/mastercard.png";
import maestroCard from "../assets/maestro.png";
import dinersCard from "../assets/diners.png";
import americanCard from "../assets/american.png";
import rupayCard from "../assets/rupepay.png";
import { cartData } from "./useReducer";

function Payment() {
  const [totalProduct,setTotalProduct] = useState(0);
  const [totalAmount,setTotalAmount] = useState(0);
  const { fullname, address, state, pincode, country } = useSelector(
    (state) => state.gettingData
  );
  const addCartData = useSelector((state) => state?.addCartData);
  const [popUp, setPopUp] = useState(false);

  const handlePopUp = () => {
    if (popUp === false) {
      setPopUp(
        alert(
          "We secure your payment and personal information when you share or save it with us. We don't share payment details  with us. We don't sell your information to other"
        )
      );
    } else {
      setPopUp();
    }
  };

useEffect(()=>{
 const updateAmount = addCartData.reduce((total,cartData)=>{
  return total + cartData.price * cartData.count;
 },0)
 setTotalProduct(updateAmount)
},[addCartData])

useEffect(()=>{
  const updateTotal = addCartData.reduce((total,cartData)=>{
    return total +127+ cartData.price * cartData.count;
  },0)
  setTotalAmount(updateTotal)
},[addCartData])

  return (
    <div>
      <nav className="navbar navbar-expand-lg"  style={{backgroundColor:"#c7be77"}}>
        <div className="container">
          <img src={logoImg} alt="" style={{ height: "50%", width: "12%" }} />

          <strong className="mx-auto" style={{ cursor: "pointer" }}>
            <h3 >Secure checkout  <i class="bi bi-chevron-compact-up" onClick={handlePopUp}></i></h3>
           
          </strong>
          <Link to="/cart"><i class="bi bi-cart2 fs-2"></i></Link>
          <sub
            style={{
              color: "white",
              height: "20px",
              width: "19px",
              border: "2px solid red",
              textAlign: "center",
              backgroundColor: "red",
              paddingTop: "8px",
              borderRadius: "20px",
              marginLeft: "-6px",
              marginTop: "18px",
            }}
          >
            {addCartData.length}
          </sub>
        </div>
      </nav>

      <div className="sec-2">
        <div className="container">
          <div className="row">
            <div className="col my-5">
              <div className="address">
                <h5 className="mx-4 pt-2">
                  Delivery to {fullname}{" "}
                  <Link to="/addressPage">
                    <span className="fs-6 mx-5">Change</span>
                  </Link>{" "}
                </h5>
                <span className="mx-4">
                  {address} <br />{" "}
                </span>{" "}
                <span className="mx-4">
                  {" "}
                  {pincode} {state}{" "}
                </span>
              </div>

              <div className="accounts my-4">
                <h5 className="mx-4 pt-4">Payment method</h5>
                <div className="inside">
                  <h5 className="mx-4 pt-2">Your available balance</h5>
                  <hr className="line" />
                  <form action="">
                    <input type="radio" className="mx-4" name="payment" />
                    <b>
                      <span>Credit or debit card</span>
                    </b>
                    <br />
                    <img
                      src={visa}
                      alt=""
                      style={{ height: "10%", width: "6%", marginLeft: "60px" }}
                    />
                    <img
                      src={masterCard}
                      alt=""
                      style={{ height: "10%", width: "6%" }}
                      className="mx-3"
                    />
                    <img
                      src={americanCard}
                      alt=""
                      style={{ height: "10%", width: "6%" }}
                      className="mx-2"
                    />
                    <img
                      src={dinersCard}
                      alt=""
                      style={{ height: "10%", width: "6%" }}
                      className="mx-2"
                    />
                    <img
                      src={maestroCard}
                      alt=""
                      style={{ height: "10%", width: "6%" }}
                      className="mx-2"
                    />
                    <img
                      src={rupayCard}
                      alt=""
                      style={{ height: "20%", width: "8%" }}
                      className="mx-2"
                    />{" "}
                    <br />
                    <input type="radio" className="mx-4 mt-4" name="payment" />
                    <b>
                      <span>Net Banking</span>
                    </b>
                    <br />
                    <select
                      name="payment"
                      id=""
                      className="mt-2"
                      style={{
                        marginLeft: "63px",
                        backgroundColor: "#e0e0e0",
                        borderRadius: "4px",
                      }}
                    >
                      <option value="">Choose an option</option>
                      <option value="">ICIC Bank</option>
                      <option value="">HDFC Bank</option>
                      <option value="">Axis Bank</option>
                      <option value="">Airtel Payments Bank</option>
                      <option value="">Kotak Bank</option>
                      <option value="">State Bank Of India</option>
                      <option value="">Andhra Bank</option>
                    </select>
                    <br />
                    <input type="radio" className="mx-4 mt-4" name="payment" />
                    <b>
                     <span>Other UPI Apps</span>
                    </b>
                    <br />
                    <input type="radio" className="mx-4 mt-4" name="payment" />
                    <b>
                      <span>EMI</span>
                    </b>
                    <br />
                    <input type="radio" className="mx-4 mt-4" name="payment" />
                    <b>
                      <span>Cash on Delivery/Pay on Delivery</span>
                    </b>
                    <br />
                    <p className="mt-1" style={{ marginLeft: "63px" }}>
                      Cash, UPI and Cards accepted.
                    </p>
                  </form>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="totalMoney mt-5 p-4">
                <Link to="/confirmpage"><button className="btn bg-warning btn1 mx-3 my-3">
                  Place to order
                </button></Link>
                <p style={{ float: "left" }}>Total Product Price</p>
                <span style={{ marginLeft: "16%" }}>+${totalProduct}</span>
                <br />
                <br />
                <p style={{ float: "left" }}>Delivery Fee</p>
                <span style={{ marginLeft: "29%" }}>+ $127</span>
                <br />
                <hr className="line2" />
                <p style={{ float: "left" }}>Order Total</p>
                <span style={{ marginLeft: "31%" }}>${totalAmount}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
