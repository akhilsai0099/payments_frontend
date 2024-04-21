import React, { useEffect, useState } from "react";

const BalanceComp = ({ balance }) => {
  return (
    <div className="p-8">
      <p className="text-2xl font-bold">Your Balance ${balance}</p>
    </div>
  );
};

export default BalanceComp;
