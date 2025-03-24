import React, { useState, useEffect } from 'react';
import './App.css';

interface User {
  name: string;
  id: number;
}

function App() {

  const [users, setUsers] = useState<User[]>([]);
  const [sortField, setSortField] = useState('') // User input for sort field

  const [sortTrigger, setSortTrigger] = useState(false); // will be the trigger to execute sorting

  useEffect(() => {
    const fetchData = async () => { // fetches user objects from api
      try {
        const response = await fetch(sortField ? `http://localhost:3001/api/users?sort=${sortField}` : 'http://localhost:3001/api/users');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setUsers(data); // stores user objects array

      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchData(); // updates data and handles potential errors

  }, [sortTrigger]); // sortTrigger as the only dependency

  const handleSortSubmit = () => {
    if (!sortField) {
      alert('Please enter a sort field.');
    }
    setSortTrigger((prevTrigger) => !prevTrigger); // Toggle for sortTrigger
  };

  return (
    <div className="App">
      <h1>User List</h1>
      <div>
        <input
          type="text"
          value={sortField}
          onChange={(e) => setSortField(e.target.value.toLowerCase())}
          placeholder="Enter a sort field" // Add this line
        />
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.name} (ID: {user.id})
            </li>
          ))}
        </ul>
        <button onClick={handleSortSubmit}>Sort</button>
      </div>

    </div>
  );
}

export default App;


