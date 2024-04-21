import React, { useEffect, useState, memo } from "react";
import axios from "axios";
import UserComp from "./UserComp";
const UsersComp = memo(({ fetchBalance }) => {
  const [filter, setFilter] = useState("");
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("token");
  const fetchUsers = async () => {
    let url = `http://localhost:3000/api/v1/user/bulk?filter=${filter}`;
    try {
      const response = await axios.post(
        url,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUsers(response.data.users);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [filter]);

  return (
    <div className="flex flex-col gap-6 p-8">
      <div className="text-2xl font-bold">Users</div>
      <div>
        <input
          type="text"
          placeholder="Search Users..."
          className="w-full bg-white border-2 border-gray-200 rounded px-4 py-3"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-4">
        {users.map((user) => (
          <>
            <UserComp
              key={user.id}
              username={user.firstName}
              id={user.id}
              fetchBalance={fetchBalance}
            />
            <hr />
          </>
        ))}
      </div>
    </div>
  );
});

export default UsersComp;
