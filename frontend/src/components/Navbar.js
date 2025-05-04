import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = ({ hideGetStarted, disableSlide, hideEvents }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  // Set default top value based on disableSlide prop
  const [navbarTop, setNavbarTop] = useState(disableSlide ? "20px" : "10px");
  const [hasShadow, setHasShadow] = useState(false);

  const handleScroll = () => {
    // Only run if sliding is enabled
    if (disableSlide) return;
    const currentScrollY = window.pageYOffset;
    const scrollDelta = currentScrollY - lastScrollY;

    if (scrollDelta > 0) {
      // Scrolling down
      setNavbarTop(`${Math.min(20 + currentScrollY * 0.15, 30)}px`);
    } else {
      // Scrolling up
      setNavbarTop(`${Math.max(20 - currentScrollY * 0.1, 15)}px`);
    }

    setHasShadow(currentScrollY > 100);
    setLastScrollY(currentScrollY);
  };

  const handleClickOutside = (e) => {
    if (
      !e.target.closest("#mobile-menu") &&
      !e.target.closest("#mobile-menu-button")
    ) {
      setIsMenuOpen(false);
    }
  };

  const handleEscapeKey = (e) => {
    if (e.key === "Escape") setIsMenuOpen(false);
  };

  useEffect(() => {
    // Only add scroll listener if sliding is not disabled
    if (!disableSlide) {
      window.addEventListener("scroll", handleScroll);
      setLastScrollY(window.pageYOffset);
    }
    document.addEventListener("click", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      if (!disableSlide) {
        window.removeEventListener("scroll", handleScroll);
      }
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [lastScrollY, disableSlide]);

  return (
    <>
      <HeaderWrapper style={{ top: navbarTop }}>
        <NavbarContainer hasShadow={hasShadow}>
          <NavContent>
            <BrandWrapper>
              <Logo src="images/logo.png" alt="Trash2Cash Logo" />
              <BrandName>Trash2Cash</BrandName>
            </BrandWrapper>

            <DesktopNav>
              <NavItem href="/#home">Home</NavItem>
              {!hideEvents && <NavItem href="/events">Events</NavItem>}
              <NavItem href="/education">Awareness Hub</NavItem>
              <NavItem href="/forum">Forum</NavItem>
              {!hideGetStarted && (
                <GetStartedButton
                  onClick={() => {
                    const section = document.getElementById("callToAction");
                    section && section.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Open Chat
                </GetStartedButton>
              )}
            </DesktopNav>

            <MobileMenuButton
              id="mobile-menu-button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <FaTimes /> : <FaBars />}
            </MobileMenuButton>
          </NavContent>
        </NavbarContainer>
      </HeaderWrapper>

      <MobileMenuWrapper
        isOpen={isMenuOpen}
        onClick={() => setIsMenuOpen(false)}
      >
        <MobileMenuContent onClick={(e) => e.stopPropagation()}>
          <MobileNavItem href="/#home">Home</MobileNavItem>
          {!hideEvents && <MobileNavItem href="/#details">Events</MobileNavItem>} 
          <MobileNavItem href="/#team">Team</MobileNavItem>
          <MobileNavItem href="/#testimonial">Testimonials</MobileNavItem>
          <MobileNavItem href="/#faqs">FAQs</MobileNavItem>
          {!hideGetStarted && (
            <MobileGetStartedButton
              onClick={() => {
                const section = document.getElementById("callToAction");
                section && section.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Get Started
            </MobileGetStartedButton>
          )}
        </MobileMenuContent>
      </MobileMenuWrapper>
    </>
  );
};

export default Navbar;

/* Styled Components */
const HeaderWrapper = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
  transition: top 0.3s cubic-bezier(0.4, 0, 0.2, 1);
`;

const NavbarContainer = styled.nav`
  background: linear-gradient(
    to right,
    #d6e1f3,
    #8a95bf,
    rgb(111, 199, 231),
    rgb(73, 150, 164)
  );
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: ${(props) =>
    props.hasShadow
      ? "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)"
      : "none"};
  width: 90%;
  margin: 0 auto;
  border-radius: 12px;
  transition: all 0.3s ease;
`;

const NavContent = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 2rem;
  height: 5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BrandWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Logo = styled.img`
  height: 3.7rem;
  width: 5.7rem;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.2);
`;

const BrandName = styled.span`
  color: rgb(34, 77, 83);
  font-size: 1.75rem;
  font-weight: 700;
  display: none;

  @media (min-width: 768px) {
    display: block;
  }
`;

const DesktopNav = styled.nav`
  display: none;
  gap: 2rem;
  align-items: center;

  @media (min-width: 768px) {
    display: flex;
  }
`;

const NavItem = styled.a`
  color: rgb(34, 77, 83);
  font-weight: 500;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  position: relative;
  padding-bottom: 0.25rem;

  &:hover {
    color: white;
    &::after {
      width: 100%;
    }
  }

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: white;
    transition: width 0.3s ease;
  }
`;

const GetStartedButton = styled.button`
  margin-left: 1rem;
  background: rgba(255, 255, 255, 0.5);
  color: rgb(34, 77, 83);
  padding: 0.5rem 1.5rem;
  border: none;
  border-radius: 9999px;
  font-weight: 600;
  transition: background 0.3s ease;
  backdrop-filter: blur(4px);

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileMenuButton = styled.button`
  color: white;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  display: block;

  @media (min-width: 768px) {
    display: none;
  }

  svg {
    height: 1.5rem;
    width: 1.5rem;
  }
`;

/* Mobile Menu Styled Components */
const MobileMenuWrapper = styled.div`
  position: fixed;
  inset: 0;
  z-index: 50;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(8px);
  display: ${(props) => (props.isOpen ? "block" : "none")};
`;

const MobileMenuContent = styled.div`
  position: absolute;
  top: 5rem;
  left: 5%;
  right: 5%;
  background: white;
  border-radius: 0.5rem;
  padding: 1.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
`;

const MobileNavItem = styled.a`
  display: block;
  color: #1f2937;
  font-weight: 500;
  padding: 1rem;
  border-radius: 0.25rem;
  transition: all 0.2s ease;

  &:hover {
    background: #f3f4f6;
    color: #3b82f6;
  }
`;

const MobileGetStartedButton = styled.button`
  width: 100%;
  background: rgba(255, 255, 255, 0.1);
  color: #1f2937;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 9999px;
  font-weight: 600;
  margin-top: 1rem;
  transition: background 0.3s ease;
  backdrop-filter: blur(4px);

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

export {
  MobileMenuWrapper,
  MobileMenuContent,
  MobileNavItem,
  MobileGetStartedButton,
};
