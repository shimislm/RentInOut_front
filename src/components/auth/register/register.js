import React from 'react'
import { useState } from 'react';
import { useForm } from "react-hook-form"
import { useNavigate } from 'react-router-dom';
import { API_URL, doApiMethod } from '../../../services/service';
import { Wrapper, Button } from '../../style/wrappers/registerPage';

const Register = () => {
    const nav = useNavigate();
    let { register, getValues, handleSubmit, formState: { errors } } = useForm();
    const regEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const [isRegister, setIsRegister] = useState(true)
    const onSub = (_dataBody) => {
        delete _dataBody.password2
        delete _dataBody.email2
        let user = {
            fullName: {
                firstName: _dataBody.firstName,
                lastName: _dataBody.lastName
            }, email: _dataBody.email, password: _dataBody.password
        }
        doApi(user)
    }
    const doApi = async (_dataBody) => {
        try {
            const url = API_URL + '/users'
            const { data } = await doApiMethod(url, "POST", _dataBody);
            console.log(data);
            if (data.user) {
                nav('/login')
            }
        }
        catch (err) {
            console.log(err.response);
        }
    }
    const handleClick = () => {
        setIsRegister(!isRegister)
    }
    return (
        <Wrapper>
            <div className="inside_box">
                <div className="left w-full md:w-1/3">
                    <div className="loginButton google">
                        <img src={"./img/google.png"} alt="" className="icon" />
                        Google
                    </div>
                    <div className="loginButton facebook" >
                        <img src={"./img/facebook.png"} alt="" className="icon" />
                        Facebook
                    </div>
                </div>
                <div className="right w-full md:w-2/3">
                    <h1 className='text-center text-2xl mb-3'>{isRegister ? "Register" : "Login"}</h1>
                    <form onSubmit={handleSubmit(onSub)}>
                        <div className="flex flex-wrap -mx-3 mb-2" style={{ display: isRegister ? 'flex' : 'none' }}>
                            <div className="w-full md:w-1/2 px-3 mb-2 md:mb-0">
                                <label>
                                    First Name
                                </label>
                                <input {...register('firstName', { required: true, minLength: 2, maxLength: 25 })} type="text" placeholder="Shimon" />
                                {errors.firstName && <small>Enter valid name.</small>}
                            </div>
                            <div className="w-full md:w-1/2 px-3">
                                <label >
                                    Last Name
                                </label>
                                <input {...register('lastName', { required: true, minLength: 2, maxLength: 25 })} type="text" placeholder="Doe" />
                                {errors.lastName && <small>Enter valid last name.</small>}
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-2">
                            <div className="w-full px-3">
                                <label>
                                    Email
                                </label>
                                <input {...register('email', { required: true, minLength: 2, maxLength: 25, pattern: regEmail })} type="email" placeholder="example@email.com" />
                                {errors.email && <small>Please fill valid email.</small>}
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-2" style={{ display: isRegister ? 'flex' : 'none' }}>
                            <div className="w-full px-3">
                                <label>
                                    Confirm Email
                                </label>
                                <input {...register('email2', { required: true, validate: (value) => { return value === getValues('email') } })} type="email" placeholder="example@email.com" />
                                {errors.email2 && <small>Email not match.</small>}
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-2">
                            <div className={isRegister ? "w-full md:w-1/2 px-3" : " w-full px-3"}>
                                <label>
                                    Password
                                </label>
                                <input {...register("password", { required: true, minLength: 6, maxLength: 25 })} type="password" placeholder="******************" />
                                {errors.password && <small>Please fill out this field.</small>}
                            </div>
                            <div className="w-full md:w-1/2 px-3" style={{ display: isRegister ? 'block' : 'none' }}>
                                <label>
                                    Confirm Password
                                </label>
                                <input {...register('password2', { required: true, validate: (value) => { return value === getValues('password') } })} type="password" placeholder="******************" />
                                {errors.password2 && <small>Password dont match.</small>}
                            </div>
                        </div>
                        <div className="flex flex-wrap mb-2 -mx-3" style={{ display: isRegister ? 'flex' : 'none' }}>
                            <div className=" w-1/3 px-2">
                                <label>
                                    Birthdate
                                </label>
                                <div className="flex relative bottom-3 items-center pl-3 pointer-events-none">
                                    <svg aria-hidden="true" className=" absolute top-6 w-5 h-4 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path></svg>
                                </div>
                                <input datepicker type="text" className="datepicker-input" placeholder="Select date" />
                            </div>
                            <div className="w-1/2 md:w-1/3 px-2 mb-2 md:mb-0">
                                <label>
                                    Phone
                                </label>
                                <input {...register('phone', { required: true, minLength: 2, maxLength: 11, pattern: /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g })} type="tel" placeholder="123-45-678" />
                                {errors.phone && <small>Enter valid phone.</small>}
                            </div>
                            <div className="w-1/2 md:w-1/3 px-2 mb-2 md:mb-0">
                                <label for="countries">Select your country</label>
                                <select id="countries" className='input'>
                                    <option selected>Country</option>
                                    <option value="US">United States</option>
                                    <option value="CA">Canada</option>
                                    <option value="FR">France</option>
                                    <option value="DE">Germany</option>
                                </select>
                            </div>
                        </div>
                        <Button>
                            <button>Submit</button>
                        </Button>
                        <span>{isRegister ? "Already a member ?" : "Not a member yet ?"} <button onClick={handleClick} className='underline text-blue-400 hover:text-blue-700'>click here</button> </span>
                    </form>
                </div>
            </div>
        </Wrapper>
    )
}

export default Register