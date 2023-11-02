import React, { useState } from 'react'
import { MenuItem, Select, TextField } from '@mui/material'
import { CardSuits } from '../utils/constants'
import CardInput from './CardInput'


const Turn: React.FC<any> = ({onChangePayload}) => {
  const [payload, setPayload]=useState({} as any)

  const onChange=(key, value)=>{
    const payloadCopy= {...payload}
    payloadCopy[key]=value;
    setPayload(payloadCopy);
    onChangePayload(payloadCopy);
  }
  return (
   <div>
    <TextField type='number' name='bidAmount' label='bid amount' placeholder='Enter Bid Amount' onChange={(e)=>{
        onChange("bidAmount",e.target.value);
    }}>
    </TextField>
    <Select
        labelId="demo-simple-select-autowidth-label"
        id="demo-simple-select-autowidth"
        value={payload.trump}
        onChange={(e)=>{
            onChange("trump",e.target.value);
        }}
        label="Trump"
    >
        {CardSuits.map((suit)=>{
          return  <MenuItem value={suit.value}>{suit.name}</MenuItem>
        })}
    </Select>

    <CardInput value={payload.firstAsk} label={"First Ask"} onChangeValue={(value)=>{
      onChange("firstAsk",value);
    }}/>
    <CardInput value={payload.secondAsk}  label={"Second Ask"} onChangeValue={(value)=>{
      onChange("secondAsk",value);
    }}/>
   </div>
  )
}

export default Turn
