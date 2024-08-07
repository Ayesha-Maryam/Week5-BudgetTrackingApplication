import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import SignUp, { SignIn } from "./Components/Authentication";
import AddBudget from "./Components/BudgetForm";
import DatePicker from "./Components/DatePicker";
import ShowBudget from "./Components/ShowBudget";

function App() {
  const [users, setUsers] = useState(null);
  const [entries, setEntries] = useState([]);
  const [filterDate, setFilterDate]=useState(new Date());
  const navigate = useNavigate();
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("currentUser"));
    const allUsers = JSON.parse(localStorage.getItem("users")) || [];
    if (savedUser) {
      setUsers(savedUser);
      const currentUserData = allUsers.find((u) => u.email === savedUser.email);
      setEntries(currentUserData.entries || []);
    }
  }, []);



  useEffect(() => {
    if (users) {
      const user = JSON.parse(localStorage.getItem("users")) || [];
      const updatedUser = user.map((u) => (u.email === users.email?{...u,entries}:u));
      localStorage.setItem('users', JSON.stringify(updatedUser));
    }
  }, [entries, users]);




  const handleLogin = (userData) => {
    localStorage.setItem("currentUser", JSON.stringify(userData));
    setUsers(userData);
    navigate("/budget");
  };


  const logOut = () => {
    localStorage.removeItem("currentUser")
    setUsers(null);
    setEntries([]);
    navigate('/')
  };


  const addBudget=(entry)=>
  {
    setEntries([...entries,entry])
  }


  const handleDelete=(index)=>
  {
    const filteredEntry=entries.filter((_, i)=>i!==index)
    setEntries(filteredEntry);
  }

  const handleEdit=(index,updatedEntry)=>
  {
    const editedEntry=[...entries];
    editedEntry[index]=updatedEntry;
    setEntries(editedEntry)

  }
  return (
    <>
      <Routes>
        <Route path="/" element={users? <AddBudget addBudget={addBudget}/> :<SignUp login={handleLogin} />} />
        <Route path="/signin" element={<SignIn login={handleLogin} />} />
        <Route path="/logout" element={logOut} />
        <Route path="/budget" element={users? (
          <>
          <DatePicker date={filterDate} onDateChange={setFilterDate}/> 
          <ShowBudget entries={entries} deleteEntry={handleDelete
            // entries.filter(e=>new Date(e.date).toDateString()===filterDate.toDateString())
          } editEntry={handleEdit}/>
          </>):
      (<SignIn login={handleLogin} />)
      } />
      </Routes>
    </>
  );
}

export default App;
