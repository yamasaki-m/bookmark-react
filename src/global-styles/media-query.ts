import { InterpolationValue } from "styled-components";

export const respond = (breakpoint: string): InterpolationValue => {
  if (breakpoint === "phone") {
    return `@media only screen and (max-width: 47.5em)`; // width >= 760px
  }
  if (breakpoint === "tablet") {
    return `@media only screen and (max-width: 73.75em)`; // width >= 1180px
  }
};
