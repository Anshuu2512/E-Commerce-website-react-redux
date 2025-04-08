// import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import {
  cartData,
  clearCart,
  countDecrement,
  countIncrement,
  fetchData,
  removeCard,
} from "./useReducer";
import cartImg from "../assets/cart.png";
import logoImg from "../assets/logo.png";
import { useEffect, useState } from "react";

function Cart() {
  // const filterData = useSelector((state) => state?.requestData);
  const addCartData = useSelector((state) => state?.addCartData);
  const [totalPrice, setTotalPrice] = useState(0);
  const [deliveryFee,setDeliveryFee] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const updateTotalPrice = addCartData.reduce((total,cartData) => {
      return total + cartData.price  * cartData.count;
    }, 0);
    setTotalPrice(updateTotalPrice);
  }, [addCartData]);

  useEffect(()=>{
    const updatePrice = addCartData.reduce((totaldata,cartData)=>{
      return totaldata + 127 + cartData.price * cartData.count;
    },0)
    setDeliveryFee(updatePrice);
  },[addCartData]);


  // const filterItems = (e) => {
  //   const value = e.target.value.toLowerCase();
  //   const filterContent = addCartData?.filter((product) => {
  //     return (
  //       product.title.toLowerCase().includes(value) ||
  //       product.price.toString().includes(value)
  //     );
  //   });
  //   if (filterContent.length > 0) {
  //     dispatch(
  //       fetchData({
  //         loading: false,
  //         products: addCartData,
  //         error: null,
  //         filterData: filterContent,
  //       })
  //     );
  //   } else {
  //     dispatch(
  //       fetchData({
  //         loading: false,
  //         products: addCartData,
  //         filterData: [],
  //         error: null,
  //       })
  //     );
  //   }
  // };

  
   
  const handleRemove = (id) => {
    dispatch(removeCard(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const increment = (id) => {
    dispatch(countIncrement(id));
  };

  const decrement = (id) => {
    dispatch(countDecrement(id));
  };

  const maxCount = 20;
  const itemsToDisplay = addCartData;
    // filterData?.filterData?.length > 0 ? filterData.filterData : addCartData;
    console.log("cgghjvd",itemsToDisplay)

    const handleEdit =(cartData)=>{
      navigate(`/product/${cartData.title}`,{state:cartData})
    }

  return (
    <div>
      <nav className="navbar navbar-expand-lg"  style={{backgroundColor:"#c7be77"}}>
        <div className="container">
          <img src={logoImg} alt="" style={{ height: "50%", width: "12%" }} />
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse fs-5"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0 gap-4">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  <Link to="/" className="text-decoration-none text-dark">
                    Home
                  </Link>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Cart
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  <Link
                    to="/wishList"
                    className="text-decoration-none text-dark"
                  >
                    WishList
                  </Link>
                </a>
              </li>
            </ul>
            {/* <form className="d-flex" role="search">
              <input
                className="form-control mx-auto "
                placeholder="Shirts, Tops..."
                aria-label="Search"
                onChange={(e) => filterItems(e)}
              />
              <i class="bi bi-search icon"></i>
            </form> */}
          </div>
        </div>
      </nav>


      {itemsToDisplay.length >= 1 ? (
        <>
         <button className="btn btn-success my-3 mx-3" onClick={handleClearCart}>
          Clear Cart
        </button>
        <div className="row">
        <div
          className="col-6 mx-5"
          style={{
            boxSizing: "border-box", // Ensure padding does not affect width
            boxShadow: "5px 8px 10px #888888",
            width: "40%",
          }}
        >
          {itemsToDisplay?.map((cartData) => (
            
            <div
              key={cartData.id}
              style={{
                // border: "1px solid black",
                margin: "15px 10px 10px 90px",
                maxWidth: "500px",
                padding: "10px", // Add padding inside the div
                // boxSizing: "border-box", // Ensure padding does not affect width
                // boxShadow: "5px 8px 10px #888888"
              }}
          
            >
              <img
                src={cartData?.image}
                alt={cartData?.title}
                style={{
                  width: "20%",
                  marginRight: "10px", // Space between image and text
                  display: "inline-block", // To make the text wrap next to image
                  verticalAlign: "top", // Align image with text
                  float: "left",
                }}
              />
              <strong>
                <p className="card-title" style={{ marginBottom: "10px" }}>
                  {cartData?.title}
                </p>
              </strong>

              <p style={{ marginTop: "20px", marginBottom: "0" }}>
                <strong>Price: </strong>
                {cartData.price}
              </p>

              <p style={{ fontWeight: "500" }}>
                size: {cartData.size ? cartData.size : "No size selected"}
              </p>

              <div style={{ float: "right" }}>
                <button
                  className="btn btn-info"
                  disabled={cartData.count === 0}
                  onClick={() => decrement(cartData.id)}
                >
                  <strong>-</strong>
                </button>
                <button className="btn btn-dark">{cartData.count}</button>
                <button
                  className="btn btn-info"
                  disabled={cartData.count >= maxCount}
                  onClick={() => increment(cartData.id)}
                >
                  <strong>+</strong>
                </button>
              </div>

              <button
                className="btn btn-danger my-2"
                onClick={() => handleRemove(cartData.id)}
              >
                <i className="bi bi-trash"></i>
              </button>

          
             <button className="btn btn-warning mx-3" onClick={()=>handleEdit(cartData)}>edit</button>


            </div>
          ))}
        </div>
        {/* summary */}
        <div
          className="col-6 mx-5"
          style={{
            boxSizing: "border-box", // Ensure padding does not affect width
            boxShadow: "5px 8px 10px #888888",
            width: "30%",
            height: "15rem",
            borderRadius: "5px",
          }}
        >
          <div>
            <strong>
              <p className=" fs-5 sumry">
                Price Details({addCartData.length}) items
              </p>
            </strong>
            <p style={{ fontSize: "20px", float: "left" }}>
              Total Product Price
            </p>{" "}
            <span style={{ float: "right", fontSize: "19px" }}>
              + ${totalPrice}
            </span><br /><br />

          {/* delivery Fee */}
            <p style={{ fontSize: "20px", float: "left" }}>
             Delivery Fee
            </p>{" "}
            <span style={{ float: "right", fontSize: "19px" }}>
              + $127
            </span><br /><hr style={{width:"28rem"}} />

          {/* Total price */}
            <p style={{ fontSize: "20px", float: "left" }}>
            Total Cart Prize
            </p>{" "}
            <span style={{ float: "right", fontSize: "19px" }}>
               ${deliveryFee}
            </span><br /><br /> <br />         
          </div> 
          <Link to="/addressPage">
          <button className="btn btn-secondary">Confirm Your Order</button> 
          </Link>         
        </div>
      
      </div> 
        </>
       
      ) : (
        <>
          <img
            src={cartImg}
            style={{ marginLeft: "35%", height: "25%", width: "26%" }}
            className="my-3"
          ></img>
          <strong>
            {" "}
            <h1 className="text-danger " style={{ marginLeft: "44%" }}>
              Oops...!
            </h1>
          </strong>
          <p className="fs-3" style={{ marginLeft: "33%" }}>
            Your Cart is Empty! Go Shop something Now.
          </p>
        </>
      )}


    

    
    </div>
  );
}

export default Cart;
