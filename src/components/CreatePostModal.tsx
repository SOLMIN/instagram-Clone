import React, { useState } from 'react';
import styled from '@emotion/styled';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 100%;
  height: 100%;
  max-width: 825px;
  max-height: 866px;
  display: flex;
  flex-direction: column;
  justify-content: center; /* Center content vertically */
  align-items: center; /* Center content horizontally */
  position: relative;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;

const Title = styled.h2`
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const FileInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;

const FileInputLabel = styled.label`
  display: inline-block;
  padding: 10px 20px;
  background: #007bff;
  color: #fff;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;

  &:hover {
    background: #0056b3;
  }
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  max-height: 660px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 10px;
`;

const InputContainer = styled.div`
  margin-top: auto; /* Push the input and button to the bottom */
  display: block;
  gap: 20px;
  width: 100%;
`;

const Input = styled.input`
  width: 50%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-left: 150px;
`;

const SubmitButton = styled.button`
  background: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 20px;

  &:hover {
    background: #0056b3;
  }
`;

interface CreatePostModalProps {
  onClose: () => void;
  onSubmit: (image: string, caption: string) => void;
}

const CreatePostModal: React.FC<CreatePostModalProps> = ({ onClose, onSubmit }) => {
  const [image, setImage] = useState<string | null>(null);
  const [caption, setCaption] = useState('');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    if (image && caption) {
      onSubmit(image, caption);
      onClose();
    } else {
      alert('Please upload an image and add a caption.');
    }
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <Title>Create New Post</Title>
        <FileInputContainer>
          <FileInputLabel htmlFor="file-upload">Select From Computer</FileInputLabel>
          <HiddenFileInput
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          {image && <PreviewImage src={image} alt="Preview" />}
        </FileInputContainer>
        <InputContainer>
          <Input
            type="text"
            placeholder="Write a caption..."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />
          <SubmitButton onClick={handleSubmit}>Post</SubmitButton>
        </InputContainer>
      </ModalContent>
    </ModalOverlay>
  );
};

export default CreatePostModal;