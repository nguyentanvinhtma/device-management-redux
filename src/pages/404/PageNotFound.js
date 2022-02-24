import React from "react";
import { Container } from "@mui/material";
import Box from "@mui/material/Box";
import { Fragment } from "react";
import { CardMedia } from "@mui/material";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();
  const handleGoHome = () => {
    navigate('/');
  };
  return (
    <Fragment>
      <Container maxWidth="lg">
        <Box
          sx={{
            bgcolor: "#ffffff",
            height: "80vh",
            my: 8,
            mx: 5,
            borderRadius: 2,
            padding: 2,
          }}
        >
          <CardMedia
            component="img"
            height="70%"
            image='/404-page-not-found.jpg'
            alt="cover-image"
            sx={{ borderRadius: 2 }}
          />
          <Box
            sx={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <Button variant="contained" onClick={handleGoHome}>
              GO HOME
            </Button>
          </Box>
        </Box>
      </Container>
    </Fragment>
  );
};
export { PageNotFound };
