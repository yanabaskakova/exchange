import styled from 'styled-components/macro';

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #ffffff;
  border-radius: 10px;
  padding: 14px 20px;
`;

export const StyledInput = styled.input`
  width: 100%;
  border: none;
  height: 24px;
  margin-top: 10px;
  padding: 0;
  font-size: 24px;
  line-height: 24px;
  color: #424242;
  text-align: right;
  background-color: transparent;
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: #ccc;
  }
`;

export const SelectWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

export const Balance = styled.div`
  max-width: 100%;
  display: block;
  white-space: nowrap;
  margin-top: 10px;
  font-size: 12px;
  line-height: 12px;
  color: #424242;
`;
