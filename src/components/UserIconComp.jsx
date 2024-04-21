import React from "react";

const UserIconComp = ({ user }) => {
  return (
    <div className="rounded-[50%] h-8 w-8 bg-gray-400 flex items-center justify-center text-center">
      {user[0].toUpperCase()}
    </div>
  );
};

export default UserIconComp;
