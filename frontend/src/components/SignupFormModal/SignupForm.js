import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";

function SignupForm() {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState([]);

    if (sessionUser) return <Redirect to="/" />;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            setErrors([]);
            return dispatch(sessionActions.signupThunk({ email, username, password, firstName, lastName }))
                .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                });
        }
        return setErrors(['Confirm Password field must be the same as the Password field']);
    };

    return (
        <div className='form-wrapper'>
            <form onSubmit={handleSubmit} className='form'>
                <div className='top-bar'>
                    <h4 id='form-header-1'>Sign up</h4>
                </div>
                <h3 id='form-header-2'>Welcome to BearBNB</h3>
                {errors.length > 0 && <ul>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>}
                <div className='input-wrapper'>
                    <label className='input-label'>
                        First Name
                    </label>
                    <input
                        type="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                        className='form-input'
                    />
                </div>
                <div className='input-wrapper'>
                    <label className='input-label'>
                        Last Name
                    </label>
                    <input
                        type="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                        className='form-input'
                    />
                </div>
                <div className='input-wrapper'>
                    <label className='input-label'>
                        Email
                    </label>
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className='form-input'
                    />
                </div>
                <div className='input-wrapper'>
                    <label className='input-label'>
                        Username
                    </label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className='form-input'
                    />
                </div>
                <div className='input-wrapper'>
                    <label className='input-label'>
                        Password
                    </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className='form-input'
                    />
                </div>
                <div className='input-wrapper'>
                    <label className='input-label'>
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className='form-input'
                    />
                </div>
                <div className='input-wrapper'>
                    <button type="submit" className='submit-button'>Sign Up</button>
                </div>
            </form>
        </div >
    );
}

export default SignupForm;
