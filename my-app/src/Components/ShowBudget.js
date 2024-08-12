import { useEffect, useState } from "react";
import { format } from "date-fns";
import AddBudget from "./BudgetForm";
import "./ShowBudget.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";

export default function ShowBudget({addBudget,entries,
  deleteEntry,
  editEntry,
  setEntries,
  users,limit}) {
  const [editIndex, setEditIndex] = useState();
  const [updatedEntry, setUpdatedEntry] = useState({});
  const [filterDate, setFilterDate] = useState(new Date());
  const [filteredEntries, setFilteredEntries] = useState([]);
  const [actionIndex, setActionIndex] = useState(null);
  const [modalOpen,setModal]=useState(false)

  useEffect(() => {
    axios
      .get(`http://localhost:8080/budgetUser/${users._id}`, {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      })
      .then((response) => {
        console.log({ reponse: response.data });
        setFilteredEntries(response.data.entries);
      })
      .catch((error) => {
        console.error("Error fetching data", error);
      });
  }, []);

  useEffect(() => {
    console.log('Entries changed.', {entries});
  }, [entries]);


  const handleDelete = async (index) => {
    const newEntry = filteredEntries.filter((_, i) => i !== index);
    setFilteredEntries(newEntry);
    setEntries(newEntry)
    deleteEntry(index);
    // console.log({response});
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setUpdatedEntry(entries[index]);
  };

  const handleSave = (index) => {
    editEntry(index, updatedEntry);
    setFilteredEntries((prevEntries) => {
      const newEntries = [...prevEntries];
      newEntries[editIndex] = updatedEntry;
      return newEntries;
    });
    toast.success("Budget Entry Edited");
    setEditIndex(null);
  };



  const filterByDate = (newDate) => {
    const filtered = entries.filter((en) => {
      return new Date(en.date).toDateString() === newDate.toDateString();
    });
    setFilteredEntries(filtered);
  };
  return (
    <div className="container-1">
      <div className="container2">
        <h3>Filter By Date</h3>
        <div className="filter">
          <input
            value={format(filterDate, "yyyy-MM-dd")}
            type="date"
            onChange={(e) => setFilterDate(new Date(e.target.value))}
          />
          <button
            className="filter-btn"
            onClick={() => filterByDate(filterDate)}
          >
            Filter Records
          </button>
          <button
            className="filter-btn"
            onClick={() => setFilteredEntries(entries)}
          >
            Reset Filter
          </button>

          
            <button className="add-btn" onClick={()=>setModal(true)}>Add Budget</button>
           
        </div>
        <table className="budget-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredEntries.map((en, index) => (
              <tr key={index}>
                <td>
                  {editIndex === index ? (
                    <input
                      value={updatedEntry.name}
                      type="text"
                      onChange={(e) =>
                        setUpdatedEntry({
                          ...updatedEntry,
                          name: e.target.value,
                        })
                      }
                    />
                  ) : (
                    en.name
                  )}
                </td>
                <td>
                  {editIndex === index ? (
                    <input
                      value={updatedEntry.price}
                      type="number"
                      onChange={(e) =>
                        setUpdatedEntry({
                          ...updatedEntry,
                          price: e.target.value,
                        })
                      }
                    />
                  ) : (
                    en.price
                  )}
                </td>
                <td>
                  {editIndex === index ? (
                    <input
                      value={updatedEntry.date}
                      type="date"
                      onChange={(e) =>
                        setUpdatedEntry({
                          ...updatedEntry,
                          date: e.target.value,
                        })
                      }
                    />
                  ) : (
                    format(new Date(en.date), "yyyy-MM-dd")
                  )}
                </td>
                <td>
                  {editIndex === index ? (
                    <button onClick={() => handleSave(index)}>Save</button>
                  ) : (
                    <>
                      <div className="action-menu">
                        <button
                          className="action-dots"
                          onClick={() =>
                            setActionIndex(actionIndex === index ? null : index)
                          }
                        >
                          ⋮
                        </button>
                        {actionIndex === index && (
                          <div className="dropdown-menu">
                            <button onClick={() => handleEdit(index)}>
                              Edit
                            </button>
                            <button onClick={() => handleDelete(index)}>
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {modalOpen && <AddBudget entries={entries} addBudget={addBudget} limit={limit} modal={modalOpen} setModal={setModal}/>}
          
        <ToastContainer />
      </div>
    </div>
  );
}
