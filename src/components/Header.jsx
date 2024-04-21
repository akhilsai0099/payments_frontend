import React, { memo } from "react";
import UserIconComp from "./UserIconComp";

const Header = memo(({ user }) => {
  return (
    <>
      <div className="flex justify-between items-center p-8">
        <div className="text-3xl font-bold ">Payments App</div>
        <div className="flex items-center justify-evenly gap-4">
          <p className="text-lg font-medium">Hello, {user}</p>
          <UserIconComp user={user} />
        </div>
      </div>
      <hr />
    </>
  );
});

export default Header;
