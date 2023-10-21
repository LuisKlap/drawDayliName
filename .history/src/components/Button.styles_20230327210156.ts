import styled, { css } from "styled-components";

export type ButtonVariant = "primary" | "secondary" | "danger" | "success";

interface ButtonContainerProps {
  variant: ButtonVariant;
}

const buttonVariant = {
  primary: "purple",
  secondary: "blue",
  danger: "red",
  success: "green",
};

export const ButtonContainer = styled.button<ButtonContainerProps>`
  width: 100px;
  height: 45px;

  color: ${(props) => props.theme.ButtonVariant};

  /* ${(props) =>
    css`
      color: ${buttonVariant[props.variant]};
    `} */
`;
