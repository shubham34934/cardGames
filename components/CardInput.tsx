import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {CardSuits, CardValues} from "./../utils/constants"

export default function CardInput({onChangeValue,label,value=""}) {
  const [cardSuit, setCardSuit] = React.useState('');
  const [cardValue, setCardValue] = React.useState('');

  const handleChangeSuit = (event: SelectChangeEvent) => {
    setCardSuit(event.target.value);
  };

  const handleChangeValue = (event: SelectChangeEvent) => {
    setCardValue(event.target.value);
  };

  React.useEffect(()=>{
   const arr= value.split("-");
   setCardSuit(arr[0])
   setCardValue(arr[1])
  },[value])

  React.useEffect(()=>{
    if(cardSuit && cardValue){
      onChangeValue(`${cardSuit}-${cardValue}`)
    }
  },[cardSuit,cardValue])

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 80 }}>
        <div>{label}</div>
        <div style={{display:"flex",flexDirection:"row",width:"100px"}}>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              value={cardSuit}
              onChange={handleChangeSuit}
              label="Suit"
              fullWidth
            >
              {CardSuits.map((suit)=>{
                return  <MenuItem value={suit.value}>{suit.name}</MenuItem>
              })}
            </Select>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              value={cardValue}
              onChange={handleChangeValue}
              label="Suit"
              fullWidth
            >
              {CardValues.map((value)=>{
                return  <MenuItem value={value.value}>{value.name}</MenuItem>
              })}
            </Select>
        </div>
      </FormControl>
    </div>
  );
}