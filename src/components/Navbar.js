import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { styled } from "@mui/system";
import "bootstrap/dist/css/bootstrap.min.css";
import "../component_css/Navbar.css";
import logo from "../CopilotMetLifeCG.png";
import HomeIcon from "@mui/icons-material/Home";
import {
  AppRegistrationTwoTone,
  DashboardRounded,
  LogoutRounded,
} from "@mui/icons-material";
import { LoginRounded } from "@mui/icons-material";
import { DetailsRounded } from "@mui/icons-material";
import {} from "@mui/icons-material";

const Root = styled("div")({
  flexGrow: 1,
});

const Title = styled(Typography)({
  flexGrow: 1,
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
  // fontSize: "15px", // Change to your desired font size
  fontWeight: "bold", // Change to your desired font weight
});

const LinkButton = styled(Link)({
  textDecoration: "none",
  color: "inherit",
});

const CustomButton = styled(Button)({
  borderRadius: "30px", // Adjust this value to make the button more oval
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
  fontSize: "15px", // Change to your desired font size
  fontWeight: "bold", // Change to your desired font weight
});

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const sessionToken = localStorage.getItem("sessionToken");
    const sessionExpiry = localStorage.getItem("sessionExpiry");

    if (sessionToken && sessionExpiry && Date.now() < sessionExpiry) {
      setIsLoggedIn(true);
    } else {
      localStorage.removeItem("sessionToken");
      localStorage.removeItem("sessionExpiry");
      setIsLoggedIn(false);
    }

    const interval = setInterval(() => {
      const sessionExpiry = localStorage.getItem("sessionExpiry");
      if (sessionExpiry && Date.now() >= sessionExpiry) {
        localStorage.removeItem("sessionToken");
        localStorage.removeItem("sessionExpiry");
        setIsLoggedIn(false);
        navigate("/");
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("sessionToken");
    localStorage.removeItem("sessionExpiry");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <Root>
      <AppBar position="static" style={{ backgroundColor: "#2e8b57" }}>
        <Toolbar>
          <img
            src={logo}
            alt="Logo"
            style={{ marginRight: "10px", height: "70px" }}
          />
          <Title
            variant="h4"
            component="div"
            style={{ textShadow: "2px 2px 4px #000000" }}
          >
            DV Insurance Company
          </Title>
          <LinkButton to="/" sx={{ mr: 2 }}>
            <CustomButton
              color="inherit"
              variant="contained"
              size="small"
              startIcon={<HomeIcon />}
            >
              Home
            </CustomButton>
          </LinkButton>
          {!isLoggedIn && (
            <>
              <LinkButton to="/register" sx={{ mr: 2 }}>
                <CustomButton
                  color="primary"
                  variant="contained"
                  size="small"
                  startIcon={<AppRegistrationTwoTone />}
                >
                  Register
                </CustomButton>
              </LinkButton>

              <LinkButton to="/login" sx={{ mr: 2 }}>
                <CustomButton
                  color="warning"
                  variant="contained"
                  size="small"
                  startIcon={<LoginRounded />}
                >
                  Login
                </CustomButton>
              </LinkButton>
            </>
          )}
          {isLoggedIn && (
            <>
              <LinkButton to="/dashboard" sx={{ mr: 2 }}>
                <CustomButton
                  color="secondary"
                  variant="contained"
                  size="small"
                  startIcon={<DashboardRounded />}
                >
                  Dashboard
                </CustomButton>
              </LinkButton>
              <CustomButton
                color="error"
                variant="contained"
                size="small"
                onClick={handleLogout}
                startIcon={<LogoutRounded />}
              >
                Logout
              </CustomButton>
            </>
          )}
          <LinkButton to="/about" sx={{ mr: 2 }}>
            <CustomButton
              color="info"
              variant="contained"
              size="small"
              startIcon={<DetailsRounded />}
            >
              About
            </CustomButton>
          </LinkButton>
        </Toolbar>
      </AppBar>
    </Root>
  );
};

export default Navbar;
