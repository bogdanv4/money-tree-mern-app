import { useState } from "react";
import Percentage from "../components/Percentage";
import RegisterForm1 from "../components/RegisterForm1";
import RegisterForm2 from "../components/RegisterForm2";
import RegisterForm3 from "../components/RegisterForm3";
import RegisterForm4 from "../components/RegisterForm4";
// import users from "../data/users";
import axios from "axios";

export default function Register() {
  const [step, setStep] = useState(1);
  const [form1Completed, setForm1Completed] = useState(false);
  const [form2Completed, setForm2Completed] = useState(false);
  const [form3Completed, setForm3Completed] = useState(false);
  const [form4Completed, setForm4Completed] = useState(false);

  const [userData, setUserData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    date: "",
    username: "",
    address: "",
    sex: "",
    phoneNumber: "",
  });

  const handleForm1Completion = (data) => {
    setForm1Completed(true);
    setUserData((prevData) => ({ ...prevData, ...data }));
    setStep(step + 1);
  };

  const handleForm2Completion = (data) => {
    setForm2Completed(true);
    setUserData((prevData) => ({ ...prevData, ...data }));
    setStep(step + 1);
  };

  const handleForm3Completion = (data) => {
    setForm3Completed(true);
    setUserData((prevData) => ({ ...prevData, ...data }));
    setStep(step + 1);
  };

  const handleForm4Completion = async () => {
    // setForm4Completed(true);
    // users.push(userData);
    // setLoggedInUser(userData);
    // setStep(step + 1);
    try {
      const signUser = await axios.post("/api/signup", userData);
      console.log(signUser);
      if ((signUser.data.success = true)) {
        setUserData({
          email: "",
          password: "",
          firstName: "",
          lastName: "",
          date: "",
          username: "",
          address: "",
          sex: "",
          phoneNumber: "",
        });

        setForm4Completed(true);
        setStep(step + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <div className="main-box">
        <Percentage step={step} />
        {step === 1 && <RegisterForm1 onNext={handleForm1Completion} />}
        {step === 2 && <RegisterForm2 onNext={handleForm2Completion} />}
        {step === 3 && <RegisterForm3 onNext={handleForm3Completion} />}
        {step === 4 && <RegisterForm4 onNext={handleForm4Completion} />}
      </div>
    </div>
  );
}
