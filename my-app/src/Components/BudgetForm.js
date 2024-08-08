import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function AddBudget({addBudget, limit, entries}) {
    const [name, setName]=useState("");
    const [price, setprice]=useState("");
    const [date, setDate]=useState(new Date().toISOString().slice(0, 16));
   
    const handleSubmit=(e)=>
    {
        e.preventDefault();
        if(totalSpend>limit)
        {
          toast.warn("You have exceeded your budget limit!")

        }
        else{
        const newEntry={name, price, date}
        addBudget(newEntry);
        toast.success("Budget Created")
        setName('');
        setprice('');
        setDate(new Date().toISOString().slice(0, 16));
        }
        

    }
    const totalSpend=entries.reduce((a,b)=>a+parseFloat(b.price),0)
  return (
    <div>
      <h3>Add Budget</h3>
      <form onSubmit={handleSubmit}>
        <input placeholder="Name" value={name} onChange={e=>setName(e.target.value)} type="text" />
        <input placeholder="Price" value={price} onChange={e=>setprice(e.target.value)} type="number" />
        <input placeholder="Date" value={date} onChange={e=>setDate(e.target.value)} type="date" />
        <button type="submit">Add Budget</button>
        
      </form>
      <ToastContainer/>
    </div>
  )
}
