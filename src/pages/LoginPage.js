import React from "react";
import { Dialog, DialogContent, Button, Typography, Box, IconButton } from "@mui/material";
import { Facebook, Google, Close } from "@mui/icons-material";

const LoginModal = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogContent sx={{ display: "flex", p: 0, position: "relative" }}>
        <IconButton onClick={onClose} sx={{ position: "absolute", top: 8, right: 8 }}>
          <Close />
        </IconButton>

        {/* Left Side - Collector */}
        <Box sx={{ width: "50%", p: 3, borderRight: 1, borderColor: "divider", textAlign: "center" }}>
          <Typography variant="h5" color="primary" gutterBottom>
            👤 I am an art lover, a collector
          </Typography>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            Create an account to save your favorites and receive personal offers.
          </Typography>
          <Button variant="contained" fullWidth sx={{ mb: 2 }}>
            Sign up with email
          </Button>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            or
          </Typography>
          <Button variant="outlined" startIcon={<Google />} fullWidth sx={{ mb: 1 }}>
            Continue with Google
          </Button>
          <Button variant="outlined" startIcon={<Facebook />} fullWidth>
            Continue with Facebook
          </Button>
          <Typography variant="body2" color="textSecondary" mt={2}>
            Already have an account? <a href="#" style={{ color: "blue" }}>Sign in</a>
          </Typography>
        </Box>

        {/* Right Side - Artist */}
        <Box sx={{ width: "50%", p: 3, textAlign: "center" }}>
          <Typography variant="h5" color="primary" gutterBottom>
            🖌 I am an artist
          </Typography>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            You are a painter, photographer, sculptor, or draftsman.
          </Typography>
          <Button variant="contained" fullWidth>
            Apply online
          </Button>
          <Typography variant="body2" color="textSecondary" mt={2}>
            You already are a Singulart artist? <a href="#" style={{ color: "blue" }}>Sign in</a>
          </Typography>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
