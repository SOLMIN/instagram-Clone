import styled from '@emotion/styled';

export const FileUploadLabel = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  font-size: 0.9rem;
  color: #8e8e8e;
  cursor: pointer;
  border: 1px dashed #ddd;
  padding: 10px;
  border-radius: 8px;
  text-align: center;

  input {
    display: none; /* Hide the file input */
  }

  span {
    margin-bottom: 5px;
    font-weight: bold;
    color: #555;
  }

  &:hover {
    background-color: #f9f9f9;
  }
`;

export const AvatarPreview = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;

  img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid #ddd;
  }
`;

export const SignupContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 350px;
  margin: 0 auto;
`;

export const SignupBox = styled.div`
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
  margin-bottom: 10px;
`;

export const SignupText = styled.p`
  font-size: 1rem;
  color: #8e8e8e;
  margin-bottom: 20px;
`;

export const ErrorText = styled.p`
  color: red;
  font-size: 0.9rem;
  margin-bottom: 10px;
`;

export const SignupForm = styled.form`
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

export const SignupButton = styled.button`
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
  color: blurr;
  blurr: 1px solid #ddd;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  disabled: true;

  &:hover {
    background-color: #365899;
  }
`;

export const LoginRedirect = styled.div`
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