import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import MoreIcon from '@mui/icons-material/MoreVert';
import { Avatar } from '@mui/material';
import Link from 'next/link';
import { useSession, signIn, signOut } from "next-auth/client"
import Button from '@mui/material/Button'
import { useRouter } from 'next/router'

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.third, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: theme.spacing(2),
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '50ch',
    },
  },
}));

export default function PrimarySearchAppBar(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [session, loading] = useSession()
  const [key, setKey] = React.useState('')
  const router = useRouter()
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMenuChildren = () =>
  {
    if(session)
    {
      return [ <MenuItem key={'profileMenuButton'} onClick={handleMenuClose} > <Link href='/profile' ><a style={{textDecoration: 'none', color:'black'}}>Profile</a></Link> </MenuItem>,
        <MenuItem key={'AccountMenuButton'} onClick={handleMenuClose}> <Link href='/account/upload' ><a style={{textDecoration: 'none', color:'black'}}>My account</a></Link> </MenuItem>,
        <MenuItem key={'SignOutMenuButton'} onClick={handleMenuClose} > <Link href='/api/auth/signout'><a style={{textDecoration: 'none', color:'black'}}>Sign out</a></Link> </MenuItem>]
    }
    return [<MenuItem key={'SignInMenuButton'} onClick={handleMenuClose}> <Link href='/api/auth/signin' ><a style={{textDecoration: 'none', color:'black'}}>Sign in</a></Link> </MenuItem> ]
  }

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    console.log(session);
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      children={handleMenuChildren()}
    >
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <Typography
        noWrap
        component="div"
        style={{padding:'12px'}}>
            {session ? session.user.name.split(' ')[0] : 'user'}
        </Typography>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
            <Avatar
            alt = {session?.user.name}
            src = {session?.user.image}/>
        </IconButton>

      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color='primary'>
        <Toolbar style={{justifyContent: 'space-between'}}>
          <Link
          href='/'
          >
            <a style={{textDecoration: 'none', color:'white', fontSize:'20px'}}>
            VidCharm
            </a>
          </Link>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }} >
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search???"
                inputProps={{ 'aria-label': 'search' }}
                value={key}
                onChange={(event)=>{setKey(event.target.value); console.log(key)}}
              />
            </Search>
            <Button color='secondary' onClick={()=>router.push(`/search?key=${key}`)}> Search</Button>
          </Box>
          
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Typography
            variant='h6'
            component="div"
            style={{padding:'15px'}}>
            {session ? session.user.name.split(' ')[0] : 'user'}
            </Typography>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <Avatar
              alt = {props.name}
              src = {session?.user.image}/>
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}