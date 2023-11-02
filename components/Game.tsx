import React, { useEffect, useState } from 'react'
import Router from 'next/router'
import DeleteIcon from '@mui/icons-material/Delete';

export type GameProps = {
  id: number;
  playerIds: String[];
  status:String;
  players:any[];
}

const Game: React.FC<{game: GameProps}> = ({ game }) => {
  const onDeleteGame=async (e)=>{
    e.stopPropagation()
    try {
      const gameData= await fetch(`http://localhost:3000/api/game/${game.id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });
      if (gameData.ok) {
        Router.reload();
      } else {
        console.error('Failed to delete the game.');
      }

    } catch (error) {
      console.error(error);
    }
  }
  
  return (
    <div className='card-container' onClick={() => Router.push('/game/[id]', `/game/${game.id}`)}>
      <div className='game-header'>
        <p>{game.status}</p>
        <DeleteIcon onClick={(e)=>onDeleteGame(e)}/>
      </div>
        <div className='players'>
          <h3>Players</h3>
          {game.players.map((player, index)=>{
          return <p key={player.id}>{index+1}. {player.user?.name}</p> 
          })}
        </div>
        <h3>Game ID: {game.id}</h3>
        <style jsx>{`
          .card-container {
            color: inherit;
            padding: 2rem;
            cursor: pointer;
          }
          .game-header {
            display:flex;
            flex-direction:row;
            justify-content:space-between;
          }
        `}</style>
    </div>
  )
}

export default Game;