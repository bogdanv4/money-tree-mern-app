import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import { useMonth } from "../context/MonthContext";
import Modal from "./Modal";
import Pig from "../components/Pig";
import UserInfo from "../components/UserInfo";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function HomePage() {
  const { currentMonth, setCurrentMonth } = useMonth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUserInfoOpen, setIsUserInfoOpen] = useState(false);
  const [financialData, setFinancialData] = useState([]);
  const [profile, setProfile] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/getme")
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        setProfile(result.user);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get("/api/data/getAll")
      .then((response) => {
        // console.log(response.data.data);
        setFinancialData(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching financial data:", error);
      });
  }, []);

  const totalSavings = financialData.reduce((total, data) => {
    // Check if the data belongs to the current user
    if (data.user === profile._id) {
      return total + data.savings;
    }
    return total;
  }, 0);

  let currentMonthData = financialData.find(
    (data) =>
      data.date.split("/")[0].toLowerCase() ===
        currentMonth
          .toLocaleString("default", { month: "long" })
          .toLowerCase() &&
      data.date.split("/")[1] === currentMonth.getFullYear().toString()
  );

  if (!currentMonthData) {
    currentMonthData = {
      income: 0,
      outcome: 0,
      savings: 0,
      date: `${currentMonth
        .toLocaleString("default", { month: "long" })
        .toLowerCase()}/${currentMonth.getFullYear()}`,
      user: profile._id,
    };
  }

  const handleForward = () => {
    const nextMonth = new Date(currentMonth);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    setCurrentMonth(nextMonth);
  };

  const handleBackward = () => {
    const prevMonth = new Date(currentMonth);
    prevMonth.setMonth(prevMonth.getMonth() - 1);
    setCurrentMonth(prevMonth);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const openUserInfo = () => {
    setIsUserInfoOpen(true);
  };

  const closeUserInfo = () => {
    setIsUserInfoOpen(false);
  };

  const handleModalUpdate = ({ income, outcome, savings }) => {
    const newData = {
      income: parseInt(income, 10),
      outcome: parseInt(outcome, 10),
      savings: parseInt(savings, 10),
      date: `${currentMonth
        .toLocaleString("default", { month: "long" })
        .toLowerCase()}/${currentMonth.getFullYear()}`,
      user: profile._id,
    };

    axios
      .post("/api/data/add", newData)
      .then((response) => {
        setFinancialData((prevData) => [...prevData, newData]);
        setIsModalOpen(false);
        // window.location.reload(); // Naci bolji nacin, da ne refresuje uvek stranicu
      })
      .catch((error) => {
        console.error("Error adding data:", error);
      });
  };

  const handleLogout = () => {
    axios
      .get("/api/logout")
      .then((result) => {
        localStorage.removeItem("token");
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container">
      <nav className="navbar">
        <div className={"navbar-items"}>
          <Button className={"arrow-btn"} onClick={handleLogout}>
            <img src="logout.png" alt="logout" />
          </Button>
        </div>
        <div className={"navbar-items"}>
          <p>Money Tree</p>
        </div>
        <div className={"navbar-items"}>
          <Button className={"arrow-btn"} onClick={openUserInfo}>
            <img src="user.png" alt="user-icon" />
          </Button>
          {isUserInfoOpen && (
            <UserInfo onClose={closeUserInfo} loggedInUser={profile} />
          )}
        </div>
      </nav>
      <div className="main-box">
        <Pig totalSavings={totalSavings} />
        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <td>
                  <Button className={"arrow-btn"} onClick={handleBackward}>
                    <img src="left.png" alt="left arrow" />
                  </Button>
                </td>
                <td>
                  {currentMonth.toLocaleString("default", { month: "long" })}{" "}
                  {currentMonth.getFullYear()}
                </td>
                <td>
                  <Button className={"arrow-btn"} onClick={handleForward}>
                    <img src="right.png" alt="right arrow" />
                  </Button>
                </td>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>
                  <img src="income.png" alt="Income" className="table-icon" />
                </td>
                <td>Income</td>
                <th>
                  {currentMonthData && currentMonthData.user === profile._id
                    ? currentMonthData.income
                    : 0}
                  $
                </th>
              </tr>
              <tr>
                <td>
                  <img src="outcome.png" alt="Outcome" className="table-icon" />
                </td>
                <td>Outcome</td>
                <th>
                  {currentMonthData && currentMonthData.user === profile._id
                    ? currentMonthData.outcome
                    : 0}
                  $
                </th>
              </tr>
              <tr>
                <td>
                  <img src="savings.png" alt="Savings" className="table-icon" />
                </td>
                <td>Savings</td>
                <th>
                  {currentMonthData && currentMonthData.user === profile._id
                    ? currentMonthData.savings
                    : 0}
                  $
                </th>
              </tr>
            </tbody>
          </table>
        </div>
        <Button className={"link-btn left"} onClick={openModal}>
          Enter data
        </Button>
        {isModalOpen && (
          <Modal onClose={closeModal} onUpdate={handleModalUpdate} />
        )}
      </div>
    </div>
  );
}
