import React, { memo, useState } from "react";
import UserIconComp from "./UserIconComp";
import { SendMoney } from "./SendMoney";

const UserComp = memo(({ firstName, lastName, id, fetchBalance }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModel = () => {
    setIsModalOpen(!isModalOpen);
  };
  return (
    <div className="flex justify-between">
      <div className="flex gap-4">
        <UserIconComp user={firstName} />
        <p className="text-2xl font-semibold">
          {firstName} {lastName}
        </p>
      </div>
      <div>
        <button
          onClick={toggleModel}
          className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-md"
        >
          Send Money
        </button>
        {isModalOpen ? (
          <SendMoney
            fetchBalance={fetchBalance}
            name={firstName}
            id={id}
            toggleModel={setIsModalOpen}
          />
        ) : null}
      </div>
    </div>
  );
});

export default UserComp;
