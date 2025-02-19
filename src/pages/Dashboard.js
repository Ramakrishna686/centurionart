import React, { useState, useEffect } from 'react';
import { 
  Container,
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  Typography, 
  CardActions, 
  Button,
  Box,
  Badge,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Pagination
} from '@mui/material';
import { motion } from 'framer-motion';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DeleteIcon from '@mui/icons-material/Delete';
import  {createPaymentSession}  from '../services/cartService';
import { loadStripe } from '@stripe/stripe-js';
import api from '../services/api';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY || '');

const ArtCard = ({ artwork, onAddToCart, onBuyNow }) => (
  <motion.div whileHover={{ scale: 1.03 }} transition={{ duration: 0.2 }}>
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        height="200"
        image={artwork.image}
        alt={artwork.title}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="h2">
          {artwork.title}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          By {artwork.author}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
          <LocationOnIcon sx={{ mr: 1, color: 'text.secondary' }} />
          <Typography variant="body2" color="text.secondary">
            {artwork.location}
          </Typography>
        </Box>
        <Typography variant="h6" color="primary" sx={{ mt: 2 }}>
          ${artwork.price}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
        <Button 
          variant="contained" 
          startIcon={<ShoppingCartIcon />}
          onClick={() => onAddToCart(artwork)}
        >
          Add to Cart
        </Button>
        <Button 
          variant="outlined" 
          color="secondary"
          onClick={() => onBuyNow([artwork])}
        >
          Buy Now
        </Button>
      </CardActions>
    </Card>
  </motion.div>
);

export default function Dashboard() {
  const [artworks, setArtworks] = useState([]);
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const response = await api.get(`/api/artworks?_page=${page}&_limit=6`);
        setArtworks(response.data);
        setTotalPages(Math.ceil(response.headers['x-total-count'] / 6));
      } catch (error) {
        console.error('Failed to fetch artworks:', error);
      }
    };

    fetchArtworks();
  }, [page]);

  const handleAddToCart = (artwork) => {
    setCart([...cart, artwork]);
  };

  const handleRemoveFromCart = (artworkId) => {
    setCart(cart.filter(item => item.id !== artworkId));
  };

  const handleBuyNow = async (items) => {
    try {
      const stripe = await stripePromise;
      const session = await createPaymentSession(items);
      
      const result = await stripe.redirectToCheckout({
        sessionId: session.id
      });

      if (result.error) {
        throw new Error(result.error.message);
      }
    } catch (error) {
      console.error('Payment failed:', error);
    }
  };

  const CartDialog = () => (
    <Dialog open={cartOpen} onClose={() => setCartOpen(false)} maxWidth="sm" fullWidth>
      <DialogTitle>Shopping Cart</DialogTitle>
      <DialogContent>
        <List>
          {cart.map((item) => (
            <ListItem
              key={item.id}
              secondaryAction={
                <IconButton edge="end" onClick={() => handleRemoveFromCart(item.id)}>
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemText
                primary={item.title}
                secondary={`$${item.price}`}
              />
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setCartOpen(false)}>Continue Shopping</Button>
        <Button 
          variant="contained" 
          color="primary"
          onClick={() => handleBuyNow(cart)}
          disabled={cart.length === 0}
        >
          Checkout
        </Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <Container sx={{ py: 8 }} maxWidth="lg">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
        <Typography variant="h3" component="h1">
          Art Gallery
        </Typography>
        <IconButton onClick={() => setCartOpen(true)}>
          <Badge badgeContent={cart.length} color="secondary">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
      </Box>
      <Grid container spacing={3}>
        {artworks.map((artwork) => (
          <Grid item key={artwork.id} xs={12} sm={6} md={4} lg={3}>
            <ArtCard artwork={artwork} onAddToCart={handleAddToCart} />
          </Grid>
        ))}
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Pagination 
          count={totalPages} 
          page={page} 
          onChange={(event, value) => setPage(value)} 
          color="primary" 
        />
      </Box>
      <CartDialog />
    </Container>
  );
}