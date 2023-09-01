import "@emotion/react";

declare module "@emotion/react" {
  export interface Theme {
    color: {
      primary: string;
    };
    fontSize: {
      small: string;
      medium: string;
    };
  }
}
