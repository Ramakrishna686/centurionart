import React from "react";
import { AppBar, Toolbar, Typography, Button, IconButton, InputBase, Box } from "@mui/material";
import { Search, FavoriteBorder, PersonOutline, ShoppingBagOutlined } from "@mui/icons-material";

const Navbar = () => {
  return (
    <AppBar position="static" color="inherit" sx={{ boxShadow: 0, borderBottom: "1px solid #ddd" }}>
        
        {/* Icons & Sell My Art Button */}
        <Box sx={{ justifyContent: "right", marginTop: 2, display: "flex", alignItems: "center", gap: 1 }}>
            
          <Button variant="contained" color="error" sx={{ borderRadius: 3, textTransform: "none" }}>
            Seasonal promotion
          </Button>
          <Button variant="outlined" color="primary" sx={{ textTransform: "none" }}>
            Sell my art
          </Button>
          <IconButton>
            <FavoriteBorder />
          </IconButton>
          <IconButton>
            <PersonOutline />
          </IconButton>
          <IconButton>
            <ShoppingBagOutlined />
          </IconButton>
        </Box>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        
        {/* Logo */}
        <Typography variant="h6" color="primary" sx={{ fontWeight: "bold" }}>
          Singulart
        </Typography>

        {/* Search Bar */}
        <Box sx={{ display: "flex", alignItems: "center", bgcolor: "#f1f1f1", borderRadius: 2, px: 2 }}>
          <Search color="disabled" />
          <InputBase placeholder="Search for Photography" sx={{ ml: 1, width: 500 }} />
        </Box>

        {/* Navigation Links */}
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
          {["New In", "Painting", "Print", "Photography", "Sculpture", "Drawing", "More", "Artists"].map((item) => (
            <Button key={item} sx={{ color: "black", textTransform: "none" }}>
              {item}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
