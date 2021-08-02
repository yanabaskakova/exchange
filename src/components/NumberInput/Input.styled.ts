import styled from 'styled-components/macro';

export const Wrapper = styled.div`
  width: auto;
  position: relative;
  min-width: 100px;
  display: block;
`;

export const Input = styled.input`
  display: inline-flex;
  background: transparent;
  min-width: 10px;
  max-width: 100%;
  outline: none;
  padding: 0;
  font-size: 14px;
  margin: 0;
  border: 0;
`;

export const Buffer = styled.span`
  width: auto;
  /* visibility: hidden; */
  font-size: 14px;
  font-family: 'Poppins', sans-serif;
  position: absolute;
  top: 100px;
  left: 0;
  white-space: nowrap;
`;

export const Suffix = styled.span`
  display: inline-flex;
  margin-left: 5px;
`;
