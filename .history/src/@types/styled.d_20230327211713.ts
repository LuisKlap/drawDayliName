import "styled-components";
import { defaultTheme } from "../styles/themes/default";

type ThemeType = typeof defaultTheme;

// sobrescrever uma biblioteca ja existente com typescript puro

declare module "styled-components" {
  export interface DefaultTheme extends ThemeType {}
}
