import { useEffect, useState } from "react";
import { Nav, Navbar, Row } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

const Navigation = () => {
  const [activeMenuItem, setActiveMenuItem] = useState("search");
  const location = useLocation();
  const [isNavFixed, setIsNavFixed] = useState(false);
  const [nav, setNav] = useState(false);
  const [menuButtonColor, setMenuButtonColor] = useState("none");

  const HandleNav = () => {
    setMenuButtonColor(nav ? "none" : "white"); // Toggle between black and white
    setNav(!nav);
    if (!nav) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "scroll";
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsNavFixed(true);
      } else {
        setIsNavFixed(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    //clean up event listener
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    // Update activeMenuItem based on the current location
    if (location.pathname === "/") {
      setActiveMenuItem("search");
    } else if (location.pathname === "/watchlist") {
      setActiveMenuItem("watchlist");
    }
  }, [location]);

  return (
    <Row>
      <Navbar
        bg=""
        expand="lg"
        className={isNavFixed ? "fixed-top" : "grey-border-bottom"}
        style={{
          padding: "1.5% 0",
        }}
      >
        <Navbar.Brand href="/" className="nav-brand-landing">
          Movie Watchlist
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          className="nav-menu"
          style={{ background: menuButtonColor }}
          onClick={HandleNav}
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav
            className={
              nav
                ? "ml-auto nav-landing nav-landing2"
                : "ml-auto nav-landing nav-landing3"
            }
          >
            <Link
              onClick={() => {
                if (activeMenuItem === "search") {
                } else {
                  document.body.style.overflow = "scroll";
                }
              }}
              to="/"
              className={
                activeMenuItem === "search"
                  ? "nav-color-active find-hospital"
                  : "find-hospital nav-color"
              }
            >
              Search Movie
            </Link>
            <Link
              onClick={() => {
                if (activeMenuItem === "watchlist") {
                } else {
                  document.body.style.overflow = "scroll";
                }
              }}
              to="/watchlist"
              className={
                activeMenuItem === "watchlist"
                  ? "nav-color-active saved-hospital"
                  : "saved-hospital nav-color"
              }
            >
              WatchList
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Row>
  );
};

export default Navigation;
