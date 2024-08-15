import React from 'react';
import styled from 'styled-components';
import { colors } from '../../../utils/constants';

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const ModalWrapper = styled.div`
  padding: 20px;
  max-height: 80vh;
  overflow-y: auto;
  background: #fff;
  border-radius: 8px;
  display: inline-block;
  min-width: 200px;
  max-width: 500px;
  margin: 1rem;
  position: relative;
  transition: all 0.3s ease-in-out;
  z-index: 1000;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const ModalContent = styled.div`
  margin: 20px 0;
`;

const CloseButton = styled.span`
  position: absolute;
  color: ${colors.black}
  top: 10px;
  right: 15px;
  font-size: 2.5rem;
  cursor: pointer;
`;

function Modal({ showModal, setShowModal, children }) {
  return (
    <>
      {showModal ? (
        <ModalBackdrop onClick={() => setShowModal(false)}>
          <ModalWrapper onClick={(e) => e.stopPropagation()}>
            {setShowModal && <CloseButton onClick={() => setShowModal(false)}>&times;</CloseButton>}
            <ModalContent>{children}</ModalContent>
          </ModalWrapper>
        </ModalBackdrop>
      ) : null}
    </>
  );
}

export default Modal;
