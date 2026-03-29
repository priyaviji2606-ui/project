import { useState } from "react";


function Task2() {

    // const[image,setImage]=useState();
    // const [link, setLink] = useState();
    // const [size, setSize] = useState();

    //  function QR() {
    //     const response = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${link}`
    //     setImage(response)
    // }

    // return (
    //     <>
    //        <h1>Task 2</h1>
    //        <img src={image} alt=""/>
    //         <label>Link :</label>
    //         <input type="text" onChange={(e)=>setLink(e.target)} />
    //         <label>Size :</label>
    //         <input type="text" onChange={(e)=>setSize(e.target.value)}/>
    //         <button onClick={QR}>Generate</button>
    //     </>
    // );
     const products=["Apple","Grape","Guava"]
     const [cart,setCart]=useState([]);

     function add(item){
        setCart([...cart,item])
     }

     function increment(){
        
     }
    return(
        <>
        <h1>Products</h1>
        {products.map((value,index)=>(
            <li key={index}>{value} <button onClick={()=>add(value)}>Add to cart</button></li>
        ))}

        <h2>Cart</h2>
        {cart.length === 0 ? "Cart is empty" : cart.map((value,index)=>(
            <li key={index}>{value} <button onClick={increment}>+</button> count <button>-</button></li>
        )) }
        </>
    );
}
export default Task2;