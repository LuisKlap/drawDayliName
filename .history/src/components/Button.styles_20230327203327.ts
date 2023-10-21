import styled from "styled-components";

export type ButtonVariant = "primary" | "secondary" | "danger" | "success";

interface ButtonContainerProps {
  variant: ButtonVariant;
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
