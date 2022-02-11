import { createGlobalStyle } from "styled-components";

import { variables } from "./variables";
import { baseStyles } from "./base";
import { animations } from "./animation";

const GlobalStyle = createGlobalStyle`
${variables}
${baseStyles}
${animations}
`;

export default GlobalStyle;
