import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  SignupContainer,
  SignupBox,
  Logo,
  SignupText,
  ErrorText,
  SignupForm,
  Input,
  FileUploadLabel,
  SignupButton,
  AvatarPreview,
  Divider,
  DividerText,
  FacebookButton,
  LoginRedirect,
  Footer,
  FooterList,
  FooterItem,
} from "./Signup.styles";

const Signup: React.FC = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    name: "",
    bio: "",
    avatar: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, avatar: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Signup failed");
      }

      navigate("/login");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <SignupContainer>
      <SignupBox>
        <Logo>Instagram</Logo>
        <SignupText>
          Sign up to see photos and videos from your friends.
        </SignupText>
        {error && <ErrorText>{error}</ErrorText>}
        <SignupForm onSubmit={handleSubmit}>
          <Input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <Input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <Input
            type="text"
            name="bio"
            placeholder="Bio (optional)"
            value={formData.bio}
            onChange={handleChange}
          />
          <FileUploadLabel>
            <span>Upload Avatar</span>
            <input type="file" accept="image/*" onChange={handleFileChange} />
          </FileUploadLabel>
          {formData.avatar && (
            <AvatarPreview>
              <img src={formData.avatar} alt="Avatar Preview" />
            </AvatarPreview>
          )}
          <SignupButton type="submit">Sign Up</SignupButton>
        </SignupForm>
        <Divider>
          <DividerText>OR</DividerText>
        </Divider>
        <FacebookButton>Sign up with Facebook</FacebookButton>
      </SignupBox>
      <LoginRedirect>
        Have an account? <a href="/login">Log in</a>
      </LoginRedirect>
      <Footer>
        <FooterList>
          <FooterItem>
            <a href="#">About</a>
          </FooterItem>
          <FooterItem>
            <a href="#">Help</a>
          </FooterItem>
          <FooterItem>
            <a href="#">Privacy</a>
          </FooterItem>
          <FooterItem>
            <a href="#">Terms</a>
          </FooterItem>
          <FooterItem>
            <a href="#">Locations</a>
          </FooterItem>
        </FooterList>
      </Footer>
    </SignupContainer>
  );
};

export default Signup;
