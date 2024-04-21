import axios from "axios";
import { useState } from "react";

export const SendMoney = ({ name, id, toggleModel, fetchBalance }) => {
  const token = localStorage.getItem("token");
  const [amount, setAmount] = useState(0);
  const handleTransfer = async () => {
    try {
      const res = await axios.post(
        `${
          import.meta.env.VITE_REACT_APP_BACKEND_URL
        }/api/v1/accounts/transfer`,
        {
          amount: amount,
          to: id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        toggleModel();
        setAmount(0);
        fetchBalance();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="absolute top-0 left-0 flex justify-center h-screen w-screen bg-gray-100 bg-opacity-80"
      onClick={() => toggleModel()}
    >
      <div className="flex flex-col justify-center">
        <div
          className="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col space-y-1.5 p-6">
            <h2 className="text-3xl font-bold text-center">Send Money</h2>
          </div>
          <div className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                <span className="text-2xl text-white">A</span>
              </div>
              <h3 className="text-2xl font-semibold">{name}</h3>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="amount"
                >
                  Amount (in Rs)
                </label>
                <input
                  type="number"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  id="amount"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(parseFloat(e.target.value))}
                />
              </div>
              <button
                onClick={handleTransfer}
                className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white"
              >
                Initiate Transfer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
