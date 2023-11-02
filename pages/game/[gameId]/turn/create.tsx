import React, { useState } from 'react'
import { GetServerSideProps } from 'next'
import { Button, MenuItem, Select, TextField } from '@mui/material'
import Turn from '../../../../components/Turn'
import { CardSuits } from '../../../../utils/constants'
import Router from 'next/router'


async function createGame(gameId: number, turnId:number, body): Promise<void> {
  try {
    await fetch(`http://localhost:3000/api/game/${gameId}/turn`, {
    method: 'POST',
    body: JSON.stringify({...body,gameId}),
    })
    await Router.back();
  } catch (error) {
    console.error(error)
  }
}

const TurnCreate: React.FC<any> = props => {
  const [payload, setPayload]=useState({} as any)

  console.log({payload, props})
  return (
   <div>
      Create Turn
      <Turn onChangePayload={setPayload}/>
      <Button onClick={() => createGame(props.gameId,props.turnId,payload)}>
        Add
      </Button>
   </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch(`http://localhost:3000/api/game/${context.params.gameId}`)
  const data = await res.json()
  return { props: { gameData:data, ...context.params } }
}

export default TurnCreate;
