import useSession from "@api/session";
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import Link from "next/link";
import styles from "./index.module.css";
import Avatar from "@components/header/Avatar";

export default function ProfilePage() {
  const session = useSession();
  const [user, setUser] = useState();

  useEffect(() => {
    setUser(session.user);
  }, [session.user]);

  return (
    <>
      {user && (
        <div>
          <div>
            <h1>ProfilePage</h1>

            <div>
              <div className={styles.profile}>
                <div className={styles.containerImg}>
                  <div className={styles.img}>
                    <Link href="/profile/settings" passHref>
                      <Avatar />
                    </Link>
                  </div>
                </div>

                <h2 style={{ marginLeft: "100px" }}>
                  {user.firstName} {user.lastName}
                </h2>
              </div>

              <Link href="/profile/settings" passHref>
                <Button variant="primary">Settings</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
