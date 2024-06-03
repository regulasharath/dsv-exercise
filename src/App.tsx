import './App.css'
import {useState} from 'react'
import CounterPage from './pages/CounterPage'
import UsersPage from './pages/UsersPage'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function App() { 

  const[page,setPage]=useState('users')
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setPage((event.target as HTMLInputElement).value);
  };
  
  return (
    <>
     <div>

       <RadioGroup
         row
         aria-labelledby="demo-row-radio-buttons-group-label"
         name="row-radio-buttons-group"
         value={page}
         onChange={handleChange}
         style={{margin: '0 auto', width: "18%" }} 
         
       >
         <FormControlLabel value="users" control={<Radio />} label="Users" />
         <FormControlLabel value="counter" control={<Radio />} label="Counter" />
       </RadioGroup>
         </div>
       {page==='users' && <h1 style={{ textAlign: 'center' }}>Users</h1>}
       {page==='counter' &&<h1 style={{ textAlign: 'center' }}>Counter</h1>}
 
      {page==='users' && <UsersPage/>}
      {page==='counter' && <CounterPage/>}
    </>
  )
}