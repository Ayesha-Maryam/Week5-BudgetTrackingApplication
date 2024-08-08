import { useEffect, useState } from "react"
import { format } from 'date-fns';
import { toast, ToastContainer } from "react-toastify";

export default function ShowBudget({entries, deleteEntry, editEntry, setEntries})
{
    const [editIndex,setEditIndex]=useState(); 
    const [updatedEntry, setUpdatedEntry]=useState({});
    const [filterDate, setFilterDate]=useState(new Date());
    const [filteredEntries, setFilteredEntries]=useState([])

    useEffect(()=>
    {
      setFilteredEntries(entries);
    },[])

    const handleDelete=(index)=>
    {
      const filteredEntry=entries.filter((_, i)=>i!==index)
      setEntries(filteredEntry);
      setFilteredEntries(filteredEntry)
      toast.success("Budget Entry Deleted")

    }

    const handleEdit=(index)=>
    {
        setEditIndex(index);
        setUpdatedEntry(entries[index])
    }

    const handleSave=(index)=>
    {
        editEntry(index,updatedEntry);
        toast.success("Budget Entry Edited")
        setEditIndex(null);

    }

    const filterByDate=()=>
      {
        const filtered=entries.filter((en)=>
          {
           return new Date(en.date).toDateString()!==filterDate.toDateString();
          }
        )
        setFilteredEntries(filtered);
      }
  return(
    <>
    <div>
      <h3>Filter By Date</h3>
      <input value={format(filterDate, 'yyyy-MM-dd')} type="date" onChange={e=>setFilterDate(new Date(e.target.value))}/>
      <button onClick={filterByDate}>Filter</button>
      <button onClick={()=>setFilteredEntries(entries)}>Reset Filter</button>
    </div>
    <div>
      {filteredEntries.map((en, index)=>
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
      <ToastContainer/>
    </div>
    </>
  )
}
