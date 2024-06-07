import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../redux/action";
import {Card, Container, Row, Col} from 'react-bootstrap';
import { Link } from "react-router-dom";

const Home = () =>{
    const [loadingData, setLoadingData] = useState(false);
    const { data, loading, error} = useSelector((state) => state.products);
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getProducts());
    },[dispatch]);
    useEffect(() => {
        setLoadingData(true);
        
        setTimeout(() => {
          if (data) {
            setLoadingData(false);
          }
        }, 2000);
      }, []);
    return(
        <Container style={{marginTop:"2rem"}}>
           {
            !loadingData ?(
                <Row>
                {data.map((item )=>(
                    <Card key={item._id}  as={Link} to={'/product/'+item._id.toString()} style={{width:"15rem" , textAlign:"center", marginRight:"2rem", marginTop:"3rem", textDecoration:"none",color:"black"}} > 
                        <Row style={{justifyContent:"center"}}>
                    <Card.Img variant="top" src={item.image}  style={{width:"10rem", height:"10rem" , margin:"1rem auto"}}/>
                    </Row>
                    <Card.Body>
                    <Row>
                      <Card.Title>{item.name} </Card.Title>
                     </Row>
                     <Row style={{paddingTop:"2rem"}}>
                      { item.countInStock>0 ? <Card.Text> {item.countInStock}</Card.Text>:<Card.Text> Does not exist</Card.Text>}
                      </Row>
                      <Row style={{paddingTop:"2rem"}}>
                      <Card.Body style={{display:"flex"}}>
                            <Col>
                      <Card.Text>{item.price}$ </Card.Text>
                      </Col>
                      <Col>
                      <Card.Text>{item.rating} </Card.Text>
                      </Col>
                      
                      </Card.Body></Row>
                    </Card.Body>
                  </Card>
                ))}
                </Row>
            ):(
                <div style={{textAlign:"center", marginTop:"5rem"}}>loading...</div>
            )
           }
        </Container>
    )


}
export default Home;