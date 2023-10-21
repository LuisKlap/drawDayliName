import { defaultTheme } from "./../../.history/src/styles/themes/default_20230327205042";
import "styled-components";
import { defaultTheme } from "../styles/themes/default";

type ThemeType = typeof defaultTheme;

declare module "styled-components" {
  export interface DefaultTheme extends ThemeType {}
}
