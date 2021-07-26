import React, { useState } from "react";
import "./Header.css";
import logo from "../../assets/logo.svg";
import Modal from "react-modal";
import {
  Button,
  Tabs,
  Tab,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  Paper,
  Grid,
  Form,
} from "@material-ui/core";
import "../../screens/bookshow/BookShow.css";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const LoginForm = () => {
    return (
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        className="grid"
      >
        <Paper className="paper" variant="elevation">
          <div className="login_formControl" id="loginDiv">
            <form action="submit">
              <div className="div_input">
                <FormControl className="formControl" required>
                  <InputLabel htmlFor="email">Email address</InputLabel>
                  <Input
                    id="email"
                    type="email"
                    style={{ padding: 10 }}
                  ></Input>
                </FormControl>
              </div>
              <div className="div_input">
                <FormControl required className="formControl" required>
                  <InputLabel htmlFor="password">Password</InputLabel>
                  <Input
                    id="password"
                    type="password"
                    style={{ padding: 10 }}
                  ></Input>
                </FormControl>
              </div>

              <div className="div_button">
                <Button color="primary" variant="contained" className="button">
                  Login
                </Button>
              </div>
            </form>
          </div>
        </Paper>
      </Grid>
    );
  };

  const RegisterForm = () => {
    const [userRegistration, setUserRegistration] = useState({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      mobile: "",
    });

    const handleInput = (e) => {
      const name = e.target.name;

      const value = e.target.value;

      setUserRegistration({ ...userRegistration, [name]: value });
      console.log(userRegistration);
    };

    async function registerSubmit(e) {
      e.preventDefault();
      try {
        const rawResponse = await fetch("http://localhost:8085/api/v1/signup", {
          body: JSON.stringify(userRegistration),
          method: "POST",
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            "Cache-Control": "no-cache",
          },
        });

        const result = await rawResponse.json();

        if (rawResponse.ok) {
          console.log("success");
          <div>
            <p>Successfully Registered</p>
          </div>;
        } else {
          const error = new Error();
          error.message = result.message || "Something went wrong.";
          throw error;
        }
      } catch (e) {
        console.log(`Error: ${e.message}`);
      }
    }

    async function login(email, password) {
      const param = window.btoa(`${email.value}:${password.value}`);
      try {
        const rawResponse = await fetch(
          "http://localhost:8085/api/v1/auth/login",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json;charset=UTF-8",
              authorization: `Basic ${param}`,
            },
          }
        );

        const result = await rawResponse.json();
        if (rawResponse.ok) {
          window.sessionStorage.setItem("user-details", JSON.stringify(result));
          window.sessionStorage.setItem(
            "access-token",
            rawResponse.headers.get("access-token")
          );
          // window.location.href = './boards.html';
        } else {
          const error = new Error();
          error.message = result.message || "Something went wrong.";
        }
      } catch (e) {
        alert(`Error: ${e.message}`);
      }
    }
    return (
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Paper className="paper">
          <div className="register_formControl" id="registerDiv">
            <div className="div_register_input">
              <form action="submit" onSubmit={registerSubmit}>
                <div>
                  <FormControl className="formControl" required margin="dense">
                    <InputLabel htmlFor="firstname">First Name</InputLabel>
                    <Input
                      required
                      id="firstname"
                      name="firstName"
                      type="text"
                      value={userRegistration.firstName}
                      style={{ padding: 10 }}
                      onChange={handleInput}
                    />
                  </FormControl>
                </div>

                <div>
                  <FormControl className="formControl" required>
                    <InputLabel htmlFor="lastname">Last Name</InputLabel>
                    <Input
                      required
                      id="lastname"
                      name="lastName"
                      value={userRegistration.lastName}
                      style={{ padding: 10 }}
                      onChange={handleInput}
                      validators={["required"]}
                      label="Last Name"
                      errorMessages={["LastName cannot be empty"]}
                    />
                  </FormControl>
                </div>

                <div>
                  <FormControl className="formControl" required>
                    <InputLabel htmlFor="email">Email</InputLabel>
                    <Input
                      required
                      id="email"
                      type="email"
                      name="email"
                      value={userRegistration.email}
                      style={{ padding: 10 }}
                      onChange={handleInput}
                    />
                  </FormControl>
                </div>

                <div>
                  <FormControl className="formControl" required>
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <Input
                      required
                      id="password"
                      type="password"
                      name="password"
                      value={userRegistration.password}
                      style={{ padding: 10 }}
                      onChange={handleInput}
                    />
                  </FormControl>
                </div>

                <div>
                  <FormControl className="formControl" required>
                    <InputLabel htmlFor="phone">Contact No</InputLabel>
                    <Input
                      required
                      id="phone"
                      type="text"
                      name="mobile"
                      value={userRegistration.mobile}
                      style={{ padding: 10 }}
                      onChange={handleInput}
                    />
                  </FormControl>
                </div>

                <div className="div_button">
                  <Button
                    color="primary"
                    variant="contained"
                    className="button"
                    type="submit"
                  >
                    Register
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </Paper>
      </Grid>
    );
  };

  return (
    <div className="header">
      <img src={logo} className="logo"></img>

      <Button color="default" variant="contained" onClick={toggleModal}>
        Login
      </Button>

      <Modal
        isOpen={isOpen}
        onRequestClose={toggleModal}
        contentLabel="My Dialog"
        style={{ width: 20, height: 20 }}
      >
        <Tabs
          indicatorColor="primary"
          textColor="primary"
          aria-label="Login and Register Tabs"
          centered="true"
          onChange={handleChange}
          value={selectedTab}
        >
          <Tab label="Login" />

          <Tab label="Register" />
        </Tabs>
        {selectedTab === 0 && <LoginForm></LoginForm>}
        {selectedTab === 1 && <RegisterForm></RegisterForm>}
      </Modal>
    </div>
  );
};

export default Header;
