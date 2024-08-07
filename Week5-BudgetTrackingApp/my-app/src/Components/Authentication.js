import React, { useState } from 'react'
import { Link } from 'react-router-dom';

export default function SignUp({login}) {
    const [firstName, setFirstName]=useState("");
    const [lastName, setLastName]=useState("");
    const [email, setEmail]=useState("");
    const [password, setPassword]=useState("");
    const [confirmPassword, setConfirmPassword]=useState("");
    const [budgetLimit, setBudgetLimit]=useState("");
    const handleSubmit=(e)=>
    {
        e.preventDefault();
        const users=JSON.parse(localStorage.getItem('users'))||[]
        const existingUser=users.find((u)=>u.email===email)
        if(existingUser)
        {
            alert("User already exist. Please Sign in!")
            return;
        }
        const newUser={firstName,lastName,email,password,confirmPassword,budgetLimit, entries:[]}
        users.push(newUser)
        localStorage.setItem("users",JSON.stringify(users))
        login(newUser)
        // setFirstName('');
        // setLastName('');
        // setEmail('');
        // setPassword('');
        // setConfirmPassword('');
        // setBudgetLimit('');
        
        
    }
  return (
    <div>
        <h3>Sign up</h3>
        <Link to="/signin">Already have an account?</Link>
        <form onSubmit={handleSubmit}>
            <input value={firstName} placeholder="First Name" onChange={(e)=>setFirstName(e.target.value)} />
            <input value={lastName} placeholder="Last Name" onChange={(e)=>setLastName(e.target.value)} />
            <input value={email} type="email" placeholder="Email" onChange={(e)=>setEmail(e.target.value)} />
            <input value={password} type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />
            <input value={confirmPassword} type="password" placeholder="Confirm Password" onChange={(e)=>setConfirmPassword(e.target.value)} />
            <input value={budgetLimit} type="number" placeholder="Budget Limit" onChange={(e)=>setBudgetLimit(e.target.value)} />
            <button type="submit">Submit</button>
        </form>
      
    </div>
  )
}

export function SignIn({login})
{
    const [email,setEmail]=useState("");
    const [password, setPassword]=useState("");
    const handleSubmit=(e)=>
    {
        e.preventDefault();
        const users=JSON.parse(localStorage.getItem('users'))||[]
        const user=users.find(u=>u.email===email && u.password===password)
        if(user)
        {
            login(user)
        }
        else{
            alert("Invalid Email or Password")
        }

    }
    return(
        <>
        <h3>Sign In</h3>
        
        <form onSubmit={handleSubmit}>
            <input placeholder="Enter Email" value={email} type="email" onChange={(e)=>setEmail(e.target.value)} required />
            <input placeholder="Enter Password" value={password} type="password" onChange={(e)=>setPassword(e.target.value)} required/>
            <button type="submit">Submit</button>
        </form>
        </>
    )
}