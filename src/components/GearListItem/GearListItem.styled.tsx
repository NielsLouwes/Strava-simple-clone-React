import styled from "styled-components";

export const DeleteButton = styled.button`
  border: none;
  color: #fc5201;
  background: none;
  color: white;

  
`;

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 25px;
  padding: 5px 10px;

  &:hover {
    background: #F7F7FA;
  }

  &:hover ${DeleteButton} {
    color: #fc5201;
    cursor: pointer;
  }
`;
