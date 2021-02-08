import React, { useState } from "react";
import "./signup.scss";
import { auth, createUserOnFirebase } from "../../firebase/firebase.config";
import CustomButton from "../custom-button/CustomButton";
import FormInput from "../form-input/FormInput";

const SignUp = () => {
  const [currentUser, setCurrentUser] = useState({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e) => {
    console.log("submit");
    e.preventDefault();
    const { displayName, email, password, confirmPassword } = currentUser;
    if (password !== confirmPassword) {
      alert("Passwords dont match!");
      return;
    }
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      await createUserOnFirebase({ ...user, displayName });
      setCurrentUser({
        displayName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentUser({ ...currentUser, [name]: value });
  };
  const { displayName, email, password, confirmPassword } = currentUser;
  return (
    <div className="sign-up">
      <h2>I do not have account</h2>
      <span className="title">Sign up with your email and password</span>
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <FormInput
          type="text"
          name="displayName"
          label="Display Name"
          value={displayName}
          onChange={handleChange}
          required
        />
        <FormInput
          type="email"
          name="email"
          label="Email"
          value={email}
          onChange={handleChange}
          required
        />
        <FormInput
          type="password"
          name="password"
          label="Password"
          value={password}
          onChange={handleChange}
          required
        />
        <FormInput
          type="password"
          name="confirmPassword"
          label="Confirm Password"
          value={confirmPassword}
          onChange={handleChange}
          required
        />
        <CustomButton type="submit">Sign up</CustomButton>
      </form>
    </div>
  );
};

export default SignUp;
