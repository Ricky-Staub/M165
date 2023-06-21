import { Form, Button } from "react-bootstrap";
import { useState, useEffect, ChangeEvent } from "react";
import { useRouter } from "next/router";
import { login, register } from "@api/services/auth.service";
import useSession from "@api/session";

interface UserModel {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  profileImage: string;
}

const toBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const defaultModel: UserModel = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  profileImage: "",
};

function validateModel(user: UserModel) {
  const errors: Partial<UserModel> = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    profileImage: "",
  };

  let isValid = true;

  if (user.firstName === "" || user.firstName === null) {
    errors.firstName = "Please enter a first name";
    isValid = false;
  }

  if (user.lastName === "" || user.firstName === null) {
    errors.lastName = "Please enter a last name";
    isValid = false;
  }

  if (user.email === "" || user.email === null) {
    errors.email = "Please enter an email";
    isValid = false;
  }

  if (user.password === "" || user.password === null) {
    errors.password = "Please enter a password";
    isValid = false;
  }

  return { errors, isValid };
}

export default function Register() {
  const session = useSession();
  const [user, setUser] = useState<UserModel>(defaultModel);
  const [errors, setErrors] = useState<Partial<UserModel>>(defaultModel);
  const [base64Image, setBase64Image] = useState<string>("");
  const [imagePath, setImagePath] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setErrors(defaultModel);

    user.profileImage = imagePath;

    const result = validateModel(user);

    if (!result.isValid) {
      setErrors(result.errors);
      return;
    }

    register(user).then((response) => {
      session.login(response);
    });
  };

  const onFileInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const base64 = await toBase64(file);
    setBase64Image(base64);
  };

  useEffect(() => {
    if (!base64Image) return;

    const uploadImage = async () => {
      const response = await fetch("/api/upload", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          base64Image,
        }),
      });

      const data = await response.json();
      setImagePath(data.filePath);
    };
    uploadImage();
  }, [base64Image]);

  return (
    <>
      <h1>Register</h1>

      <Form onSubmit={submit}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>First name</Form.Label>

          <Form.Control
            name="firstName"
            onChange={handleChange}
            value={user.firstName}
          />

          {errors.firstName && (
            <div style={{ color: "red" }}>{errors.firstName}</div>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Last name</Form.Label>

          <Form.Control
            name="lastName"
            onChange={handleChange}
            value={user.lastName}
          />

          {errors.lastName && (
            <div style={{ color: "red" }}>{errors.lastName}</div>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>E-Mail</Form.Label>

          <Form.Control
            type="email"
            name="email"
            onChange={handleChange}
            value={user.email}
          />

          {errors.email && <div style={{ color: "red" }}>{errors.email}</div>}
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Password</Form.Label>

          <Form.Control
            type="password"
            name="password"
            onChange={handleChange}
            value={user.password}
          />

          {errors.password && (
            <div style={{ color: "red" }}>{errors.password}</div>
          )}
        </Form.Group>

        <Form.Group controlId="formFileMultiple" className="mb-3">
          <Form.Label>Profile image</Form.Label>

          <Form.Control
            type="file"
            onChange={onFileInputChange}
            name="profileImage"
          />
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
          Register
        </Button>
      </Form>
    </>
  );
}
