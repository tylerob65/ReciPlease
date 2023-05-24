import { createTheme } from "@mui/material/styles";

export const themeOptions = {
    palette: {
        type:'light',
        mode: 'light',
        primary: {
            main: '#ffb206',
        },
        secondary: {
            main: '#ff066f',
        },
        lightprimary: {
            main:'#fff4dd',
        },
        lightsecondary: {
            main:'#fff1f7',
        },
        themeblack: {
            main:'#000000',
            dark:'#000000',
        }

    },
    typography: {
        h1: {
            fontSize: '4rem',
        },
        h2: {
            fontSize: '3rem',
        },
        h3: {
            fontSize: '2.5rem',
        },
        h4: {
            fontSize: '2rem',
        },
    },
};

const theme = createTheme(themeOptions);
export default theme;

// export default function primaryTheme() {
//   return (
//     <div>primaryTheme</div>
//   )
// }
