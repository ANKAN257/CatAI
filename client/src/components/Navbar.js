import React from 'react'
import {Box ,Typography,useTheme,Link } from '@mui/material';

const Navbar = () => {
  
  const theme=useTheme()

  return (
    <Box width={"100%"} backgroundColor={theme.palette.background.alt} p="2rem 10%" textAlign={'center'} sx={{boxShadow:3 ,mb:3}}>
          <Typography variant="h1" color={"primary"} fontWeight="bold">
            New CAT AI
          </Typography>
          <Link  href='/' p={1} variant="h5" >Home</Link>
          <Link href='/register' p={1} variant="h5">Sign Up</Link>
          <Link href='/login' p={1} variant="h5">Sign In</Link>

    </Box>
  )
}

export default Navbar