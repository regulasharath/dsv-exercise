import { useAppSelector, useAppDispatch } from '../redux/hooks/index'
import { increment, decrement, incrementByCount, resetCount, deacrementByCount } from '../redux/slices/counter'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { NumberInput } from '../components/counter/index';
import { RootState } from './../redux/store';
import React from 'react';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function CounterPage() {
  const [value, setValue] = React.useState<number | null>(null);
  const count = useAppSelector((state: RootState) => state.counter)
  function getRandomnum() {
    const minCeiled = Math.ceil(1);
    const maxFloored = Math.floor(10);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled)
  }
  function NextOdd(count: number) {
    console.log(count)
    if (count % 2 !== 0) {
      return 2
    }
    else {
      return 1
    }
  }
  const dispatch = useAppDispatch()
  function decrementHandler() {
    if (value !== null && count > value)
      dispatch(deacrementByCount(value))
    else
      alert('Count should not be less than zero,change the Input number')
  }
  function decrementHandler1() {
    if (count >= 0)
      dispatch(decrement())
    else
      alert('Count should not be less than zero')
  }
  return (<>
    <h2 style={{ textAlign: 'center' }}>Count is {count}</h2>
     <Box sx={{ width: '100%', border: '2px solid grey' }}  alignItems="center"   px={4} py={2}>
       

        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} 
          alignItems="center">
        <Grid item xs={6}>
          <NumberInput
            aria-label="Demo number input"
            placeholder="Type a number…"
            value={value}
            onChange={(event, val) => setValue(val)}
          />
        </Grid>
        <Grid item xs={6}>
          <Button variant="contained" onClick={decrementHandler}>Deacrement with a Input Number</Button>
        </Grid>
        <Grid item xs={6}>
          <Button variant="contained" onClick={() => dispatch(increment())}>Increment Count</Button>
        </Grid>
        <Grid item xs={6}>
          <Button variant="contained" onClick={decrementHandler1}>Decrement Count</Button>
        </Grid>
      
        <Grid item xs={6}>
          <Button variant="contained" onClick={() => dispatch(incrementByCount(getRandomnum()))}>Increment with a Random Number</Button>

        </Grid>

        <Grid item xs={6}>
          <Button variant="contained" onClick={() => dispatch(incrementByCount(NextOdd(count)))}>Next Odd</Button>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" onClick={() => dispatch(resetCount())}>Reset Count</Button>
        </Grid>
      </Grid>
    </Box>
    </>);
}
