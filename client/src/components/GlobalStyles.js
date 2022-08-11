import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  :root {
    --font-heading: Esthetique, Helvetica, Arial, sans-serif;
    --font-body: Helvetica, Arial, sans-serif;
    --padding-page: 24px;
    --navbar-gradient: linear-gradient(
    90deg,
    rgba(34, 34, 34, 1) 0%,
    rgba(138, 138, 138, 1) 100%
  );
    --button-gradient-blue: linear-gradient(
    90deg,
    rgba(8, 0, 139, 1) 0%,
    rgba(0, 96, 191, 1) 100%
  );
    --button-gradient-red: linear-gradient(
    90deg,
    rgba(149, 0, 0, 1) 0%,
    rgba(240, 0, 0, 1) 100%
  );
    --border-radius: 10px;
  }


  /* http://meyerweb.com/eric/tools/css/reset/
      v2.0 | 20110126
      License: none (public domain)
  */

  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
      margin: 0;
      padding: 0;
      border: 0;
      box-sizing: border-box;
      font-size: 100%;
      vertical-align: baseline;
      text-decoration: none;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section {
      display: block;
  }
  body {
      line-height: 1;
  }
  ol, ul {
      list-style: none;
  }
  blockquote, q {
      quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
      content: '';
      content: none;
  }

  h1,
h2,
h3,
label,
button {
  font-family: var(--font-heading);
  font-size: 14px;
  text-align: center;
}


p,
a,
li,
blockquote,
input {
  font-family: var(--font-body);
}

  input {
    font-size: 24px;
    height: 21px;
    border: 1px solid lightgrey;
    border-radius: 4px;
    padding: 0 12px;
  }

  hr {
  border: 0.1px solid lightgrey;
  width: 100%;
}

input, label{   
  vertical-align: middle;
}

input::placeholder {
  font-size: 14px;
  text-align: start;
  opacity: 0.5
}

input[type="text"],input[type="number"], input[type="email"] {
    font-size:12px;
}

`;
