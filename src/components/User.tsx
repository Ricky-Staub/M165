import useSession from "@api/session";
import { useState, useEffect } from "react";
import { getAllUsers } from "@api/services/user.service";
import SearchBar from "@components/search/SearchBar";

export default function User() {
  const [users, setUsers] = useState();

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
        </div>
      )}
    </>
  );
}
