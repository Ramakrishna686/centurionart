import React, { useState } from 'react';
import { useRoute } from '../contexts/RouteContext';
import { 
  AppBar, 
  Toolbar, 
  Button, 
  Typography, 
  Box, 
  IconButton, 
  Drawer, 
  List, 
  ListItem,
  useTheme,
  useMediaQuery 
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import BrushIcon from '@mui/icons-material/Brush';
import { motion } from 'framer-motion';

const Navigation = () => {
  const { routes, setCurrentRoute, currentRoute } = useRoute();
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = (
    routes.map((route) => (
      <motion.div 
        key={route.path} 
        whileHover={{ scale: 1.1 }} 
        whileTap={{ scale: 0.9 }}
      >
        <Button
          color={currentRoute === route.path ? 'secondary' : 'inherit'}
          onClick={() => {
            setCurrentRoute(route.path);
            if (mobileOpen) handleDrawerToggle();
          }}
          variant={currentRoute === route.path ? 'contained' : 'text'}
          fullWidth={isMobile}
          sx={{ my: isMobile ? 1 : 0 }}
        >
          {route.name}
        </Button>
      </motion.div>
    ))
  );

  return (
    <AppBar position="static" color="primary" elevation={4}>
      <Toolbar>
        {/* Left-aligned content */}
        <Box display="flex" alignItems="center" sx={{ flexGrow: 1 }}>
          <Typography variant="h6">
            CENTURIONART
          </Typography>
          <BrushIcon sx={{ ml: 1, fontSize: 30 }} />
        </Box>

        {/* Right-aligned menu items */}
        {/* {isMobile ? (
          <>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="right"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              sx={{
                '& .MuiDrawer-paper': { 
                  width: 240,
                  boxSizing: 'border-box',
                  padding: 2
                },
              }}
            >
              <List>
                <ListItem sx={{ flexDirection: 'column', gap: 1 }}>
                  {menuItems}
                </ListItem>
              </List>
            </Drawer>
          </>
        ) : (
          <Box sx={{ display: 'flex', gap: 2 }}>
            {menuItems}
          </Box>
        )} */}
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
