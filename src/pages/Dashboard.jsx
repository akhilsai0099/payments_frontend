import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import BalanceComp from "../components/BalanceComp";
import UsersComp from "../components/UsersComp";
import axios from "axios";

const Dashboard = () => {
  const user = localStorage.getItem("username");
  const [balance, setBalance] = useState(0);
  const token = localStorage.getItem("token");
  const fetchBalance = async () => {
    const res = await axios.get(
      "http://localhost:3000/api/v1/accounts/balance",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setBalance(res.data.balance.toFixed(2));
  };

  useEffect(() => {
    fetchBalance();
    const intervalId = setInterval(fetchBalance, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <Header user={user} />
      <BalanceComp balance={balance} />
      <UsersComp fetchBalance={fetchBalance} />
    </div>
  );
};

export default Dashboard;
