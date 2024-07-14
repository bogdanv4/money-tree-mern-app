import { useState } from "react";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

export default function RegisterForm4({ onNext }) {
  const [agreed, setAgreed] = useState(false);
  const navigate = useNavigate();

  const handleAgreementChange = (e) => {
    setAgreed(e.target.checked);
  };

  const handleNext = () => {
    alert("User created");
    onNext(navigate("/"));
  };

  return (
    <form className="register-form">
      <div className="terms-text">
        <textarea
          readOnly
          className="scrolling-text-box"
          value={` Welcome to our website! These terms and conditions outline the rules and regulations for the use of our website, located at example.com.
By accessing this website we assume you accept these terms and conditions. Do not continue to use our website if you do not agree to take all of the terms and conditions stated on this page. 

Cookies
We employ the use of cookies. By accessing our website, you agreed to use cookies in agreement with our Privacy Policy.

Intellectual Property
All trademarks, service marks, and logos used in this website are the property of their respective owners.
        
Restrictions
 You are specifically restricted from all of the following:
        
- Publishing any website material in any other media;
- Selling, sublicensing, and/or otherwise commercializing any website material;
- Publicly performing and/or showing any website material;
- Using this website in any way that is or may be damaging to this website;
- Using this website in any way that impacts user access to this website;
- Using this website contrary to applicable laws and regulations, or in any way may cause harm to the website, or to any person or business entity;
- Engaging in any data mining, data harvesting, data extracting, or any other similar activity in relation to this website;
        
This Agreement shall begin on the date hereof.
We reserve the right to remove any users found to be infringing on our terms and conditions.      
          `}
        />
      </div>
      <div className="agreement-checkbox">
        <input
          type="checkbox"
          id="agreement-checkbox"
          checked={agreed}
          onChange={handleAgreementChange}
        />
        <label htmlFor="agreement-checkbox">
          I agree to the terms and conditions
        </label>
      </div>
      <Button className={"submit-btn"} onClick={handleNext}>
        Finish
      </Button>
    </form>
  );
}
