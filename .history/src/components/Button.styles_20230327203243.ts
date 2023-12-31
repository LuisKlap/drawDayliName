import styled from "styled-components";

interface ButtonContainerProps {
  variant: "primary" | "secondary" | "danger" | "success";
}

export const ButtonContainer = styled.button`
  width: 100px;
  height: 45px;

  .primary {
    color: purple;
  }
  .secondary {
    color: blue;
  }
  .danger {
    color: red;
  }
  .success {
    color: green;
  }
`;
