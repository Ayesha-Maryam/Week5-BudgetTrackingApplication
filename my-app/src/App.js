import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import SignUp, { SignIn } from "./Components/Authentication";
import AddBudget from "./Components/BudgetForm";
import ShowBudget from "./Components/ShowBudget";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

function App() {
  const [users, setUsers] = useState(null);
  const [entries, setEntries] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUser() {
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));
      if (currentUser) {
        try {
          const response = await axios.get(
            `http://localhost:8080/budgetUser/${currentUser._id}`,
            {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json",
            }
          );
          if (!response) {
            throw new Error("Cannot fetch Current Data");
          }
          setEntries(response.data.entries || []);
          setUsers(currentUser);
        } catch (error) {
          console.log(error);
        }
      }
    }
    fetchUser();
  }, []);

  const handleLogin = async (userData) => {
    console.log("User Data:", userData);
    localStorage.setItem("currentUser", JSON.stringify(userData));
    setUsers(userData);
    try {
      const response = await axios.get(
        `http://localhost:8080/budgetUser/${userData._id}`
      );
      if (!response) {
        throw new Error("Cannot fetch Data");
      }
      setEntries(response.entries || []);
    } catch (error) {
      console.log(error);
    }

    navigate("/budget");
  };

  const logOut = () => {
    localStorage.removeItem("currentUser");
    setUsers(null);
    setEntries([]);
    navigate("/");
  };

  const addBudget = async (entry) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/budgetUser/${users._id}`,
        {
          ...users,
          entries: [...entries, entry],
        }
      );
      if (!response) {
        throw new Error("Cannot fetch Data");
      }
      setEntries(response.data.entries || []);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (index) => {
    //budgetId
    const filteredEntry = entries.filter((_, i) => /* _.id */ i !== index);
    try {
      const response = await axios.put(
        `http://localhost:8080/budgetUser/${users._id}`,
        {
          ...users,
          entries: filteredEntry,
        }
      );
      setEntries(response.data.entries || []);
      toast.success("Entry Deleted");
      if (!response) {
        //// ?budgetId=${budgetId}
        alert("No Response");
        throw new Error("Cannot fetch Data");
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async (index, updatedEntry) => {
    const editedEntry = [...entries];
    editedEntry[index] = updatedEntry;
    try {
      const response = await axios.put(
        `http://localhost:8080/budgetUser/${users._id}`,
        {
          ...users,
          entries: editedEntry,
        }
      );
      if (!response) {
        throw new Error("Cannot Fetch Data");
      }
      setEntries([...response.data.entries] || []);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Routes>
      <Route
          path="/budget"
          element={
            users ? (
              <>
                <ShowBudget
                  addBudget={addBudget}
                  users={users}
                  limit={users.budgetLimit}
                  entries={entries}
                  setEntries={setEntries}
                  deleteEntry={handleDelete}
                  editEntry={handleEdit}
                />
              </>
            ) : (
              <SignIn login={handleLogin} />
            )
          }
        />
        <Route path="/signin" element={<SignIn login={handleLogin} />} />
        <Route path="/signup" element={<SignUp login={handleLogin} />} />
        <Route path="/logout" element={logOut} />
        
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
