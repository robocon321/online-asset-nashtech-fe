import { styled, useTheme } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AssignmentReturnIcon from '@mui/icons-material/AssignmentReturn';
import PieChartOutlineIcon from '@mui/icons-material/PieChartOutline';
import StyleIcon from '@mui/icons-material/Style';

import { Link } from 'react-router-dom';

import styles from './Sidebar.module.css';

const drawerWidth = 300;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});


const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
  })
);

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Sidebar = (props) => {
  const theme = useTheme();

  return (
    <Drawer variant="permanent" open={props.open} className={styles['sidebar']}>
    <DrawerHeader>
    </DrawerHeader>
    <ListItem disablePadding sx={{ display: 'block' }}>
      <div className={styles['wrap-logo']}>
        <img className={styles['logo']} src="/logo.png" alt="Not found" />
      </div>
    </ListItem>

    <ListItem disablePadding sx={{ display: 'block' }}>
      <Link to='/home'>
        <ListItemButton
          sx={{
            minHeight: 48,
            justifyContent: props.open ? 'initial' : 'center',
            px: 2.5,
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: props.open ? 3 : 'auto',
              justifyContent: 'center'
            }}
          >
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary='Home' sx={{ 
            opacity: props.open ? 1 : 0,
          }} />
        </ListItemButton>
      </Link>
    </ListItem>

    <ListItem disablePadding sx={{ display: 'block' }}>
      <Link to='/users'>
        <ListItemButton
          sx={{
            minHeight: 48,
            justifyContent: props.open ? 'initial' : 'center',
            px: 2.5,
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: props.open ? 3 : 'auto',
              justifyContent: 'center',
            }}
          >
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary='Manage User' sx={{ opacity: props.open ? 1 : 0 }} />
        </ListItemButton>
      </Link>
    </ListItem>
    <ListItem disablePadding sx={{ display: 'block' }}>
      <Link to='/assets'>
        <ListItemButton
          sx={{
            minHeight: 48,
            justifyContent: props.open ? 'initial' : 'center',
            px: 2.5,
          }}
        >
          <ListItemIcon           
            sx={{
              minWidth: 0,
              mr: props.open ? 3 : 'auto',
              justifyContent: 'center',
              color: 'var(primary_color)'
            }}
          >
            <StyleIcon />
          </ListItemIcon>
          <ListItemText className='sidebar_itemtext' primary='Manage Asset' sx={{ opacity: props.open ? 1 : 0 }} />
        </ListItemButton>
      </Link>
    </ListItem>

    <ListItem disablePadding sx={{ display: 'block' }}>
      <Link to='/assignments'>
        <ListItemButton
          sx={{
            minHeight: 48,
            justifyContent: props.open ? 'initial' : 'center',
            px: 2.5,
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: props.open ? 3 : 'auto',
              justifyContent: 'center',
            }}
          >
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary='Manage Assignment' sx={{ opacity: props.open ? 1 : 0 }} />
        </ListItemButton>
      </Link>
    </ListItem>

    <ListItem disablePadding sx={{ display: 'block' }}>
      <Link to='/request'>
        <ListItemButton
          sx={{
            minHeight: 48,
            justifyContent: props.open ? 'initial' : 'center',
            px: 2.5,
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: props.open ? 3 : 'auto',
              justifyContent: 'center',
            }}
          >
            <AssignmentReturnIcon />
          </ListItemIcon>
          <ListItemText primary='Manage for Returning' sx={{ opacity: props.open ? 1 : 0 }} />
        </ListItemButton>
      </Link>
    </ListItem>
    <ListItem disablePadding sx={{ display: 'block' }}>
      <Link to='/report'>
        <ListItemButton
          sx={{
            minHeight: 48,
            justifyContent: props.open ? 'initial' : 'center',
            px: 2.5,
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: props.open ? 3 : 'auto',
              justifyContent: 'center',
            }}
          >
            <PieChartOutlineIcon />
          </ListItemIcon>
          <ListItemText primary='Report' sx={{ opacity: props.open ? 1 : 0 }} />
        </ListItemButton>
      </Link>
    </ListItem>

  </Drawer>

  )
}

export default Sidebar;