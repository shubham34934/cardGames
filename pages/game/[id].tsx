import React, { useEffect, useState } from 'react'
import { GetServerSideProps } from 'next'
import ReactMarkdown from 'react-markdown'
import Layout from '../../components/Layout'
import Router from 'next/router'

async function completeGame(id: number): Promise<void> {
  await fetch(`http://localhost:3000/api/game/${id}`, {
    method: 'PUT',
  })
  await Router.push('/')
}

async function destroyGame(id: number): Promise<void> {
  await fetch(`http://localhost:3000/api/game/${id}`, {
    method: 'DELETE',
  })
  await Router.push('/')
}

const Game: React.FC<any> = props => {
  console.log(props)
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
        {!props.published && (
          <button onClick={() => completeGame(props.id)}>
            Complete Game
          </button>
        )}
        <button onClick={() => destroyGame(props.id)}>
         + Add Turn
        </button>
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
  const res = await fetch(`http://localhost:3000/api/game/${context.params.id}`)
  const data = await res.json()
  return { props: { ...data } }
}

export default Game
