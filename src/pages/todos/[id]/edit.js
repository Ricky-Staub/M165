/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Todo from "@components/Todo";

export default function edit({ session }) {
  const router = useRouter();
  const { id } = router.query;
  const [todo, setTodo] = useState(null);

  useEffect(() => {
    const load = async () => {
      const data = await getTodoById(id);
      setTodo(data);
    };
    load();
  }, [id]);

  return (
    <>
      <Todo session={session} todoToEdit={todo} />
    </>
  );
}
