import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getUserById } from "@api/services/user.service";
import UserTodos from "@components/UserTodos";
import Link from "next/link";
import styles from "./index.module.css";
import Avatar from "@components/header/Avatar";
import useSession from "@api/session";

export default function IdIndexPage() {
  const session = useSession();
  const router = useRouter();
  const { id } = router.query;
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!id) return;

    const loadUser = async () => {
      const response = await getUserById(id);
      setUser(response);
    };
    loadUser();
  }, [id]);

  return (
    <>
      {user && (
        <div>
          <div>
            <h1>Your profile</h1>

            <div>
              <div className={styles.profile}>
                <div className={styles.img}>
                  <Link href="/profile/settings" passHref>
                    <Avatar />
                  </Link>
                </div>

                <h2 style={{ marginLeft: "100px" }}>
                  {user.firstName} {user.lastName}
                </h2>
              </div>
            </div>
          </div>

          <h1>Todos</h1>

          <UserTodos session={session} user={user} />
        </div>
      )}
    </>
  );
}
