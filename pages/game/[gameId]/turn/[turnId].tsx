import React, { useState } from 'react'
import { GetServerSideProps } from 'next'
import { MenuItem, Select, TextField } from '@mui/material'
import Turn from '../../../../components/Turn'
import { CardSuits } from '../../../../utils/constants'


const TurnDetail: React.FC<any> = props => {
  return (
   <div>
      <Turn/>
   </div>
  )
}
export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch(`http://localhost:3000/api/game/${context.params.gameId}/turn/${context.params.turnId}`)
  const data = await res.json()
  return { props: { ...data } }
}


export default TurnDetail
