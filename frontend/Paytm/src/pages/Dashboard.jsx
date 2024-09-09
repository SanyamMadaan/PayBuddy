import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Balance } from "../Components/Balance";
import { Appbar } from "../Components/Appbar";
import { Userlist } from "../Components/Userlist";
import { useNavigate } from "react-router-dom";

export function Dashboard() {
  const [balance, setBalance] = useState(0);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBalance();
  }, [balance]); // Run only once on initial render

  async function fetchBalance() {
    try {
      const token = localStorage.getItem('authorization');
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/account/balance`, {
        headers: {
          Authorization: token
        }
      });
      let bal = parseFloat(parseFloat(response.data.balance).toFixed(2));

      setBalance(bal);
    } catch (error) {
      setError(error.response?.data?.msg || "An error occurred while fetching balance.");
    }
  }


  return (
    <>
      {
        error ? (
          <h2 className="text-red-800">{error}</h2>
        ) : (
          <div>
            <Appbar />
            <Balance balance={balance} />
            <Userlist />
          </div>
        )
      }
    </>
  );
}
