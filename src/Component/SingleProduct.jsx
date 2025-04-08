import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logoImg from "../assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { cartData} from "./useReducer";

function SingleProduct() {
  const dispatch = useDispatch();
  const addCartData = useSelector((state) => state.addCartData);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity,setQuantity] = useState(null);
  // const selectedSizeValue = useSelector((state) => state.selectedSize);
  const location = useLocation();
  const product = location.state;

  //  console.log(location.state,"???") //state is a property,the state will help to get the product when we targeted product.

  const ProductHandle = (product) => {
    if (selectedSize) {
      dispatch(cartData({ ...product, size: selectedSize,count:quantity }));
    } else {
      alert("Please select a size.");
    }
  };

    const handleSizeChange = (e)=>{
      // console.log(e.target.value,"aa")
      setSelectedSize(e.target.value);
    };
    const handleQuantity =(e)=>{
      setQuantity(e.target.value)
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
                  <Link to="/Cart" className="text-decoration-none text-dark">
                    Cart ({addCartData?.length})
                  </Link>
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
              />
              <i class="bi bi-search icon" ></i>
            </form> */}
          </div>
        </div>
      </nav>

      <div className="container">
        <div className="row">
          <div className="col-6">
            <img
              src={location.state?.image}
              alt=""
              style={{
                width: "45%",
                marginLeft: "28%",
                marginTop: "15%",
                display: "inline-block", // To make the text wrap next to image
                // border:"2px solid red",
              }}
            />
          </div>
          <div className="col-6">
            <b>
              {" "}
              <h3 className="my-5">{location.state?.title}</h3>
            </b>
            <h4 className="fs-2">
              <p>${location.state?.price}</p>
            </h4>
            <select
              
              onChange={(e)=>handleSizeChange(e)}
              name="size"
              id="size"
              style={{ height: "8%", width: "20%", textAlign: "center" }}
              className="fs-5"
              aria-placeholder="Select Value"
            >
              <option value="">select size</option>
              <option value="xs">XS</option>
              <option value="xl">XL</option>
              <option value="xxl">XXL</option>
              <option value="xxxl">XXXL</option>
            </select>
            <br />
            <input
              type="number"
              className="my-4"
              min={1}
              defaultValue={1}
              style={{ width: "9%", padding: "6px", textAlign: "center" }}
              onChange={(e)=>handleQuantity(e)}
            />
            <button
              className="btn btn-danger mx-4 "
              onClick={()=>ProductHandle(product)}
              // disabled={addCartData?.some(
              //   (item) => item.id == location.state.id
              // )}
            >
              {" "}
              Add To Cart
            </button>
            <h1 style={{ fontWeight: "700" }} className="my-3">
              Product Details
            </h1>
            <p style={{ fontSize: "20px" }}>{location.state?.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleProduct;
