import React from 'react';
import { useState, useEffect } from 'react';
import Usercard from '../components/users/Usercard';
import users from '../data';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/joy/Card';
import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import CardContent from '@mui/joy/CardContent';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import BookmarkAdd from '@mui/icons-material/BookmarkAddOutlined';
import { filledInputClasses } from '@mui/material';
import { makeStyles } from '@mui/styles';
import TextField from '@mui/material/TextField';

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    padding: "0 20px"
  }
}));



export default function UsersPage() {
  interface User {
    username: string;
    age: number;
    company: {
      name: string;
      catchPhrase: string;
      bs: string;
    };
    address: {
      suite: string;
      street: string;
      city: string;
      zipcode: string;
    };
  }
  const classes = useStyles();
  const [userslist, setUserslist] = useState([]);
  const [removedusers, setRemovedusers] = useState([]);
  const [checked, setChecked] = useState(false);
  const [search, setSearch] = useState(false);
  const [searchlist, setSearchlist] = useState([]);
  const [removedsearchlist, setRemovedsearchlist] = useState([]);
  const [searchval, setSearchval] = useState('');

  useEffect(() => {
    users.sort((a, b) => a.age - b.age)
    users.map((user) => {
      return { ...user, UniqueId: createID() }
    })
    setUserslist(users)
  }, [])

  function createID() {
    const characters = ['A', 'B', 'C', 'D', 'E', 'F', 1, 2, 3, 4, 5, 6];
    var ID = '';
    for (let i = 0; i < 6; i++) {
      ID = ID + characters[Math.floor(Math.random() * 11)];
    }
    return ID
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      usersgreater18(userslist)
      setChecked(true)
    }
    else {
      setUserslist(users)
      setChecked(false);
    }
  };


  function usersgreater18(users: User[]) {
    setUserslist(users.filter((user) => {
      return user.age >= 18;
    }));
  }

  function handleRemove(id) {
    setUserslist((prev) => {
      return prev.filter((user) => {
        return user.id !== id;
      })
    })
    setRemovedusers((prev) => {
      return prev.concat(users.filter((user) => {
        return user.id === id;
      }))
    })
    setRemovedsearchlist((prev) => {
      return prev.concat(users.filter((user) => {
        return user.id === id;
      }))
    })

  }
  function handleRestore(id) {
    setRemovedusers((prev) => {
      return prev.filter((user) => {
        return user.id !== id;
      })
    })
    setRemovedsearchlist((prev) => {
      return prev.filter((user) => {
        return user.id !== id;
      })
    })

    setUserslist((prev) => {
      return prev.concat(users.filter((user) => {
        return user.id === id;
      }))

    })
  }


  useEffect(() => {
    if (searchval == '') { setSearch(false) }
    else { setSearch(true) }
    setSearchlist(userslist.filter((user) => {
      return user.username.includes(searchval, 0)
    }))
    setRemovedsearchlist(removedusers.filter((user) => {
      return user.username.includes(searchval, 0)
    }))

  }, [searchval])

  function handlesearchChange(e) {
    setSearchval(e.target.value)

  }

  if (!search) {
    return (
      <>

        <div style={{ textAlign: 'center' }}>
          {checked && <span >Showing 18+ age users</span>}
          {!checked && <span >Showing all users</span>}<div>
            <Checkbox
              checked={checked}
              onChange={handleChange}
              inputProps={{ 'aria-label': 'controlled' }}
            />
            {!checked && <span >Check to see 18+ users Only</span>}
            {checked && <span >Uncheck to show all users</span>}
          </div>
          <TextField id="outlined-basic" label="Search" variant="outlined" value={searchval} onChange={(e) => { handlesearchChange(e) }} />
        </div>
        <ul>
          <Grid
            container
            spacing={4}
            className={classes.gridContainer}
            justify="center"
          >
            {userslist.map((user, index) =>
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card >
                  <div>
                    <Typography level="title-lg"> {user.username}</Typography>
                    <Typography level="body-sm">Age: {user.age}</Typography>
                    <div style={{ textAlign: 'right' }}>{user.UniqueId}</div>
                  </div>

                  <div>
                    <Typography level="body-xs">Company</Typography>
                    <Typography fontSize="sm" fontWeight="lg">
                      {user.company.name}
                    </Typography>
                    <Typography fontSize="sm" fontWeight="lg">
                      {user.company.catchPhrase}
                    </Typography>
                    <Typography fontSize="sm" fontWeight="lg">
                      {user.company.bs}
                    </Typography>
                  </div>
                  <CardContent orientation="horizontal">

                    <div>
                      <Typography level="body-xs">Address</Typography>
                      <Typography fontSize="sm" fontWeight="lg">
                        {user.address.suite}, {user.address.street}
                      </Typography>
                      <Typography fontSize="sm" fontWeight="lg">
                        {user.address.city}, {user.address.zipcode}
                      </Typography>
                    </div>
                    <Button
                      variant="solid"
                      size="md"
                      color="danger"
                      aria-label="Explore Bahamas Islands"
                      sx={{ ml: 'auto', alignSelf: 'center', fontWeight: 600 }}
                      onClick={() => { handleRemove(user.id) }}
                    >
                      Remove
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            )}
          </Grid>
        </ul>
      </>)
  }

  if (search) {
    return (<>

      <div style={{ textAlign: 'center' }}>
        {checked && <span >Showing 18+ age users</span>}
        {!checked && <span >Showing all users</span>}<div>
          <Checkbox
            checked={checked}
            onChange={handleChange}
            inputProps={{ 'aria-label': 'controlled' }}
          />
          {!checked && <span >Check to see 18+ users Only</span>}
          {checked && <span >Uncheck to show all users</span>}
        </div>
        <TextField id="outlined-basic" label="Search" variant="outlined" value={searchval} onChange={(e) => { handlesearchChange(e) }} />
      </div>
      <ul>
        <Grid
          container
          spacing={4}
          className={classes.gridContainer}
          justify="center"
        >
          {searchlist.map((user, index) =>
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card >
                <div>
                  <Typography level="title-lg"> {user.username}</Typography>
                  <Typography level="body-sm">Age: {user.age}</Typography>
                  <div style={{ textAlign: 'right' }}>{user.UniqueId}</div>
                </div>

                <div>
                  <Typography level="body-xs">Company</Typography>
                  <Typography fontSize="sm" fontWeight="lg">
                    {user.company.name}
                  </Typography>
                  <Typography fontSize="sm" fontWeight="lg">
                    {user.company.catchPhrase}
                  </Typography>
                  <Typography fontSize="sm" fontWeight="lg">
                    {user.company.bs}
                  </Typography>
                </div>
                <CardContent orientation="horizontal">

                  <div>
                    <Typography level="body-xs">Address</Typography>
                    <Typography fontSize="sm" fontWeight="lg">
                      {user.address.suite}, {user.address.street}
                    </Typography>
                    <Typography fontSize="sm" fontWeight="lg">
                      {user.address.city}, {user.address.zipcode}
                    </Typography>
                  </div>
                  <Button
                    variant="solid"
                    size="md"
                    color="danger"
                    aria-label="Explore Bahamas Islands"
                    sx={{ ml: 'auto', alignSelf: 'center', fontWeight: 600 }}
                    onClick={() => { handleRemove(user.id) }}
                  >
                    Remove
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          )}
          {removedsearchlist.map((user, index) =>
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card >
                <div>
                  <Typography level="title-lg"> {user.username}</Typography>
                  <Typography level="body-sm">Age: {user.age}</Typography>
                  <div style={{ textAlign: 'right' }}>{user.UniqueId}</div>
                </div>

                <div>
                  <Typography level="body-xs">Company</Typography>
                  <Typography fontSize="sm" fontWeight="lg">
                    {user.company.name}
                  </Typography>
                  <Typography fontSize="sm" fontWeight="lg">
                    {user.company.catchPhrase}
                  </Typography>
                  <Typography fontSize="sm" fontWeight="lg">
                    {user.company.bs}
                  </Typography>
                </div>
                <CardContent orientation="horizontal">

                  <div>
                    <Typography level="body-xs">Address</Typography>
                    <Typography fontSize="sm" fontWeight="lg">
                      {user.address.suite}, {user.address.street}
                    </Typography>
                    <Typography fontSize="sm" fontWeight="lg">
                      {user.address.city}, {user.address.zipcode}
                    </Typography>
                  </div>
                  <Button
                    variant="solid"
                    size="md"
                    color="success"
                    aria-label="Explore Bahamas Islands"
                    sx={{ ml: 'auto', alignSelf: 'center', fontWeight: 600 }}
                    onClick={() => { handleRestore(user.id) }}
                  >
                    Restore
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          )}
        </Grid>
      </ul>
    </>)
  }
}