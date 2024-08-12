import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Modal.css'



export default function AddBudget({addBudget, limit, entries, modal, setModal}) {
    const [name, setName]=useState("");
    const [price, setprice]=useState("");
    const [date, setDate]=useState(new Date().toISOString().slice(0, 10));
   
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
        setDate(new Date().toISOString().slice(0, 10));
        }
        

    }
    const totalSpend=entries.reduce((a,b)=>a+parseFloat(b.price),0)
  return (
   
    <div className="modal-overlay">
            <div className="modal-content">
                <button className="modal-close" onClick={()=>setModal(false)}>&times;</button>
                <h3>Add Budget</h3>
                <form className="add-form" onSubmit={handleSubmit}>
                    <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} type="text" /><br/>
                    <input placeholder="Price"  value={price} onChange={e => setprice(e.target.value)} type="number" /><br/>
                    <input  placeholder="Date"  value={date} onChange={e => setDate(e.target.value)} type="date" /><br/>
                    <button className='submit-btn' type="submit">Submit</button>
                </form>
                <ToastContainer />
            </div>
        </div>
  )
}
