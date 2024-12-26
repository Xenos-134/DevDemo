const DEFAULT_THEME = {
    COLOR: {
        primary: "#000000",
        secondary: "#636b74",
        danger: "#FF0000"
    },
    FONT: {
        primary: "x",
        secondary: "#F42D2D",
    },
    CARD: {
        background_color: "transparent"
    },
    PAGE: {
        background_color: "#FFFAFA",
        footer_background_color: "#EDF2F4"
    }
}

export default class ThemeAPI {
    static theme = DEFAULT_THEME;
}