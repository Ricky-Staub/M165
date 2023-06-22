import { useState, useEffect } from "react";
import { getAllUsers } from "@api/services/user.service";
import SearchBar from "@components/search/SearchBar";
import { UserType } from "src/types/user.type";
import { deleteTodoById } from "@api/services/todo.service";
import styles from "./Todo.module.css";
import { Card, ListGroup, ListGroupItem, Button } from "react-bootstrap";
import { useRouter } from "next/router";

export default function User() {
  const [users, setUsers] = useState<UserType[]>([]);
  const router = useRouter();

  useEffect(() => {
    getAllUsers().then((response) => {
      setUsers(response);
    });
  }, []);

  return (
    <>
      {users && (
        <div>
          <h1>Users</h1>

          <SearchBar users={users} />

          {users.map((user) => (
            <>
              <Card className={styles.hello}>
                <ListGroup className="list-group-flush">
                  <ListGroupItem>
                    <Card.Title>{`${user.firstName} ${user.lastName}`}</Card.Title>
                  </ListGroupItem>
                </ListGroup>

                <Card.Img
                  variant="top"
                  src={user.profileImage}
                  className="img"
                />

                <Card.Body>
                  <div className={styles.todoContainer}>
                    <Card.Subtitle
                      style={{ alignContent: "right", marginTop: "1rem" }}
                    >
                      <div>{`E-Mail: ${user.email}`}</div>
                      <div
                        style={{ marginTop: "1rem" }}
                      >{`Roles: ${user.roles}`}</div>
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
                          router.push(`/users/${user.id}`);
                        }}
                      >
                        Edit
                      </Button>

                      <Button
                        onClick={() => deleteTodoById(user.id)}
                        style={{ height: "min-content" }}
                        variant="danger"
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </>
          ))}
        </div>
      )}
    </>
  );
}
