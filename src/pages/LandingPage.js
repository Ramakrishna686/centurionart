import { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, Button, InputBase, Modal, Box, Card, CardMedia, CardContent, Grid, Paper } from "@mui/material";
import { Search, ShoppingCart, AccountCircle } from "@mui/icons-material";
import LoginModal  from './LoginPage';
import Navbar from './Navbar';
import api from '../services/api';

// const artworks = [
//   { id: 1, title: "Abstract Colors", image: "https://via.placeholder.com/300" },
//   { id: 2, title: "Urban Graffiti", image: "https://via.placeholder.com/300" },
//   { id: 3, title: "Modern Expression", image: "https://via.placeholder.com/300" },
// ];

const categories = [
  { name: "Abstract", image: "https://via.placeholder.com/150", bgColor: "#E0BBE4" },
  { name: "Landscapes", image: "https://via.placeholder.com/150", bgColor: "#FFDFBA" },
  { name: "Portraits", image: "https://via.placeholder.com/150", bgColor: "#FFABAB" },
  { name: "Photography", image: "https://via.placeholder.com/150", bgColor: "#E8E8E8" },
  { name: "Sculpture", image: "https://via.placeholder.com/150", bgColor: "#FFB7B2" },
  { name: "Best-selling artists", image: "https://via.placeholder.com/150", bgColor: "#D4F0F0" },
  { name: "Famous artists", image: "https://via.placeholder.com/150", bgColor: "#C1BBDD" },
  { name: "Seasonal promotion", image: "https://via.placeholder.com/150", bgColor: "#5B62F4", color: "white" },
];

export default function ArtGalleryLanding() {
    const [search, setSearch] = useState("");
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [artworks, setArtworks] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
  
    useEffect(() => {
      const fetchArtworks = async () => {
        try {
          const response = await api.get(`/api/artworks?_page=${page}&_limit=100`);
          setArtworks(response.data);
          setTotalPages(Math.ceil(response.headers['x-total-count'] / 6));
        } catch (error) {
          console.error('Failed to fetch artworks:', error);
        }
      };
  
      fetchArtworks();
    }, [page]);
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      {/* <AppBar position="static" color="default">
        <Toolbar>
          <Typography variant="h6" color="primary" sx={{ flexGrow: 1 }}>
            Singulart
          </Typography>
          <InputBase
            placeholder="Search for art..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ ml: 1, flex: 1, backgroundColor: '#f1f1f1', borderRadius: 1, padding: '4px 8px' }}
          />
          <Search sx={{ color: 'gray', ml: 1 }} />
          <Button onClick={() => setIsLoginOpen(true)} color="primary">
            <AccountCircle sx={{ mr: 1 }} /> Login
          </Button>
          <ShoppingCart sx={{ color: 'gray', ml: 2 }} />
        </Toolbar>
      </AppBar> */}

      {/* Nav Bar */}
      <Navbar />

      {/* Promotion Banner */}
      {/* <Box sx={{ textAlign: "center", py: 4, backgroundColor: "#bbdefb" }}>
        <Typography variant="h5">30% off your favorite artworks!</Typography>
        <Typography variant="body1">Limited time seasonal promotion</Typography>
        <Button variant="contained" color="primary" sx={{ mt: 2 }}>Shop Now</Button>
      </Box> */}

      {/* Featured Categories */}
      <Box sx={{ p: 4 }}>
        <Typography variant="h5" textAlign="center" fontWeight="bold">Featured artwork categories</Typography>
        <Typography variant="body1" textAlign="center" mb={3}>
          Whatever your taste, style, or mood, find original art you love in these popular categories
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          {categories.map((category) => (
            <Grid item xs={12} sm={6} md={3} key={category.name}>
              <Paper sx={{ backgroundColor: category.bgColor, padding: 2, textAlign: "center", borderRadius: 2, color: category.color || "black" }}>
                <Typography variant="subtitle1" fontWeight="bold">{category.name}</Typography>
                <img src={category.image} alt={category.name} style={{ width: "100%", borderRadius: 8 }} />
              </Paper>
            </Grid>
          ))}
        </Grid>
        <Box textAlign="center" mt={3}>
          <Button variant="outlined" color="primary">Explore all categories</Button>
        </Box>
      </Box>

     {/* Gallery */}
        <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 2, p: 4 }}>
        {Array.isArray(artworks) && artworks.length > 0 ? (
            artworks
            .filter((art) => art.title && art.title.toLowerCase().includes(search.toLowerCase()))
            .map((art) => (
                <Card key={art.id || Math.random()} sx={{ boxShadow: 3 }}>
                <CardMedia component="img" height="200" image={art.image || "https://via.placeholder.com/300"} alt={art.title || "Artwork"} />
                <CardContent>
                    <Typography variant="h6">{art.title || "Untitled"}</Typography>
                </CardContent>
                </Card>
            ))
        ) : (
            <Typography variant="h6" textAlign="center" sx={{ gridColumn: "1/-1", mt: 4 }}>
            No artworks found.
            </Typography>
        )}
        </Box>


      {/* Login Modal */}
      <Modal open={isLoginOpen} onClose={() => setIsLoginOpen(false)}>
       <LoginModal  open={isLoginOpen} onClose={() => setIsLoginOpen(false)}/>
      </Modal>
    </div>
  );
}
