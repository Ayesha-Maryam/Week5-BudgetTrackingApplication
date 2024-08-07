import React, { useState } from 'react'
export default function AddBudget({addBudget}) {
    const [name, setName]=useState("");
    const [price, setprice]=useState();
    const [date, setDate]=useState(new Date().toISOString().slice(0, 16));
   
    const handleSubmit=(e)=>
    {
        e.preventDefault();
        const newEntry={name, price, date}
        addBudget(newEntry);
        setName('');
        setprice('');
        setDate(new Date().toISOString().slice(0, 16));

    }
  return (
    <div>
      <h3>Add Budget</h3>
      <form onSubmit={handleSubmit}>
        <input placeholder="Name" value={name} onChange={e=>setName(e.target.value)} type="text" />
        <input placeholder="Price" value={price} onChange={e=>setprice(e.target.value)} type="number" />
        <input placeholder="Date" value={date} onChange={e=>setDate(e.target.value)} type="date" />
        <button type="submit">Add Budget</button>
        
      </form>
    </div>
  )
}
