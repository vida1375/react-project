import React, { useEffect, useState, useContext }from "react";
import { useParams } from "react-router-dom";
import {Card, Container, Row, Col, Button} from 'react-bootstrap';
import { CartContext } from "../components/cartContext";
import axios from "axios";
import Swal from 'sweetalert2';
const Product =({addToCart}) =>{
    const {productId} = useParams();
    const [loadingData, setLoadingData] = useState(false);
    const [data, setData] = useState({});
    const cart = useContext(CartContext);
    // const productQuanity = cart.getProductQuanity(data._id);



  const url = `https://kzico.runflare.run/product/${productId}`;

  useEffect(() => {
    setLoadingData(true)
    axios.get(url).then((r) => {   
      setData(r.data);
      setLoadingData(false)
        })
    // fetch(url)
    //   .then((r) => r.json())
    //   .then((r) => {
    //     // save data from fetch request to state
    //     setData(r);
    //   });
  }, [url]);
 
  const handleToCart=()=>{
    const productQuanity = cart.getProductQuanity(data._id);
    if (productQuanity < data.countInStock  ) {
        cart.addOneToCart(data._id)
        addToCart(data) ;
        Swal.fire("Add to Cart")
    }else{
      Swal.fire("Error! The product is not enough")
    }
  }
    return(
        <Container>
            {
             !loadingData ?(
                <Card key={data._id} style={{marginTop:"5rem"}}>
                <Row>
                    <Col style={{display:"inline-flex", justifyContent:"center"}}>
                    <Card.Img variant="top" src={data.image}  style={{margin:"1rem 2rem", width:"15rem", height:"15rem"}}/>
                    </Col>
                    <Col style={{marginTop:"1rem", marginLeft:"3rem"}}>
                    <Card.Title>Name: {data.name} </Card.Title>
                       <Card.Text>Brand: {data.brand} </Card.Text>
                       <Card.Text>Color: {data.color} </Card.Text>
                       <Card.Text>Category: {data.category} </Card.Text>
                       { data.countInStock>0 ? <Card.Text> Number: {data.countInStock}</Card.Text>:<Card.Text> not Found</Card.Text>}
                       <Card.Text>Price{data.price}$ </Card.Text>
                       <Card.Text>Rating:{data.rating} </Card.Text>
                       <Card.Text>Description: {data.description} </Card.Text>
                    </Col>
                </Row>
                <Row style={{direction:"rtl"}}>
                {data.countInStock>0 ? <Button onClick={handleToCart} style={{width:"10rem" , margin:"2rem 2rem"}} >Add to cart</Button>:""}
                </Row>
            </Card>
              ):(
                <div style={{textAlign:"center", marginTop:"5rem"}}>loading...</div>
            )
            }
        </Container>
        
    )
}
export default Product;