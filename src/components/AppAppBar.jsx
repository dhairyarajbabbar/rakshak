import * as React from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
import Popper from '@mui/material/Popper';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import { useNavigate } from 'react-router-dom';
// import Cookies from 'js-cookie';
import axios from 'axios';
// import { useCookies } from 'react-cookie';
const logoStyle = {
  width: '110px',
  height: 'auto',
  cursor: 'pointer',
};

function ProfileMenu({ isOpen, anchorRef, handleClose }) {

  const navigate = useNavigate();
  const handleViewProfile = () => {
    navigate('/profile');
    handleClose();
  };
  const handleEditProfile = () => {
    navigate('/editprofile');
    handleClose();
  };
  const handleUploadProfilePic = () => {
    navigate('/uploadprofilepicture');
    handleClose();
  };
  const handleLogout = () => {
    try {
      axios.get(`${process.env.REACT_APP_BASEURL}api/auth/logout`, {
        withCredentials: true
      });
  } catch (error) {
      console.log(error)
  }
    navigate('/login'); 
  };
  return (
    <Popper open={isOpen} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
      {({ TransitionProps, placement }) => (
        <Grow
          {...TransitionProps}
          style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
        >
          <Paper>
            <ClickAwayListener onClickAway={handleClose}>
              <MenuList autoFocusItem={isOpen} id="profile-menu-list">
                <MenuItem onClick={handleViewProfile}>View Profile</MenuItem>
                <MenuItem onClick={handleEditProfile}>Edit Profile</MenuItem>
                <MenuItem onClick={handleUploadProfilePic}>Upload Profile Pic</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem> 
              </MenuList>
            </ClickAwayListener>
          </Paper>
        </Grow>
      )}
    </Popper>
  );
}

ProfileMenu.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  anchorRef: PropTypes.object.isRequired,
  handleClose: PropTypes.func.isRequired,
};

