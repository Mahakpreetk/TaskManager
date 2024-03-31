import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { notify } from "reapop";
import { useAppDispatch, useAppSelector } from "src/hook/redux";
import { UserCredentials } from "src/models/user";
import { userLogin, userPasswordReset } from "src/store/auth/authService";
import { clearAuthState } from "src/store/auth/authSlice";
import ForgetPasswordModalBody from "../forgot_password/ForgetPasswordModalBody";
import LoginForm from "./LoginForm";
import CustomModal from "src/components/Modal"; // Import CustomModal if not already imported
import { ADRIOT_USER_INFO_KEY } from "src/contants";

const LoginPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { status, message } = useAppSelector((state) => state.auth);
  const [showForgetPasswordModal, setShowForgetPasswordModal] = useState(false);
  const [credentials, setCredentials] = useState<UserCredentials>({
    email_address: "",
    password: "",
  });
  const [resetCredentials, setResetCredentials] = useState<UserCredentials>({
    email_address: "",
    password: "",
  });

  useEffect(() => {
    if (status === "rejected") {
      dispatch(notify(message, "error"));
      dispatch(clearAuthState());
    } else if (status === "fulfilled") {
      dispatch(notify(message, "success"));
      dispatch(clearAuthState());
      setTimeout(() => {
        navigate("/");
      }, 300);
    }
    // eslint-disable-next-line
  }, [status]);

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const { email_address, password } = credentials;
    if (password === "" || email_address === "") {
      return dispatch(notify("Please fill all fields", "error"));
    }

    // Retrieve stored credentials from local storage
    const storedCredentials = localStorage.getItem(ADRIOT_USER_INFO_KEY);
    if (storedCredentials) {
      const { email: storedEmail, password: storedPassword } =
        JSON.parse(storedCredentials);
      // Compare entered credentials with stored credentials
      if (email_address === storedEmail && password === storedPassword) {
        // Dispatch login action
        await dispatch(userLogin({ email_address, password }));
        // Login successful, navigate to home page
        navigate("/");
      } else {
        // Display error message for invalid credentials
        dispatch(notify("Invalid email or password.", "error"));
      }
    } else {
      // Display error message if no stored credentials found
      dispatch(notify("User credentials not found.", "error"));
    }
  };




  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (showForgetPasswordModal) {
      setResetCredentials({ ...resetCredentials, [name]: value });
    } else {
      setCredentials({ ...credentials, [name]: value });
    }
  };

  return (
    <>
      <CustomModal
        show={showForgetPasswordModal}
        title={"Reset Password"}
        body={
          <ForgetPasswordModalBody
            info={resetCredentials}
            onChange={handleInputChange}
          />
        }
        onCancel={() => setShowForgetPasswordModal(false)}
        onProceed={() => {
          if (resetCredentials.password !== resetCredentials.confirm_password) {
            dispatch(notify("Both passwords should match", "error"));
          } else {
            dispatch(userPasswordReset(resetCredentials));
          }
        }}
      />
      <LoginForm
        onSubmit={handleFormSubmit}
        credentials={credentials}
        onForgetPassword={() => setShowForgetPasswordModal(true)}
        onChange={handleInputChange}
        status={status}
      />
    </>
  );
};

export default LoginPage;
