import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLoggedInUser } from '../slice/userSlice';
import {
  LoginContainer,
  LoginBox,
  Logo,
  ErrorText,
  LoginForm,
  Input,
  LoginButton,
  Divider,
  DividerText,
  FacebookButton,
  SignupRedirect,
  Footer,
  FooterList,
  FooterItem,
} from './Login.styles';

const Login: React.FC = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log('Login form data:', formData); // Debug log
      const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        console.error('Login error response:', data); // Debug log
        throw new Error(data.error || 'Login failed');
      }

      const data = await response.json();
      console.log('Login successful response:', data); // Debug log
      localStorage.setItem('token', data.token);
      dispatch(setLoggedInUser(data.user));
      navigate('/');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <LoginContainer>
      <LoginBox>
        <Logo>Instagram</Logo>
        {error && <ErrorText>{error}</ErrorText>}
        <LoginForm onSubmit={handleSubmit}>
          <Input
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange}
            required
          />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />
          <LoginButton type="submit">Log In</LoginButton>
        </LoginForm>
        <Divider>
          <DividerText>OR</DividerText>
        </Divider>
        <FacebookButton>Log in with Facebook</FacebookButton>
      </LoginBox>
      <SignupRedirect>
        Don't have an account? <a href="/signup">Sign up</a>
      </SignupRedirect>
      <Footer>
        <FooterList>
          <FooterItem><a href="#">About</a></FooterItem>
          <FooterItem><a href="#">Help</a></FooterItem>
          <FooterItem><a href="#">Privacy</a></FooterItem>
          <FooterItem><a href="#">Terms</a></FooterItem>
          <FooterItem><a href="#">Locations</a></FooterItem>
        </FooterList>
      </Footer>
    </LoginContainer>
  );
};

export default Login;