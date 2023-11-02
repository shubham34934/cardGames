import React, { useEffect, useState } from 'react'
import { GetServerSideProps } from 'next'
import ReactMarkdown from 'react-markdown'
import Layout from '../../../components/Layout'
import Router from 'next/router'

async function completeGame(gameId: number): Promise<void> {
  await fetch(`http://localhost:3000/api/game/${gameId}`, {
    method: 'PUT',
  })
  await Router.push('/')
}

async function destroyGame(gameId: number): Promise<void> {
  await fetch(`http://localhost:3000/api/game/${gameId}`, {
    method: 'DELETE',
  })
  await Router.push('/')
}
async function addTurn(gameId: number): Promise<void> {
  await Router.push(`/game/${gameId}/turn/create`)
}

const Game: React.FC<any> = props => {
  return (
    <Layout>
      <div>
        <p>{props.status}</p>
        <p>Players</p>
        <div className='players-container'>
          {props.players.map((ele=>{
            return <div>{ele.user.name}</div>
          }))}
        </div>
        <ReactMarkdown children={props.content} />
        <button onClick={() => addTurn(props.id)}>
         + Add Turn
        </button>
        <div className='footer'>
          <button onClick={() => completeGame(props.id)}>
            Complete Game
          </button>
          <button onClick={() => destroyGame(props.id)}>
            Delete Game
          </button>
        </div>
      </div>
      <style jsx>{`
        .page {
          background: white;
          padding: 2rem;
        }
        .players-container{
          display:flex;
          gap:20px;
        }

        .actions {
          margin-top: 2rem;
        }
        .footer{
          margin-top:30px;
        }

        button {
          background: #ececec;
          border: 0;
          border-radius: 0.125rem;
          padding: 1rem 2rem;
        }

        button + button {
          margin-left: 1rem;
        }
      `}</style>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch(`http://localhost:3000/api/game/${context.params.gameId}`)
  const data = await res.json()
  return { props: { ...data } }
}

export default Game
