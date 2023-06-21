import { Form, Button } from "react-bootstrap";
import { useRouter } from "next/router";
import { useState } from "react";

import { login } from "@api/services/auth.service";
import useSession from "@api/session";

interface UserModel {
  email: string;
  password: string;
}

const defaultModel: UserModel = {
  email: "",
  password: "",
};

function validateModel(userData: UserModel) {
  const errors: Partial<UserModel> = {
    email: "",
    password: "",
  };

  let isValid = true;

  if (userData.email === "") {
    errors.email = "Email can't be blank";
    isValid = false;
  }

  if (userData.password === "") {
    errors.password = "Password can't be blank";
    isValid = false;
  }

  return { errors, isValid };
}

export default function Login() {
  const session = useSession();
  const [userData, setUserData] = useState<UserModel>(defaultModel);
  const [errors, setErrors] = useState<Partial<UserModel>>(defaultModel);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = validateModel(userData);

    if (!result.isValid) {
      setErrors(result.errors);
      return;
    }

    session.login(userData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  return (
    <>
      <h1>Login</h1>

      <div>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>E-Mail</Form.Label>

            <Form.Control
              placeholder="E-Mail"
              type="email"
              name="email"
              onChange={handleChange}
              value={userData.email}
            />

            {errors.email && <div style={{ color: "red" }}>{errors.email}</div>}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>

            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              value={userData.password}
            />

            {errors.password && (
              <div style={{ color: "red" }}>{errors.password}</div>
            )}
          </Form.Group>

          <Button
            style={{
              display: "flex",
              float: "right",
              marginRight: 0,
            }}
            className="mb-3"
            variant="primary"
            type="submit"
          >
            Login
          </Button>
        </Form>
      </div>
    </>
  );
}
