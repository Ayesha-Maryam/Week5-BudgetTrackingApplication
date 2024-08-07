import { useState } from "react"

export default function ShowBudget({entries, deleteEntry, editEntry})
{
    const [editIndex,setEditIndex]=useState(); 
    const [updatedEntry, setUpdatedEntry]=useState({})

    const handleDelete=(index)=>
    {
        deleteEntry(index)

    }

    const handleEdit=(index)=>
    {
        setEditIndex(index);
        setUpdatedEntry(entries[index])
    }

    const handleSave=(index)=>
    {
        editEntry(index,updatedEntry);
        setEditIndex(null);
    }
  return(
    <>
    <div>
      {entries.map((en, index)=>
      (
        <div key={index}>
            {editIndex===index ? (
                <div>
                    <input value={updatedEntry.name} type="text" onChange={e=>setUpdatedEntry({...updatedEntry, name:e.target.value})}/>
                    <input value={updatedEntry.price} type="number" onChange={e=>setUpdatedEntry({...updatedEntry, price:e.target.value})}/>
                    <input value={updatedEntry.date} type="date" onChange={e=>setUpdatedEntry({...updatedEntry, date:e.target.value})}/>
                    <button onClick={()=>handleSave(index)}>Save</button>
                    </div>
            ):(
            <div>
                <p>Name:{en.name}</p>
            <p>Price:{en.price}</p>
            <p>Date:{en.date}</p>
            <button onClick={()=>handleEdit(index)}>Edit</button>
            <button onClick={()=>handleDelete(index)}>Delete</button>
                </div>
                )
            }
            
        </div>
      ))}
    </div>
    </>
  )
}
