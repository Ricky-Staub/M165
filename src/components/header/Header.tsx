import Link from "next/link";
import Image from "next/image";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { useRouter } from "next/router";
import { useState } from "react";

import useSession from "@api/session";
import Avatar from "./Avatar";
import { Role } from "src/enums/role.enum";

export default function Header() {
  const session = useSession();
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const isRegisterPage = router.pathname === "/auth/register";
  const isLoginPage = router.pathname === "/auth/login";

  const handleLogout = () => {
    session.logout();
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <>
      <style>{`
        .profile-dropdown .nav-link:hover,
        .profile-dropdown .nav-link:focus,
        .profile-dropdown .nav-link:active {
          text-decoration: none;
        }
        .profile-dropdown .dropdown-item:hover,
        .profile-dropdown .dropdown-item:focus,
        .profile-dropdown .dropdown-item:active {
          text-decoration: none;
        }
      `}</style>

      <Navbar
        collapseOnSelect
        expand="lg"
        bg="light"
        variant="light"
        style={{ zIndex: 1000 }}
      >
        <Container style={{ margin: 0, minWidth: "100%" }}>
          <Link href="/" passHref>
            <Nav.Link
              className="navbar-brand"
              style={{
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
              }}
            >
              <Image
                src="/logo.png"
                width={40}
                height={40}
                className="d-inline-block align-top"
                alt="Todo"
              />
              <span style={{ marginLeft: "0.5rem" }}>Todo</span>
            </Nav.Link>
          </Link>

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />

          <Navbar.Collapse id="responsive-navbar-nav">
            <Navbar.Collapse className="justify-content-end">
              <Nav
                style={{
                  display: "contents",
                }}
              >
                {/* {session.user && ( */}
                <Link href="/todos" passHref>
                  <Nav.Link style={{ textDecoration: "none" }}>Todos</Nav.Link>
                </Link>
                {/* )} */}

                {/* {session.user?.roles?.some(
                  (role) => role.name === Role.ADMIN
                ) && ( */}
                <Link href="/users" passHref>
                  <Nav.Link style={{ textDecoration: "none" }}>Users</Nav.Link>
                </Link>
                {/* )} */}
              </Nav>
            </Navbar.Collapse>

            <Navbar.Collapse className="justify-content-end">
              <Nav>
                {/* {session.user && ( */}
                <>
                  <NavDropdown
                    title={<Avatar />}
                    id="basic-nav-dropdown"
                    align="end"
                    style={{ textDecoration: "none" }}
                    className="profile-dropdown"
                    show={dropdownOpen}
                    onToggle={toggleDropdown}
                  >
                    <NavDropdown.Item href="/profile">
                      My profile
                    </NavDropdown.Item>

                    <NavDropdown.Divider />

                    <NavDropdown.Item
                      onClick={handleLogout}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        paddingRight: "0",
                      }}
                    >
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
                {/* )} */}

                {!session.user && isRegisterPage && (
                  <Link href="/auth/login" passHref>
                    <Nav.Link style={{ textDecoration: "none" }}>
                      Login
                    </Nav.Link>
                  </Link>
                )}

                {!session.user && isLoginPage && (
                  <Link href="/auth/register" passHref>
                    <Nav.Link style={{ textDecoration: "none" }}>
                      Register
                    </Nav.Link>
                  </Link>
                )}
              </Nav>
            </Navbar.Collapse>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
