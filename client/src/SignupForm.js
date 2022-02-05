import {useState} from "react"
import {  Form, Alert } from "react-bootstrap";
import React from "react"; 

function SignupForm({setCurrentUser}){
    const[formData,setFormData]=useState({
        full_name: "",
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
        console.log("Submit")
        fetch("/users",{
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
                res.json().then((error)=>{
                    
                    setErrors(error.errors);
                })
            }
        })
    }
  
    return(
       <Form id="signin" onSubmit={handleSubmit}> 
            <Form.Group >
            <Form.Label>Username:</Form.Label>
           <Form.Control name="full_name" value={formData.full_name} onChange={handleChange}/>
           </Form.Group >

           <Form.Group >
           <Form.Label>Email:</Form.Label>
           <Form.Control name="email" value={formData.email} onChange={handleChange}/>
           </Form.Group >

           <Form.Group >
           <Form.Label>Password:</Form.Label>
           <Form.Control type="password" name="password" value={formData.password} onChange={handleChange}/>
           </Form.Group >
           {error.map((err) => <Alert key={err} id="alert2">{err}</Alert>)}
           <button id="sigupbutton">Submit</button>
       </Form> 
    )
}

export default SignupForm