function AppAppBar({ mode }) {
  const [open, setOpen] = React.useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = React.useState(false);
  const [profilePic, setProfilePic] = React.useState(null);
  const anchorRef = React.useRef(null);
  const navigate = useNavigate();

  React.useEffect(() => {
    const fetchProfilePic = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASEURL}api/profile/picture`, {
          responseType: 'arraybuffer',
          withCredentials: true,
        });
    
        const imageBlob = new Blob([response.data], { type: response.headers['content-type'] });
        const imageUrl = URL.createObjectURL(imageBlob);
        setProfilePic(imageUrl);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          navigate('/login');
        } else {
          console.error('Error fetching profile picture:', error);
        }
      }
    };
    

    fetchProfilePic();
  }, [navigate]);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleProfileMenuToggle = () => {
    setProfileMenuOpen((prevOpen) => !prevOpen);
  };

  const handleProfileMenuClose = (event) => {
    if (event && anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setProfileMenuOpen(false);
  };

  const scrollToSection = (sectionId) => {
    const sectionElement = document.getElementById(sectionId);
    const offset = -15;
    if (sectionElement) {
      const targetScroll = sectionElement.offsetTop - offset;
      sectionElement.scrollIntoView({ behavior: 'smooth' });
      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth',
      });
      setOpen(false);
    }
  };

  return (
    <div>
      <AppBar
        position="fixed"
        sx={{
          boxShadow: 0,
          bgcolor: 'transparent',
          backgroundImage: 'none',
          mt: 2,
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            variant="regular"
            sx={(theme) => ({
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexShrink: 0,
              borderRadius: '999px',
              bgcolor:
                theme.palette.mode === 'light'
                  ? 'rgba(255, 255, 255, 0.4)'
                  : 'rgba(0, 0, 0, 0.4)',
              backdropFilter: 'blur(24px)',
              maxHeight: 40,
              border: '1px solid',
              borderColor: 'divider',
              boxShadow:
                theme.palette.mode === 'light'
                  ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
                  : '0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)',
            })}
          >
            <Box
              sx={{
                flexGrow: 1,
                display: 'flex',
                alignItems: 'center',
                ml: '-18px',
                px: 0,
              }}
            >
              <img
                src={
                  'https://www.rakshakcode.com/wp-content/uploads/2022/01/round-logo.png'
                }
                style={logoStyle}
                alt="logo of sitemark"
              />
              <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                <MenuItem
                  onClick={() => scrollToSection('features')}
                  sx={{ py: '6px', px: '12px' }}
                >
                  <Typography variant="body2" color="text.primary">
                    Documents
                  </Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => scrollToSection('exams')}
                  sx={{ py: '6px', px: '12px' }}
                >
                  <Typography variant="body2" color="text.primary">
                    Exams
                  </Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => scrollToSection('highlights')}
                  sx={{ py: '6px', px: '12px' }}
                >
                  <Typography variant="body2" color="text.primary">
                    License Issued
                  </Typography>
                </MenuItem>
                {/* <MenuItem
                  onClick={() => scrollToSection('pricing')}
                  sx={{ py: '6px', px: '12px' }}
                >
                  <Typography variant="body2" color="text.primary">
                    Pricing
                  </Typography>
                </MenuItem> */}
                <MenuItem
                  onClick={() => scrollToSection('faq')}
                  sx={{ py: '6px', px: '12px' }}
                >
                  <Typography variant="body2" color="text.primary">
                    FAQ
                  </Typography>
                </MenuItem>
              </Box>
            </Box>
            <Box
              sx={{
                display: { xs: 'none', md: 'flex' },
                gap: 0.5,
                alignItems: 'center',
              }}
            >
              <Box sx={{ position: 'relative' }}>
                {profilePic ? (
                  <Avatar
                    ref={anchorRef}
                    onClick={handleProfileMenuToggle}
                    sx={{ width: 40, height: 40 }}
                    src={profilePic}
                    alt="User profile"
                  />
                ) : (
                  <Avatar
                    ref={anchorRef}
                    onClick={handleProfileMenuToggle}
                    sx={{ width: 40, height: 40 }}
                    alt="User profile"
                  >
                    P
                  </Avatar>
                )}
                <ProfileMenu
                  isOpen={profileMenuOpen}
                  anchorRef={anchorRef}
                  handleClose={handleProfileMenuClose}
                />
              </Box>
            </Box>
            <Box sx={{ display: { sm: '', md: 'none' } }}>
              <Button
                variant="text"
                color="primary"
                aria-label="menu"
                onClick={toggleDrawer(true)}
                sx={{ minWidth: '30px', p: '4px' }}
              >
                <MenuIcon />
              </Button>
              <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
                <Box
                  sx={{
                    minWidth: '60dvw',
                    p: 2,
                    backgroundColor: 'background.paper',
                    flexGrow: 1,
                  }}
                >
                  <MenuItem onClick={() => scrollToSection('features')}>
                    Documents
                  </MenuItem>
                  <MenuItem onClick={() => scrollToSection('exams')}>
                    Exams
                  </MenuItem>
                  <MenuItem onClick={() => scrollToSection('highlights')}>
                    License Issued
                  </MenuItem>
                  <MenuItem onClick={() => scrollToSection('faq')}>FAQ</MenuItem>
                  <Divider />
                  <MenuItem>
                    <Button
                      color="primary"
                      variant="contained"
                      component="a"
                      href="/register"
                      target="_blank"
                      sx={{ width: '100%' }}
                    >
                      Sign up
                    </Button>
                  </MenuItem>
                  <MenuItem>
                    <Button
                      color="primary"
                      variant="outlined"
                      component="a"
                      href="/login"
                      target="_blank"
                      sx={{ width: '100%' }}
                    >
                      Sign in
                    </Button>
                  </MenuItem>
                </Box>
              </Drawer>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}

AppAppBar.propTypes = {
  mode: PropTypes.oneOf(['dark', 'light']).isRequired,
  //   toggleColorMode: PropTypes.func.isRequired,
};

export default AppAppBar;
