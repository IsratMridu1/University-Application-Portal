import React, { useState } from 'react'
import { Redirect } from 'react-router-dom';

function LoginForm(props) {
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [redirect,setredirect] = useState(false)
    const submit=async (e)=>{
        e.preventDefault()
       
        const response = await fetch("https://localhost:5001/api/auth",{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            credentials:"include",
            body:JSON.stringify({
                email,
                password
            })
        });
        const content = await response.json();
    
        localStorage.setItem("JwtBearerToken",content.message)
       
        setredirect(true);
        // props.setName(content.name) 
       
    }
   
    return (
        <div>
             <form onSubmit={submit}>
   
   <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

   <div className="form-floating">
     <input type="email" className="form-control"  placeholder="name@example.com"
     onChange={e=>setemail(e.target.value)}/>
     <label htmlFor="floatingInput">Email address</label>
   </div>
   <div className="form-floating">
     <input type="password" className="form-control" placeholder="Password"
     onChange={e=>setpassword(e.target.value)}/>
     <label htmlFor="floatingPassword">Password</label>
   </div>

  
   <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
   <p className="mt-5 mb-3 text-muted">&copy; 2017–2021</p>
 </form>
 
        </div>
    )
}


export default LoginForm
