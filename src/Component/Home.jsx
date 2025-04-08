import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData, cartData, removeCard, toggleFavourite } from "./useReducer";
import { Link, useNavigate } from "react-router-dom";
import logoImg from "../assets/logo.png";
// import { useAuth0 } from "@auth0/auth0-react";

function Home() {
  // const {logout, isAuthenticated} = useAuth0();
  const dispatch = useDispatch();
  const navigate = useNavigate();
 const [selectedCategories,setSelectedCategories] = useState({

 });

  const { loading, products, error, filterData } = useSelector(
    (state) => state?.requestData || {}
  );

  const addCartData = useSelector((state) => state?.addCartData);

  const categoryHandle = () => {
    let selectedCategoryNames = Object.keys(selectedCategories).filter((key) => selectedCategories[key]);// filters the keys (category names) based on whether their value in selectedCategories is truthy.
  
    if (selectedCategoryNames.length === 0) {
      // If no category is selected, show all products
      dispatch(fetchData({ loading: false, products, filterData: products, error: null }));
      return;
    }
  
    let filterContent = products.filter((product) =>
      selectedCategoryNames.includes(product.category.toLowerCase())
    );
  
    dispatch(fetchData({ loading: false, products, filterData: filterContent, error: null }));
  };

  
  useEffect(() => {
    categoryHandle();
  }, [selectedCategories]);

  
  useEffect(() => {
    const fetchDataFromApi = async () => {
      dispatch(fetchData({ loading: true, products: [], filterData: [], error: null }));
  
      try {
        const response = await fetch("https://fakestoreapi.com/products");
  
        if (!response.ok) {
          dispatch(fetchData({ loading: false, products: [], filterData: [], error: "Failed to load data" }));
          throw new Error("Failed to fetch data");
        }
  
        const data = await response.json();
  
        dispatch(fetchData({ loading: false, products: data, filterData: data, error: null }));
      } catch (error) {
        dispatch(fetchData({ loading: false, products: [], filterData: [], error: "Something went wrong!" }));
      }
    };
  
    fetchDataFromApi();
  }, []);
  

  if (loading) {
    return <div>Loading....</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // const cartLength = (product) => {
  //   dispatch(cartData(product));
  // };

  const filterItems = (e) => {
    let value = e.target.value.toLowerCase();
    // console.log(e.target.value,"target");
    let filteredProducts = products;
    // console.log(products,"products");

    filteredProducts = filteredProducts.filter(
      (product) =>
        product.title.toLowerCase().includes(value) ||
        product.price.toString().includes(value)
    ); 
  
    // Dispatch the filtered data
    dispatch(
      fetchData({
        loading: false,
        products: products,
        filterData: filteredProducts,
        error: null,
      })
    );
  };
  
  // const removeData = (id) => {
  //   dispatch(removeCard(id));
  // };

  const handleToggleFavourite = (productId) => {
    // console.log("sdfgh",productId)
    dispatch(toggleFavourite(productId));
  };
  // console.log(products,">>")

  const handleNavigate = (content) => {
    // console.log(content,"navi")
    navigate(`/product/${content.title}`, { state: content });
  };

  const handleCheckBoxChange = (e)=>{
   let {name,checked} = e.target;
   setSelectedCategories((prev)=>({
    ...prev,
[name]:checked,
   }));
   categoryHandle(e,name);//Trigger filtering based on the selected checkbox
  //  console.log(filterItems,"filterdata")
  };
  

  return (
 
      <div>
      {console.log(filterData, "filterData")}
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
                <a className="nav-link active" aria-current="page" href="#">
                  Home
                </a>
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
                <a className="nav-link" href="#">
                  <Link
                    to="/wishList"
                    className="text-decoration-none text-dark"
                  >
                    WishList
                  </Link>
                  (
                  {
                    products.filter((product) => product.isFavourite === true)
                      ?.length
                  }
                  )
                </a>
              </li>
            </ul>
            <form className="d-flex" role="search">
              <input
                className="form-control rounded-start-2 input"
                placeholder="Shirts, Tops..."
                aria-label="Search"
                onChange={(e) => filterItems(e)}
              />
              <i class="bi bi-search icon"></i>
            </form>
          
           {/* <button className="btn btn-dark mx-5" onClick={()=>logout()}>Logout</button> */}
          
          </div>
        </div>
      </nav>

      {/* filter */}
      <div className="filter_popUp mx-1 my-1 rounded p-2">
        <h5 className="mx-2 ">FILTERS</h5>
        <p className="mx-2">100+ Products</p>
        <hr />
        <h5>Category</h5>
        <form className="d-flex" role="search">
              <input
                className="form-control rounded-start-2 input"
                placeholder="Shirts, Tops..."
                aria-label="Search"
                onChange={(e) => filterItems(e)}
              />
              <i class="bi bi-search icon"></i>
            </form>
          <input type="checkbox" className="my-3 mx-1" name="men's clothing"  onChange={handleCheckBoxChange} checked={selectedCategories.mensclothing} value="men's clothing"  /><span>Men's Clothing</span><br />
          <input type="checkbox" className="my-3 mx-1" name="women's clothing" onChange={handleCheckBoxChange} checked={selectedCategories.womensclothing} value="women's clothing"/><span>Women's Clothing</span><br />
          <input type="checkbox"  className="my-3 mx-1" name="jewelery" onChange={handleCheckBoxChange} checked={selectedCategories.jewelery} value="jewelery" /><span>jewelery</span><br />
          <input type="checkbox"  className="my-3 mx-1" name="electronics" onChange={handleCheckBoxChange} checked={selectedCategories.electronics} value="electronics" /><span>electronics</span><br />  
        
      </div>
   

      {/* Home */}
      {console.log(products, "products")}
      {products && products.length > 0 ? (
        <div className="p-20">
          <div
            className="d-flex flex-wrap"
            style={{ marginLeft: "10%", marginTop: "-23rem" }}
          >
            {(filterData ? filterData : products)?.map((content) => (
              <div
                style={{
                  // border: "1px solid black",
                  // marginLeft:"10px",
                  margin: "25px 90px 10px 90px",
                  maxWidth: "500px",
                  padding: "20px", // Add padding inside the div
                  boxSizing: "border-box", // Ensure padding does not affect width
                  boxShadow: "5px 8px 10px #888888",
                }}
                key={content.id}
              >
                {/* console.log("products",products) */}
                <h5 className="card-title" style={{ marginBottom: "10px" }}>
                  {content?.title}
                </h5>

                <img
                  src={content?.image}
                  alt={content?.title}
                  style={{
                    width: "20%",
                    marginRight: "10px", // Space between image and text
                    display: "inline-block", // To make the text wrap next to image
                    verticalAlign: "top", // Align image with text
                  }}
                  onClick={() => handleNavigate(content)}
                />
                {console.log('::::::::::::render', content.isFavourite)
                }
                <button
                  className=" my-2 mx-2"
                  style={{ float: "right" }}
                  onClick={() => handleToggleFavourite(content.id)}
                >
                  {content.isFavourite ? (
                    <i className="bi bi-heart-fill text-danger"></i>
                  ) : (
                    <i className="bi bi-heart-fill text-light"></i>
                  )}
                </button>

                <p style={{ width: "80%", margin: "0" }}>
                  {content.description}
                </p>
                <p style={{ marginTop: "10px", marginBottom: "0" }}>
                  <strong>Price: </strong>
                  {content.price}
                </p>
           
                {/* <button
                  className="btn btn-danger"
                  disabled={addCartData?.some((item) => item.id == content?.id)}
                  onClick={() => cartLength(content)}
                >
                  Add to Cart
                </button>

                <button
                  className="btn btn-warning "
                  style={{ float: "right" }}
                  disabled={
                    addCartData?.length === 0 ||
                    !addCartData?.some((item) => item.id == content?.id)
                  }
                  onClick={() => removeData(content.id)}
                >
                  Remove
                </button> */}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>No products available</div>
      )}
    </div>
    
   
  );
}

export default Home;
