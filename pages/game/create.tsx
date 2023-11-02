import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import Router from 'next/router';
import { Autocomplete, TextField } from '@mui/material';
import { top100Films } from './../../utils/data';

const CreateGame: React.FC = () => {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  useEffect(() => {
    // Fetch the list of users from your API when the component mounts.
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/user', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
          const data = await response.json();
          setUsers(data); // Update the state with the fetched users.
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, []);

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const selectedUserIds = selectedUsers.map((ele) => ele.id);
      const playerIds = await addPlayer(selectedUserIds);
      await createGame(playerIds)
      await Router.push('/game/all');
    } catch (err) {
      console.log(err);
    }
  };

  const createGame=async (players)=>{
    try {
      const playerIds= players.map(ele=>ele.id)
      const body = {
        playerIds
        // Include data you want to submit with the game creation.
      };
      const gameData= await fetch('http://localhost:3000/api/game', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      return gameData
    } catch (error) {
      console.error(error);
    }
  }


  const addPlayer = async (userId) => {
    try {
      const body = { userId };
      const response = await fetch(`http://localhost:3000/api/player`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        const data = await response.json();
        return data; // Return the player IDs from the response.
      } else {
        console.error('Failed to add a player.');
        return null;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const handlePlayerSelection = (event,value) => {
    setSelectedUsers(value);
  };

  return (
    <Layout>
      <div>
        <form onSubmit={submitData}>
          <h1>Create Game</h1>
          <Autocomplete
            multiple
            id="multiple-limit-tags"
            options={users} // Use the fetched users as options
            getOptionLabel={(option) => option.name} // Assuming each user object has a 'name' property
            value={selectedUsers}
            onChange={handlePlayerSelection}
            renderInput={(params) => (
              <TextField {...params} label="Select Players" placeholder="Players" />
            )}
            sx={{ width: '500px' }}
          />
          <input type="submit" value="Create"/>
          <a className="back" href="#" onClick={() => Router.push('/')}>
            or Cancel
          </a>
        </form>
      </div>
      <style jsx>{`
        // Your CSS styles here
      `}</style>
    </Layout>
  );
};

export default CreateGame;
