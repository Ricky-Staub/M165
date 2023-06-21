import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getTodoById, deleteTodo } from "@api/services/todo.service";
import { Button } from "react-bootstrap";
import Link from "next/link";
import styles from "./index.module.css";
import Image from "next/image";
import useSession from "@api/session";

export default function IdIndexPage() {
  const session = useSession();
  const router = useRouter();
  const { id } = router.query;
  const [todo, setTodo] = useState(null);

  useEffect(() => {
    if (!id) return;

    const loadTodo = async () => {
      const response = await getTodoById(id);
      setTodo(response);
    };
    loadTodo();
  }, [id]);

  async function kill() {
    const resp = await deleteTodo(id, session.accessToken);
    router.push("/");
  }

  return (
    <>
      {todo && (
        <div className={styles.singleTodo}>
          <div key={todo.id}>
            <h1 className={styles.title}>{todo.title}</h1>

            <Image className={styles.image} src={todo.image} alt={todo.title} />

            <div>
              <p className={styles.text}>{todo.description}</p>

              <p className={styles.dateTime}>{`${todo.date} ${todo.time}`}</p>
            </div>

            <div className={styles.btn}>
              <Button onClick={() => router.push("/")}>Back</Button>
            </div>

            <div>
              {session.user?.firstName === todo.firstName && (
                <div>
                  <Link passHref href={`/todos/${todo.id}/edit`}>
                    <Button>Edit</Button>
                  </Link>

                  <Button variant="danger" onClick={kill}>
                    Delete
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
