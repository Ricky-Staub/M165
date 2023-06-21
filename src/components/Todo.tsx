import Link from "next/link";
import { useEffect, useState } from "react";
import { Button, ListGroup, ListGroupItem, Card } from "react-bootstrap";

import todoService, { getAllTodos } from "@api/services/todo.service";
import { TodoType } from "src/types/todo.type";
import styles from "./Todo.module.css";
import { useRouter } from "next/router";

export default function Todo() {
  const router = useRouter();
  const [todos, setTodos] = useState<TodoType[]>([]);
  // const [user, setUser] = useState<UserType>();

  // function handleGetUsersName(id: string) {
  //   userService.getUserById(id).then((response) => {
  //     setUser(response);
  //   });
  // }

  function deleteTodoById(id: string) {
    todoService.deleteTodoById(id);
  }

  useEffect(() => {
    getAllTodos().then((response) => {
      setTodos(response.reverse());
    });
  }, []);

  return (
    <>
      <div className={styles.todos}>
        {/* {session.user && */}
        {todos.map((todo) => {
          return (
            <Link href={`/todos/${todo.id}`} key={todo.id} passHref>
              <div key={todo.id}>
                <Card className={styles.hello}>
                  <ListGroup className="list-group-flush">
                    <ListGroupItem>
                      <Card.Title>{todo.title}</Card.Title>
                    </ListGroupItem>
                  </ListGroup>

                  <Card.Img variant="top" src={todo.image} className="img" />

                  <Card.Body>
                    {/* {session.user.id == todo.userId ? (
                      <Link passHref href={`/profile`}>
                        <div>
                          <div className={styles.profile}>
                            <Avatar />

                            {`${session.user.firstName} ${session.user.lastName}`}
                          </div>
                        </div>
                      </Link>
                    ) : (
                      <Link
                        passHref
                        href={`/users/${todo.userId}`}
                        onClick={() => handleGetUsersName(todo.userId)}
                      >
                        <div>
                          <div className={styles.profile}>
                            <Avatar />

                            {`${user.firstName} ${user.lastName}`}
                          </div>
                        </div>
                      </Link>
                    )} */}

                    <div className={styles.todoContainer}>
                      <Card.Subtitle
                        style={{ alignContent: "right", marginTop: "1rem" }}
                      >
                        <div>{`Creation date: ${todo.date}`}</div>
                        <div
                          style={{ marginTop: "1rem" }}
                        >{`Creation time: ${todo.time}`}</div>
                      </Card.Subtitle>

                      <div
                        style={{
                          marginTop: "1rem",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <Button
                          style={{ height: "min-content" }}
                          variant="primary"
                          onClick={() => {
                            router.push(`/todos/${todo.id}`);
                          }}
                        >
                          Edit
                        </Button>

                        <Button
                          onClick={() => deleteTodoById(todo.id)}
                          style={{ height: "min-content" }}
                          variant="danger"
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}
