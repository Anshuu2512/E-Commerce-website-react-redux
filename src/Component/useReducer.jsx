const FETCH_DATA = "fetchData";
const CART_DATA = "cartData";
const FILTER_DATA = "filterData";
const REMOVE_FROM_CART = "removeFromCart";
const CLEAR_CART = "clearCart";
const COUNT_INCREMENT = "countIncrement";
const COUNT_DECREMENT = "countDecrement";
const REMOVE_CARD = "removeCard";
const Toggle_FAVOURITE = "toggleFavourite";
const SET_FILTER_TERM = "setFilterTerm";
const ALL_CLEAR_WISHLIST = "allClearWishList";
const PAYMENT_METHOD = "paymentMethod";


export const paymentMethod = (content)=>({
  type:  PAYMENT_METHOD ,
  payLoad: content,
})

export const allClearWishList = (id)=>({
  type:  ALL_CLEAR_WISHLIST,
  payLoad: id,
});

export const fetchData = (data) => ({
  type: FETCH_DATA,
  payLoad: data,
});
export const removeFromCart = (id) => ({
  type: REMOVE_FROM_CART,
  payLoad: id,
});

export const cartData = (addCart) => ({
  type: CART_DATA,
  payLoad: addCart,
});

export const filterData = (payLoad) => ({
  type: FILTER_DATA,
  payLoad: payLoad,
});

export const clearCart = (id) => ({
  type: CLEAR_CART,
  payLoad: id,
});

export const countIncrement = (payLoad) => ({
  type: COUNT_INCREMENT,
  payLoad: payLoad,
});
export const countDecrement = (payLoad) => ({
  type: COUNT_DECREMENT,
  payLoad: payLoad,
});

export const removeCard = (id) => ({
  type: REMOVE_CARD,
  payLoad: id,
});

export const toggleFavourite = (productId) => ({
  type: Toggle_FAVOURITE,
  payLoad: productId,
});

export const setFilterTerm = (term) => ({
  type: SET_FILTER_TERM,
  payLoad: term,
});

const intialValue = {
  requestData: {
    loading: false,
    products: [],
    error: "",
    filterData:"",
   
  },
  addCartData: [],
  deleteData: [],
  clearData: [],
  countIncrement: 0,
  removeCard: [],

  gettingData : {
    fullname:[],
    address: [],
    state: [],
    pincode:[],
    country:[],
    mobile:[]
  }
  
 };

const useReducer = (state = intialValue, action) => {
  // console.log(state, action, "action");
  switch (action.type) {
    case FETCH_DATA:
      return {
        ...state,
        requestData: {
          ...state.requestData,
          loading: action.payLoad.loading,
          products: action.payLoad.products,
          error: action.payLoad.error,
          filterData: action.payLoad.filterData || state.requestData.filterData,
        },
      };
      case SET_FILTER_TERM:
        return{
          ...state,
          requestData:{
            ...state.requestData,
            filterData:action.payLoad
          }
        }
    case CART_DATA:
      return {
        ...state,
        addCartData: [
          ...state.addCartData,
          { ...action.payLoad, count: action.payLoad.count || 1 },
        ],
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        requestData: {
          ...state.requestData,
          products: state.requestData.products.filter(
            (product) => product.id !== action.payLoad
          ),
        },
      };
  
    case CLEAR_CART:
      return {
        ...state,
        addCartData: [],
      };

      case ALL_CLEAR_WISHLIST:
        return {
          ...state,
          requestData: {
            ...state.requestData,
            products: [], // Clear the wishlist products
          },
        };
      
        
    case COUNT_INCREMENT:
      return {
        ...state,
        addCartData: state.addCartData.map((product) =>
          product.id === action.payLoad
            ? { ...product, count: product.count + 1

            }
            : product
        ),
      };
    case COUNT_DECREMENT:
      return {
        ...state,
        addCartData: state.addCartData.map((product) =>
          product.id === action.payLoad && product.count > 0
            ? { ...product, count: product.count - 1 }
            : product
        ),
      };
    case REMOVE_CARD:
      return {
        ...state,
        addCartData: state.addCartData.filter(
          (product) => product.id !== action.payLoad
        ),
      };
    case Toggle_FAVOURITE:
      console.log(action.payLoad, ">>");
      return {
        ...state,
        requestData: {
          ...state.requestData,
          products: state.requestData.products.map((product) =>{
            // console.log('::::::176',  product.id === action.payLoad
            //   ? true
            //   : false, {
            //     ...product,
            //     isFavourite: product?.isFavourite
            //       ? !product.isFavourite
            //       : true,
            //   });
            
           return  product.id === action.payLoad
              ? {
                  ...product,
                  isFavourite: product.isFavourite
                    ? !product.isFavourite
                    : true,
                }
              : product
          }
          ),
          filterData:state.requestData.products.map((product) =>{
            // console.log('::::::176',  product.id === action.payLoad
            //   ? true
            //   : false, {
            //     ...product,
            //     isFavourite: product?.isFavourite
            //       ? !product.isFavourite
            //       : true,
            //   });
            
           return  product.id === action.payLoad
              ? {
                  ...product,
                  isFavourite: product.isFavourite
                    ? !product.isFavourite
                    : true,
                }
              : product
          }),
        },
      };
      
      case  PAYMENT_METHOD:
        console.log(action.payLoad,">>")
        return{
          ...state,
          gettingData: action.payLoad.userData
        }

    default:
      return state;
  }
};
export default useReducer;
