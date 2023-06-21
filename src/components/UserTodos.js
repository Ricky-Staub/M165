import { Card } from "react-bootstrap";
import styles from "./YourTodos.module.css";
import { useState, useEffect } from "react";
import { getAllTodos } from "@api/services/todo.service";
import Link from "next/link";

export default function UserTodos({ session, user }) {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const loadTodos = async () => {
      const response = await getAllTodos();
      setTodos(response);
    };
    loadTodos();
  }, []);

  return (
    <>
      <div className={styles.container}>
        {todos.map((todo) => {
          return (
            <div key={todo.id}>
              {user?.firstName === todo.user && (
                <Link passHref href={`/todos/${todo.id}`}>
                  <Card className={styles.card}>
                    <Card.Img className={styles.img} src={todo.img} />

                    <Card.Header>{todo.title}</Card.Header>
                  </Card>
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}
