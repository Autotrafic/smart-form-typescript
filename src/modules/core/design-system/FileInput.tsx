import { ChangeEvent } from 'react';
import styled from 'styled-components';
import { colors } from '../utils/styles';
import { FileInputs } from '../interfaces/enums';

interface FileStyledProps {
  $fileAttached: string;
}

const InputContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const FileInputConainer = styled.div<FileStyledProps>`
  width: ${({ $fileAttached }) => ($fileAttached ? '200px' : '100%')};
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const Label = styled.label<FileStyledProps>`
  cursor: pointer;
  display: block;
  border: ${({ $fileAttached }) =>
    $fileAttached ? `1px solid ${colors.primaryColor}` : `1px solid ${colors.primaryColor}`};
  text-align: center;
  color: ${colors.black};
  background-color: ${({ $fileAttached }) => ($fileAttached ? '#6D6DFF' : 'white')};
  width: ${({ $fileAttached }) => ($fileAttached ? '200px' : '100%')};
  border-radius: 5px;
  &:hover {
    transition: 0.1s;
    background-color: #6d6dff;
    border: 2px solid ${colors.primaryColor};
  }
`;

const FileInputButton = styled.div<FileStyledProps>`
  font-size: 12px;
  color: ${({ $fileAttached }) => ($fileAttached ? 'white' : colors.primaryColor)};
  border-radius: 3px;
  padding: ${({ $fileAttached }) => ($fileAttached ? '8px' : '5px')};
  display: inline-block;
  &:hover {
    color: white;
  }
`;

const AttachedSucceedContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0px;
  justify-content: center;
`;

const EditFileLabel = styled.label`
  cursor: pointer;
`;

const AttachedSucceedText = styled.p`
  font-size: 13px;
  margin: 0;
`;

const AttachedEditText = styled.p`
  color: #337fff;
  font-size: 14px;
  text-decoration: underline;
  margin: 0;
`;

interface FileInputProps {
  id: FileInputs;
  file: File;
  handleFile: (file: File) => void;
  handleChangeFile: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function FileInput({ id, file, handleFile, handleChangeFile }: FileInputProps) {
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      const fileType = selectedFile.type;
      const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'application/pdf'];
      if (!validTypes.includes(fileType)) {
        alert('Tipo de archivo no permitido.');
        e.target.value = '';
      } else {
        handleFile(selectedFile);
        handleChangeFile(e);
      }
    }
  };

  return (
    <>
      <InputContainer>
        <FileInputConainer $fileAttached={file && file.name}>
          <HiddenFileInput type="file" id={id} onChange={(e) => handleOnChange(e)} name="file" accept="image/*,.pdf" />
          <Label $fileAttached={file && file.name} htmlFor={id}>
            <FileInputButton $fileAttached={file && file.name}>
              {file?.name || 'Hacer foto o seleccionar archivo'}
            </FileInputButton>
          </Label>
        </FileInputConainer>
        {file && (
          <AttachedSucceedContainer>
            <AttachedSucceedText>Documento recibido ✅</AttachedSucceedText>
            <EditFileLabel htmlFor={id}>
              <AttachedEditText>Editar</AttachedEditText>
            </EditFileLabel>
          </AttachedSucceedContainer>
        )}
      </InputContainer>
    </>
  );
}
