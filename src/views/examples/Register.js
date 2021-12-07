/*!

=========================================================
* Argon Dashboard React - v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// reactstrap components
import useAuth from "hooks/useAuth";
import { useState } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";

const Register = () => {
  const { user, registerUser, logOut } = useAuth();

  const [userData, setUserData] = useState({});

  const handleUserInput = (e) => {
    const field = e.target.name;
    const value = e.target.value;

    const newUserData = { ...userData };
    newUserData[field] = value;

    setUserData(newUserData);
  };

  const handleRegisterUser = (e) => {
    e.preventDefault();

    registerUser(userData.userEmail, userData.userPassword, userData.userName);
  };

  return (
    <>
      <Col lg="6" md="8">
        <Card className="border-0 shadow bg-secondary">
          <CardHeader className="pb-5 bg-transparent">
            <div className="mt-2 mb-4 text-center text-muted">
              <small>Sign up with</small>
            </div>
            <div className="text-center">
              <Button
                className="mr-4 btn-neutral btn-icon"
                color="default"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                <span className="btn-inner--icon">
                  <img
                    alt="..."
                    src={
                      require("../../assets/img/icons/common/github.svg")
                        .default
                    }
                  />
                </span>
                <span className="btn-inner--text">Github</span>
              </Button>
              <Button
                className="btn-neutral btn-icon"
                color="default"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                <span className="btn-inner--icon">
                  <img
                    alt="..."
                    src={
                      require("../../assets/img/icons/common/google.svg")
                        .default
                    }
                  />
                </span>
                <span className="btn-inner--text">Google</span>
              </Button>
            </div>
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            <div className="mb-4 text-center text-muted">
              <small>Or sign up with credentials</small>
            </div>
            <Form role="form" onSubmit={handleRegisterUser}>
              <FormGroup>
                <InputGroup className="mb-3 input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-hat-3" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Name"
                    type="text"
                    name="userName"
                    required
                    onBlur={handleUserInput}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="mb-3 input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Email"
                    type="email"
                    name="userEmail"
                    autoComplete="new-email"
                    required
                    onBlur={handleUserInput}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Password"
                    type="password"
                    name="userPassword"
                    autoComplete="new-password"
                    required
                    onBlur={handleUserInput}
                  />
                </InputGroup>
              </FormGroup>
              <div className="text-muted font-italic">
                <small>
                  password strength:{" "}
                  <span className="text-success font-weight-700">strong</span>
                </small>
              </div>
              <Row className="my-4">
                <Col xs="12">
                  <div className="custom-control custom-control-alternative custom-checkbox">
                    <input
                      className="custom-control-input"
                      id="customCheckRegister"
                      type="checkbox"
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="customCheckRegister"
                    >
                      <span className="text-muted">
                        I agree with the{" "}
                        <a href="#pablo" onClick={(e) => e.preventDefault()}>
                          Privacy Policy
                        </a>
                      </span>
                    </label>
                  </div>
                </Col>
              </Row>
              <div className="text-center">
                <Button
                  disabled={user.email ? true : false}
                  className="mt-4"
                  color="primary"
                  type="submit"
                >
                  Create account
                </Button>
              </div>
            </Form>
            <div className="text-center">
              {user.email && (
                <Button
                  onClick={logOut}
                  className="mt-4"
                  color="primary"
                  type="submit"
                >
                  Log out
                </Button>
              )}
            </div>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default Register;
