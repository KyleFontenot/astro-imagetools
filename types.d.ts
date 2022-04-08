declare type format =
  | "heic"
  | "heif"
  | "avif"
  | "jpg"
  | "jpeg"
  | "png"
  | "tiff"
  | "webp"
  | "gif";

declare type PotraceOptions = TraceOptions | PosterizeOptions;

declare interface SharedTracingOptions {
  turnPolicy?: "black" | "white" | "left" | "right" | "minority" | "majority";
  turdSize?: number;
  alphaMax?: number;
  optCurve?: boolean;
  optTolerance?: number;
  threshold?: number;
  blackOnWhite?: boolean;
  color?: "auto" | string;
  background?: "transparent" | string;
}

declare interface TraceOptions {
  function?: "trace";
  options?: SharedTracingOptions;
}

declare interface PosterizeOptions {
  function?: "posterize";
  options?: SharedTracingOptions & {
    fill?: "spread" | "dominant" | "median" | "mean";
    ranges?: "auto" | "equal";
    steps?: number | number[];
  };
}

declare interface FormatOptions {
  formatOptions?: Record<format, ImageToolsConfigs> & {
    tracedSVG?: PotraceOptions;
  };
}

declare interface PictureFormatOptions extends FormatOptions {
  format?: format | format[] | [] | null;
  fallbackFormat?: format;
  includeSourceFormat?: boolean;
}

declare interface ImgFormatOptions extends FormatOptions {
  format?: format;
}

declare interface ImageToolsConfigs {
  flip?: boolean;
  flop?: boolean;
  invert?: boolean;
  flatten?: boolean;
  normalize?: boolean;
  grayscale?: boolean;
  hue?: number;
  saturation?: number;
  brightness?: number;
  w?: number;
  h?: number;
  ar?: number;
  width?: number;
  height?: number;
  aspect?: number;
  background?: string;
  tint?: string;
  blur?: number | boolean;
  median?: number | boolean;
  rotate?: number;
  quality?: number;
  fit?: "cover" | "contain" | "fill" | "inside" | "outside";
  kernel?: "nearest" | "cubic" | "mitchell" | "lanczos2" | "lanczos3";
  position?:
    | "top"
    | "right top"
    | "right"
    | "right bottom"
    | "bottom"
    | "left bottom"
    | "left"
    | "left top"
    | "north"
    | "northeast"
    | "east"
    | "southeast"
    | "south"
    | "southwest"
    | "west"
    | "northwest"
    | "center"
    | "centre"
    | "cover"
    | "entropy"
    | "attention";
}

declare interface ArtDirective
  extends PrimaryProps,
    PictureFormatOptions,
    ImageToolsConfigs {
  media: string;
}

declare type sizesFunction = {
  (breakpoints: number[]): string;
};

declare type breakpointsFunction = {
  (imageWidth: number): number[];
};

declare interface PrimaryProps {
  src: string;
  sizes?: string | sizesFunction;
  objectPosition?: string;
  objectFit?: "fill" | "contain" | "cover" | "none" | "scale-down";
  placeholder?: "dominantColor" | "blurred" | "tracedSVG" | "none";
  breakpoints?:
    | number[]
    | breakpointsFunction
    | {
        count?: number;
        minWidth?: number;
        maxWidth?: number;
      };
}

declare interface ConfigOptions extends PrimaryProps, ImageToolsConfigs {
  alt: string;
  preload?: format;
  loading?: "lazy" | "eager" | "auto" | null;
  decoding?: "async" | "sync" | "auto" | null;
  layout?: "constrained" | "fixed" | "fullWidth" | "fill";
}

export interface PictureConfigOptions
  extends ConfigOptions,
    PictureFormatOptions {
  artDirectives?: ArtDirective[];
  fadeInTransition?:
    | boolean
    | {
        delay?: string;
        duration?: string;
        timingFunction?: string;
      };
}

export interface ImgConfigOptions extends ConfigOptions, ImgFormatOptions {}

export interface BackgroundImageConfigOptions
  extends Pick<
    ImgConfigOptions,
    Exclude<
      keyof ImgConfigOptions,
      | "alt"
      | "sizes"
      | "loading"
      | "decoding"
      | "layout"
      | "objectFit"
      | "objectPosition"
    >
  > {
  Tag?: string;
  content?: string;
  backgroundSize?: string;
  backgroundPosition?: string;
  artDirectives?: ArtDirective[];
}

export interface BackgroundPictureConfigOptions
  extends Pick<
    PictureConfigOptions,
    Exclude<keyof PictureConfigOptions, "layout">
  > {
  Tag?: string;
  content?: string;
}

export type GlobalConfigOptions = Pick<
  ConfigOptions,
  Exclude<keyof ConfigOptions, "src" | "alt">
>;

declare interface HTMLData {
  link: string;
  style: string;
}

export interface ImageHTMLData extends HTMLData {
  image: string;
}

export interface PictureHTMLData extends HTMLData {
  picture: string;
}

export interface ImgHTMLData extends HTMLData {
  img: string;
}

export interface BackgroundImageHTMLData extends HTMLData {
  htmlElement: string;
}

export type BackgroundPictureHTMLData = BackgroundImageHTMLData;