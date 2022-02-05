import LoginForm from "./LoginForm"
import SignupForm from "./SignupForm"
import { Container, Row, Col, Button } from "react-bootstrap";
import {useState} from "react"
import React from "react"; 

function LoginSigupPage ({setCurrentUser}){
  const[showLogin,setShowLogin]=useState(true)
    return(
      <div id="login-cont">
    <Container >
      <Row className="justify-content-md-center">
        <Col xs={6}>
          <h1 id="title"></h1>
          
          {showLogin ? (
            <>
              <LoginForm setCurrentUser={setCurrentUser} />
              <p id="p1">
                Don't have an account? &nbsp;
                <Button  id="b1" variant="outline-dark" onClick={() => setShowLogin(false)}>Sign Up</Button>
              </p>
            </>
          ) : (
            <>
              <SignupForm setCurrentUser={setCurrentUser} />
              <p id="p2">
                Already have an account? &nbsp;
                <Button id="b2" variant="outline-dark" onClick={() => setShowLogin(true)}>
                  Log In
                </Button>
              </p>
            </>
          )}
        </Col>
      </Row>
    </Container>
    </div>
    )
}

export default LoginSigupPage