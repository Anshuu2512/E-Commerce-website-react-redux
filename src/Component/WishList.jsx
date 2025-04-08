import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { allClearWishList, cartData, setFilterTerm } from "./useReducer";
import logoImg from "../assets/logo.png";
import wishListImg from "../assets/wishlist1.png";

function WishList() {
   const [selectedSizee, setSelectedSizee] = useState(null);
  const { loading, products, error, filterData } = useSelector(
    (state) => state?.requestData || {}
  );
  const addCartData = useSelector((state) => state.addCartData);
  const dispatch = useDispatch();

  const filterContent = (e) => {
    dispatch(setFilterTerm(e.target.value));
  };

  // const filterProducts = products?.filter(
  //   (product) =>
  //     product.title.toLowerCase().includes(filterData.toLowerCase()) ||
  //     product.price.toString().includes(filterData.toLowerCase())
  // );

    const WishListCart = (product) => {
      if (selectedSizee) {
        dispatch(cartData({ ...product, size: selectedSizee }));
      } else {
        alert("Please select a size.");
      }
    };

  const favoriteProducts = products?.filter((item) => item?.isFavourite);

  const allCart = () => {
    dispatch(allClearWishList());
  };


  const handleSizeChange = (e)=>{
    // console.log(e.target.value,"aa")
    setSelectedSizee(e.target.value);
  };

  return (
    <div>
      {/* {console.log(filterProducts, "filterProducts", filterData, "filterData")} */}
      <nav className="navbar navbar-expand-lg" style={{backgroundColor:"#c7be77"}}>
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
                <Link className="nav-link active" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  <Link to="/cart" className="text-decoration-none text-dark">
                    Cart
                  </Link>
                  ({addCartData?.length})
                </a>
              </li>
              <li className="nav-item">
                <span className="nav-link">WishList</span>
              </li>
            </ul>
            <form
              className="d-flex"
              role="search"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                className="form-control me-2"
                placeholder="Shirts, Tops..."
                aria-label="Search"
                onChange={filterContent}
              />
              <i class="bi bi-search icon"></i>
            </form>
          </div>
        </div>
      </nav>

      {favoriteProducts.length !== 0 ? (
        <button className="btn btn-success mx-3 my-3" onClick={allCart}>
          All Clear
        </button>
      ) : (
        <>
          <img
            src={wishListImg}
            alt="Wish List Empty"
            style={{ marginLeft: "37%", marginTop: "4%" }}
          />
          <strong>
            <h1 className="text-danger my-3" style={{ marginLeft: "44%" }}>
              Oops...!
            </h1>
          </strong>
          <strong>
            <p className="fs-2" style={{ marginLeft: "33%" }}>
              Your Wish list is currently empty
            </p>
          </strong>
        </>
      )}

      {favoriteProducts
        // .filter((product) =>
        //   filterProducts.length === 0
        //     ? true
        //     : product.title.toLowerCase().includes(filterData.toLowerCase()) ||
        //       product.price.toString().includes(filterData.toLowerCase())
        // )
        .map((product) => (
          <div
            key={product.id}
            style={{
              // border: "1px solid black",
              margin: "15px 10px 10px 90px",
              maxWidth: "500px",
              padding: "10px",
              boxSizing: "border-box",
              boxShadow: "5px 8px 10px #888888",
            }}
          >
            <h5 className="card-title" style={{ marginBottom: "10px" }}>
              {product.title}
            </h5>

            <img
              src={product?.image}
              alt={product?.title}
              style={{
                width: "20%",
                marginRight: "10px",
                display: "inline-block",
                verticalAlign: "top",
              }}
            />
            <p style={{ width: "80%", margin: "0" }}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Temporibus quos ipsa obcaecati explicabo dignissimos dicta quia
              culpa sed facere consectetur velit, ad delectus placeat. Ratione
              maiores deleniti eveniet minima maxime.
            </p>
            <p style={{ marginTop: "10px", marginBottom: "0" }}>
              <strong>Price: </strong>
              {product.price}
            </p>

            <button
              className="btn btn-danger my-1"
              onClick={() => WishListCart(product)}
              disabled={addCartData.some((item) => item.id === product.id)}
            >
              Add to Cart
            </button>
            <select
              
              onChange={(e)=>handleSizeChange(e)}
              name="size"
              id="size"
              style={{ height: "8%", width: "20%", textAlign: "center",float:"right"}}
              className="fs-5 mx-4"
              aria-placeholder="Select Value"
        
            >
              <option value="">select size</option>
              <option value="xs">XS</option>
              <option value="xl">XL</option>
              <option value="xxl">XXL</option>
              <option value="xxxl">XXXL</option>
            </select>
          </div>
        ))}
    </div>
  );
}

export default WishList;
