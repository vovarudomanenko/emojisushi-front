import { addAlphaToHexadecimal } from "~utils/addAlphaToHexadecimal";
// import original module declarations
import { DefaultTheme } from "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      brand: string;
      brandDelimiter: string;
      ukrainianFlag: {
        sky: string;
        wheat: string;
      };
      fg: {
        default: string;
        muted: string;
        brandContrast: string;
      };
      danger: {
        canvas: string;
      };
      canvas: {
        default: string;
        inset: string;
        inset2: string;
        inset3: string;
        inset4: string;
        inset5: string;
      };
      border: {
        default: string;
      };
      skeleton: {
        baseColor: string;
        highlightColor: string;
      };
    };
    borderRadius: {
      default: string;
      smooth: string;
      lessSmooth: string;
      almostSquare: string;
    };
    shadows: {
      brand: string;
      brandSofter: string;
      canvasShadow: string;
      canvasInset2Shadow: string;
      canvasInsetShadow: string;
    };

    components: {
      input: {
        placeholder: string;
      };
    };

    gradients: {
      fade: string;
    };
  }
}

const palette = {
  white: "#ffffff",
  black: "#000000",
  yellow: {
    400: "#f1da00",
    500: "#ffe600",
  },
  red: {
    500: "#cd3838",
  },
  grey: {
    400: "#616161",
    500: "#343434",
    550: "#2F2F2F",
    570: "#272727",
    573: "#242424",
    575: "#222222",
    600: "#1F1F1F",
    700: "#1C1C1C",
    800: "#171717",
    900: "#141414",
  },
} as const;

const ukrainianFlag = {
  sky: "#3459DD",
  wheat: "#ffe600",
};

const components = {
  input: {
    placeholder: palette.grey[400],
  },
};

const colors = {
  brand: palette.yellow[500],
  brandDelimiter: palette.yellow[400],
  ukrainianFlag: ukrainianFlag,
  fg: {
    default: palette.white,
    muted: palette.grey[400],
    brandContrast: palette.black,
  },
  danger: {
    canvas: palette.red[500],
  },
  canvas: {
    default: palette.grey[900],
    inset: palette.grey[800],
    inset2: palette.grey[700],
    inset3: palette.grey[500],
    inset4: palette.grey[570],
    inset5: palette.grey[573],
  },
  border: {
    default: palette.grey[500],
  },
  skeleton: {
    baseColor: palette.grey[600],
    highlightColor: palette.grey[550],
  },
};

const shadows = {
  brand: `0 0 15px ${addAlphaToHexadecimal(palette.yellow[500], 50)}`,
  brandSofter: `0 0 15px ${addAlphaToHexadecimal(palette.yellow[500], 30)}`,
  canvasShadow: `0 0 15px ${addAlphaToHexadecimal(palette.grey[575], 30)}`,
  canvasInset2Shadow: `0 4px 15px ${addAlphaToHexadecimal(
    palette.grey[700],
    30
  )}`,
  canvasInsetShadow: `0 4px 15px ${addAlphaToHexadecimal(
    palette.grey[800],
    40
  )}`,
};

const gradients = {
  fade: `linear-gradient(270deg,${
    palette.grey[700]
  } 0%, ${addAlphaToHexadecimal(palette.grey[700], 0)} 100%)`,
};

const borderRadius = {
  default: "15px",
  smooth: "10px",
  lessSmooth: "5px",
  almostSquare: "3px",
};

export const theme: DefaultTheme = {
  colors,
  shadows,
  gradients,
  components,
  borderRadius,
};
