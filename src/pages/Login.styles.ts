import styled from '@emotion/styled';

export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 350px;
  margin: 0 auto;
`;

export const Spinner = styled.div`
  border: 4px solid #f3f3f3;
  border-top: 4px solid #0095f6;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const LoginBox = styled.div`
  background-color: #fff;
  border: 1px solid #ddd;
  padding: 20px;
  text-align: center;
  border-radius: 8px;
  width: 100%;
`;

export const Logo = styled.h1`
  font-family: 'Cursive', sans-serif;
  font-size: 2.5rem;
  margin-bottom: 20px;
`;

export const ErrorText = styled.p`
  color: red;
  font-size: 0.9rem;
  margin-bottom: 10px;
`;

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
`;

export const LoginButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #0095f6;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background-color: #007bb5;
  }
`;

export const Divider = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0;
`;

export const DividerText = styled.span`
  background-color: #fff;
  padding: 0 10px;
  color: #8e8e8e;
  font-size: 0.9rem;
`;

export const FacebookButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #4267b2;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background-color: #365899;
  }
`;

export const SignupRedirect = styled.div`
  margin-top: 20px;
  font-size: 0.9rem;

  a {
    color: #0095f6;
    text-decoration: none;
  }
`;

export const Footer = styled.footer`
  margin-top: 20px;
  font-size: 0.8rem;
  color: #8e8e8e;
`;

export const FooterList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

export const FooterItem = styled.li`
  margin: 0 5px;

  a {
    color: #8e8e8e;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;