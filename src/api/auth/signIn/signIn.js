import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { doApiMethod, successHandler } from "../../../services/axios-service/axios-service";
import { onLogin } from "../../../redux/features/userSlice";
import { onLogout } from "../../../redux/features/toggleSlice";
import { errorHandler } from "../../../services/axios-service/axios-service";
import { Button } from "../../../assets/styles/wrappers/registerPage";
import LoadingButton from '../../../shared/components/spinner-button/spinnerButton';
import OpenEye from "../../../assets/icons/openEye";
import { eyeShowHide } from "../../../services/cloudinary-service/cloudinary-service";
import CloseEye from "../../../assets/icons/closeEye";

const SignIn = (props) => {
  const regEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  const [load, setLoad] = useState(false);
  const [show, setShow] = useState(false);
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const nav = useNavigate();

  const onSub = (_dataBody) => {
    setLoad(true)
    let login = {
      email: _dataBody.email,
      password: _dataBody.password,
    };
    loginRequest(login);
  };
  const loginRequest = async (_dataBody) => {
    try {
      const url = "/users/login";
      const { data } = await doApiMethod(url, "POST", _dataBody);
      localStorage.setItem("token", JSON.stringify(data.token));
      if (data.user) {
        dispatch(onLogin(data.user));
      }
      if (data.user.role === "admin") {
        dispatch(onLogout());
        nav("/admin");
      } else {
        dispatch(onLogout());
        nav("/");
      }
      setLoad(false)
      successHandler("Log In successfully!!!");
    } catch (err) {
      setLoad(false)
      errorHandler(err.response.data.msg);
    }
  };
  return (
    <div className="right w-full md:w-2/3">
      <form onSubmit={handleSubmit(onSub)}>
        <div className="flex flex-wrap -mx-3 mb-2">
          <div className="w-full px-3">
            <label>Email</label>
            <input
              {...register("email", {
                required: true,
                minLength: 2,
                maxLength: 25,
                pattern: regEmail,
              })}
              type="email"
              placeholder="example@email.com"
            />
            {errors.email && <small>Please fill valid email.</small>}
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-2">
          <div className="w-full px-3">
            <label><span className="mr-2">Password</span>
              <button
                type="button"
                onClick={() => {
                  props.setState("mailPass");
                }}
                className="text-blue-400 hover:text-blue-700"
              >
                Forgot Password ?
              </button></label>
            <div id="password">
              <input
                id="passInput"
                {...register("password", {
                  required: true,
                  minLength: 6,
                  maxLength: 25,
                })}
                type="password"
                placeholder="********"
              />
              <div className="cursor-pointer" onClick={()=>eyeShowHide(setShow)}> 
                {show ? <OpenEye /> : <CloseEye/>}
              </div>
            </div>
            {errors.password && (
              <small>
                Please fill out valid password (Upper/Lowercase , Number
                ,Special characters)
              </small>
            )}
          </div>
        </div>
        <Button >
          <LoadingButton isLoading={load}>Sign In</LoadingButton>
        </Button>
      </form>
      <span className="flex items-center justify-center">
        Not a member ?
        <button
          type="button"
          onClick={() => {
            props.setState("signUp");
          }}
          className="ml-2 text-blue-400 hover:text-blue-700"
        >
          Signup now
        </button>
      </span>
      <br />
    </div>
  );
};

export default SignIn;
