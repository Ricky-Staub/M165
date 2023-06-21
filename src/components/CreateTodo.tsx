import styles from "./Todo.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Form, Row, Button } from "react-bootstrap";
import { createTodo, updateTodoById } from "@api/services/todo.service";
import { TodoType } from "src/types/todo.type";
import { useParams } from "react-router-dom";
import useSession from "@api/session";

interface ErrorType {
  title: string;
  description: string;
  image: string;
  date: string;
  time: string;
  userId: string;
}

const defaultModel: TodoType = {
  id: "",
  title: "",
  description: "",
  image: "",
  date: "",
  time: "",
  userId: "",
};

function validateModel(todo: TodoType) {
  const errors: ErrorType = {
    title: "",
    description: "",
    image: "",
    date: "",
    time: "",
    userId: "",
  };

  let isValid = true;

  if (todo.title.trim() === "") {
    errors.title = "Please enter a title";
    isValid = false;
  }

  if (todo.title.trim().length > 40) {
    errors.title = "Please enter a shorter title";
    isValid = false;
  }

  if (todo.description.trim() === "") {
    errors.description = "please enter a description";
    isValid = false;
  }

  if (todo.description.trim().length > 200) {
    errors.description = "please enter a shorter description";
    isValid = false;
  }

  if (
    todo.image === null ||
    todo.image.length === 0 ||
    todo.image === undefined
  ) {
    errors.image = "Please put an todo image";
    isValid = false;
  }

  return { errors, isValid };
}

const toBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export default function CreateTodo() {
  const session = useSession();
  const router = useRouter();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<ErrorType>(defaultModel);
  const [todo, setTodo] = useState<TodoType>(defaultModel);
  const [base64Image, setBase64Image] = useState("");
  const [imagePath, setImagePath] = useState("");
  const today = new Date();
  const date =
    today.getFullYear() + "." + (today.getMonth() + 1) + "." + today.getDate();
  const time = today.getHours() + ":" + today.getMinutes();

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

  const onFileInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];

    if (!file) return;

    const base64 = await toBase64(file);
    setBase64Image(base64);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;

    setTodo({
      ...todo,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setErrors(defaultModel);

    if (todo.id) {
      if (imagePath === null || imagePath === undefined || imagePath === "") {
        if (
          todo.image === "" ||
          todo.image === undefined ||
          todo.image === null
        ) {
          todo.image = imagePath;
        } // } else {
        //   todo.image = todoToEdit!.image;
        // }
      } else {
        todo.image = imagePath;
      }
      const result = validateModel(todo);

      if (!result.isValid) {
        setErrors(result.errors);
        setIsLoading(false);
        return;
      }

      await updateTodoById(todo);
      setTodo(todo);

      router.push(`/todos/${todo.id}`);
    } else {
      todo.image = imagePath;
      todo.date = date;
      todo.time = time;
      todo.userId = session.user.id;

      const result = validateModel(todo);

      if (!result.isValid) {
        setErrors(result.errors);
        setIsLoading(false);
        return;
      }

      await createTodo(todo);
      router.push("/");
    }

    setIsLoading(false);
  };

  return (
    <>
      <div>
        <Form onSubmit={handleSubmit}>
          <h1>Create todo</h1>

          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Title</Form.Label>

            <Form.Control
              placeholder="Title"
              name="title"
              defaultValue={todo.title}
              onChange={handleChange}
            />

            {errors.title && <div style={{ color: "red" }}>{errors.title}</div>}
          </Form.Group>

          <Form.Group controlId="formFileMultiple" className="mb-3">
            <Form.Label>Pictures: </Form.Label>

            {/* {todoToEdit && (
              <img
                src={todoToEdit.image}
                style={{ height: "100%", width: "100%" }}
              />
            )} */}

            <Form.Control
              type="file"
              defaultValue={todo.image}
              onChange={onFileInputChange}
              name="todoImage"
            />

            {errors.image && <div style={{ color: "red" }}>{errors.image}</div>}
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Description</Form.Label>

            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              defaultValue={todo.description}
              onChange={handleChange}
            />

            {errors.description && (
              <div style={{ color: "red" }}>{errors.description}</div>
            )}
          </Form.Group>

          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formPlaintextEmail"
          ></Form.Group>

          <div className={styles.btn}>
            <Button
              className={styles.button}
              onClick={() => router.push("/todos")}
            >
              Back
            </Button>

            <Button variant="primary" type="submit">
              Create
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
}
