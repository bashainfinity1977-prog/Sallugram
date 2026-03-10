import React, { useState } from 'react';

import { Link } from 'react-router-dom';

import './Login.css';

import { Image } from '@chakra-ui/react';





// Login Page Component

const LoginPage = ({ onNavigate = () => {} }) => {

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({

    emailOrUsername: '',

    password: '',

    remember: false

  });



  const handleChange = (e) => {

    const { name, value, type, checked } = e.target;

    setFormData(prev => ({

      ...prev,

      [name]: type === 'checkbox' ? checked : value

    }));

  };



  const handleSubmit = () => {

    console.log('Login submitted:', formData);

  };



  return (

    <div className="login-container">

      <div className="login-content">

        <div className="login-form-section">

          <div className="login-card">

            <div className="login-logo">

              <Image src='/Minisallu.png' alt='Mini Sallu' width={'350px'} height={'25px'} />

            </div>

            <p className="login-subtitle">Share moments. Build connections.</p>

            

            <div className="form-container">

              <div className="form-group">

                <input

                  type="text"

                  name="emailOrUsername"

                  placeholder="Email or username"

                  value={formData.emailOrUsername}

                  onChange={handleChange}

                  />

              </div>

              

              <div className="form-group">

                <div className="password-input">

                  <input

                    type={showPassword ? 'text' : 'password'}

                    name="password"

                    placeholder="Password"

                    value={formData.password}

                    onChange={handleChange}

                    />

                  <button

                    type="button"

                    className="toggle-password"

                    onClick={() => setShowPassword(!showPassword)}

                  >

                    <i className={`far ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>

                  </button>

                </div>

              </div>

              

              <div className="remember-me">

                <input

                  type="checkbox"

                  id="remember"

                  name="remember"

                  checked={formData.remember}

                  onChange={handleChange}

                  />

                <label htmlFor="remember">Remember me</label>

              </div>

              

              <button className="btn-login" onClick={handleSubmit}>

                Log in

              </button>

            </div>

            

            <p className="signup-link">

              Don't have an account? <span onClick={() => onNavigate('/signup')}>Sign Up</span>

            </p>

            

            <p className="forgot-password">Forgot password?</p>

          </div>

        </div>

      </div>

    </div>

  );

};







export default LoginPage;

