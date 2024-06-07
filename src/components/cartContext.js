import { createContext , useState , useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../redux/action";

export const CartContext = createContext({
    item:[],
    getProductQuanity:()=>{},
    addOneToCart:()=>{},
    removeOneFromCart:()=>{},
    deleteFromCart:()=>{},
    getTotalCost:()=>{},
    deleteAllArray:()=>{}
});

export function CartProvidor({children}){
    const [cartProducts,setCartProducts] = useState([]);
    const { data, loading, error} = useSelector((state) => state.products);
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getProducts());
    },[dispatch]);
    useEffect(() => {
        const cartProductsData = JSON.parse(localStorage.getItem('cartProducts'))
        
        if (cartProductsData) {
            setCartProducts(cartProductsData)
        }
    }, [])
    
    useEffect(() => {
        localStorage.setItem('cartProducts', JSON.stringify(cartProducts))
    }, [cartProducts])
   


    function getProductData(id) {

        let productData =data.find(product => product._id === id);
    
        if(productData == undefined){
            return undefined
        }
        return productData;
    }

    function getProductQuanity(id){
        const quanity = cartProducts.find(item => item.product === id)?.qty;
        if(quanity === undefined){
            return 0;
        }
        return quanity;
    }

    function addOneToCart(id){
        const quanity = getProductQuanity(id);
        if (quanity === 0) {
            setCartProducts(
                [
                    ...cartProducts,
                    {
                        product:id,
                        qty:1
                    }
                ]
            )
        } else {
            setCartProducts(
                cartProducts.map(
                    item =>
                    item.product === id
                    ?{...item, qty: item.qty + 1}
                    :item
                )
            )
        }
    }

    function removeOneFromCart(id){
        const quanity =getProductQuanity(id);
        if (quanity == 1) {
            deleteFromCart(id);
        } else {
            setCartProducts(
                cartProducts.map(
                    item =>
                    item.product === id
                    ?{...item, qty: item.qty - 1}
                    :item
                )
            ) 
        }
    }
    function deleteFromCart(id){
        setCartProducts(
            cartProducts =>
            cartProducts.filter(currentProduct =>{
                return currentProduct.product != id;
            })
        )
    }
    function deleteAllArray(){
        setCartProducts(
            cartProducts.filter(item => item.product !== item.product)
            )
        
    }
       
    function getTotalCost(){
        let totalCost = 0;
        cartProducts.map((cartItem) =>{
            const productData = getProductData(cartItem.product);
            totalCost += (productData.price * cartItem.qty);
        })
        return totalCost;
    }
    const contextValue ={
        item:cartProducts,
        getProductQuanity,
        addOneToCart,
        removeOneFromCart,
        deleteFromCart,
        getTotalCost,
        deleteAllArray
    }
    return(
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    )
}
export default CartProvidor;