import React, { useState } from "react";
import CustomButton from "../custom-button/CustomButton";
import FormInput from "../form-input/FormInput";
import "./signin.scss";
import { auth, signInwithGoogle } from "../../firebase/firebase.config";

const SignIn = () => {
  const [currentUser, setCurrentUser] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = currentUser;
    try {
      await auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.log(error);
    }
    setCurrentUser({ email: "", password: "" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentUser({ ...currentUser, [name]: value });
  };
  const { email, password } = currentUser;
  return (
    <div onSubmit={handleSubmit}>
      <h2>I already have an account</h2>
      <span className="title">Sign in with your email and password</span>
      <form>
        <FormInput
          name="email"
          type="email"
          value={email}
          handleChange={handleChange}
          label="email"
          required
        />
        <FormInput
          name="password"
          type="password"
          value={password}
          handleChange={handleChange}
          label="password"
          required
        />
        <div className="buttons">
          <CustomButton type="submit">Sign in</CustomButton>
          <CustomButton
            type="button"
            onClick={signInwithGoogle}
            isGoogleSignIn={true}
          >
            Sign In With Google
          </CustomButton>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
