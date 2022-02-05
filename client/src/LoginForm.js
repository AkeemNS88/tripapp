import {useState} from "react"
import { Form, Button, Alert} from "react-bootstrap";
import React from "react"; 

function LoginForm({setCurrentUser}){
    const[formData,setFormData]=useState({
        email:"",
        password:""
    })

    const [error, setErrors] = useState([]);

    const handleChange = (e) =>{
       setFormData({
           ...formData,
           [e.target.name]: e.target.value
       })
    }

    const handleSubmit =(e)=>{
        e.preventDefault();
        fetch("/login",{
            method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body:JSON.stringify(formData)
        }).then((res)=>{
            if(res.ok){
                res.json().then((data)=>{
                    setCurrentUser(data)
                })
            }else{
                res.json().then((e)=>{
                     console.log(e.errors)
                     setErrors(e.errors);
                })
            }
        })
    }
  
    return(
       <Form id="login" onSubmit={handleSubmit}> 
           <Form.Group >
           <Form.Label>Email:</Form.Label>
           <Form.Control name="email" value={formData.email} onChange={handleChange}/>
           </Form.Group>

           <Form.Group >
           <Form.Label>Password:</Form.Label>
           <Form.Control type="password" name="password" value={formData.password} onChange={handleChange}/>
           </Form.Group>
           {error.map((err) => <Alert key={err} id="alert1">{err}</Alert>)}
           <button id="loginbutton">Submit</button>
       </Form> 
    )
}

export default LoginForm