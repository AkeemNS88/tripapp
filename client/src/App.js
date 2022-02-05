import React from "react"; 
import './App.css';

// import LoginForm from './LoginForm';
// import SignupForm from './SignupForm';
import { useEffect, useState } from 'react';
import LoginSigupPage from "./LoginSigupPage"
import SideNav from './SideNav';

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          setCurrentUser(user);
          
        });
      }
      else {
        setCurrentUser(null)
      }
    });
  }, []);

  if(!currentUser) return <LoginSigupPage setCurrentUser={setCurrentUser}/>

return (
  <div className="main">
    <SideNav setCurrentUser={setCurrentUser} currentUser={currentUser}/>
  </div>
)
}

export default App;
