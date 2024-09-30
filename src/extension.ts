import * as vscode from 'vscode';

/**
 * Map of CSS properties and their corresponding allowed design tokens
 * Example: for `background-color` CSS property allowed tokens are `color-background` and `method-color-background`
 *
 * As long as tokens follow this pattern, they don't need to be added to the arrays in the map:
 * - starts with a prefix `kui-`
 * - optionally followed by a component name in kebab-case
 * - followed by a token name in kebab-case
 * - optionally followed by a variant name in kebab-case
 * Examples: `kui-analytics-chart-background-color-inverse`, `kui-color-background`, `kui-color-background-inverse`
 *
 * key: CSS Property name
 * value: Array of valid Kong Design Tokens, without the `kui-` prefix
 *
 * ! To enforce no token should be used for a CSS property, set the value to an empty array.
 */
const PROPERTY_TOKEN_MAP: Record<string, string[]> = {
  background: ['color-background', 'status-color'],
  'background-color': ['color-background', 'status-color'],
  'background-size': [],
  border: ['border-radius', 'border-width', 'color-border'],
  'border-bottom': ['border-radius', 'border-width', 'color-border'],
  'border-bottom-color': ['color-border'],
  'border-bottom-left-radius': ['border-radius'],
  'border-bottom-right-radius': ['border-radius'],
  'border-bottom-width': ['border-width'],
  'border-color': ['color-border'],
  'border-left': ['border-radius', 'border-width', 'color-border'],
  'border-left-color': ['color-border'],
  'border-left-width': ['border-width'],
  'border-radius': ['border-radius'],
  'border-right': ['border-radius', 'border-width', 'color-border'],
  'border-right-color': ['color-border'],
  'border-right-width': ['border-width'],
  'border-spacing': ['space'],
  'border-top': ['border-radius', 'border-width', 'color-border'],
  'border-top-color': ['color-border'],
  'border-top-left-radius': ['border-radius'],
  'border-top-right-radius': ['border-radius'],
  'border-top-width': ['border-width'],
  'border-width': ['border-width'],
  bottom: [],
  'box-shadow': ['border-width', 'color-border', 'shadow'],
  color: ['color-text', 'icon-color', 'status-color'],
  'column-gap': ['space'],
  'column-width': [],
  fill: ['color-text', 'status-color'],
  font: ['font-family', 'font-size', 'font-weight'],
  'font-family': ['font-family'],
  'font-size': ['font-size'],
  'font-weight': ['font-weight'],
  gap: ['space'],
  height: ['icon-size'],
  inset: [],
  left: [],
  'letter-spacing': ['letter-spacing'],
  'line-height': ['line-height'],
  margin: ['space'],
  'margin-bottom': ['space'],
  'margin-left': ['space'],
  'margin-right': ['space'],
  'margin-top': ['space'],
  'max-height': ['icon-size'],
  'max-width': ['icon-size', 'breakpoint'],
  'min-height': ['icon-size'],
  'min-width': ['icon-size', 'breakpoint'],
  outline: [],
  'outline-color': [],
  'outline-width': [],
  padding: ['space'],
  'padding-bottom': ['space'],
  'padding-left': ['space'],
  'padding-right': ['space'],
  'padding-top': ['space'],
  right: [],
  'row-gap': ['space'],
  stroke: ['color-text', 'status-color'],
  'text-decoration-color': ['color-text'],
  top: [],
  width: ['icon-size', 'breakpoint'],
}

const Tokens = `
/* Default background color for containers (white). */
$kui-color-background: #ffffff;
/* Background color for danger actions or messages (red.60). */
$kui-color-background-danger: #d60027;
/* Strong background color for danger actions or messages (red.70). */
$kui-color-background-danger-strong: #ad000e;
/* Stronger background color for danger actions or messages (red.80). */
$kui-color-background-danger-stronger: #850000;
/* Strongest background color for danger actions or messages (red.90). */
$kui-color-background-danger-strongest: #5c0000;
/* Weak background color for danger actions or messages (red.40). */
$kui-color-background-danger-weak: #ff3954;
/* Weaker background color for danger actions or messages (red.20). */
$kui-color-background-danger-weaker: #ffabab;
/* Weakest background color for danger actions or messages (red.10). */
$kui-color-background-danger-weakest: #ffe5e5;
/* Background color for decorative purposes (purple.60). */
$kui-color-background-decorative-purple: #6f28ff;
/* Weakest background color for decorative purposes (purple.10). */
$kui-color-background-decorative-purple-weakest: #f1f0ff;
/* Background color for disabled elements (gray.20). */
$kui-color-background-disabled: #e0e4ea;
/* Inverse background color for containers (blue.100) */
$kui-color-background-inverse: #000933;
/* Background color for neutral elements (gray.60). */
$kui-color-background-neutral: #6c7489;
/* Strong background color for neutral elements (gray.70). */
$kui-color-background-neutral-strong: #52596e;
/* Stronger background color for neutral elements (gray.80). */
$kui-color-background-neutral-stronger: #3a3f51;
/* Strongest background color for neutral elements (gray.90). */
$kui-color-background-neutral-strongest: #232633;
/* Weak background color for neutral elements (gray.40). */
$kui-color-background-neutral-weak: #afb7c5;
/* Weaker background color for neutral elements (gray.20). */
$kui-color-background-neutral-weaker: #e0e4ea;
/* Weakest background color for neutral elements (gray.10). */
$kui-color-background-neutral-weakest: #f9fafb;
/* Overlay background color (rgba(blue.100, 0.6)) */
$kui-color-background-overlay: rgba(0, 9, 51, 0.6);
/* Background color for primary actions or messages (blue.60). */
$kui-color-background-primary: #0044f4;
/* Strong background color for primary actions or messages (blue.70). */
$kui-color-background-primary-strong: #0030cc;
/* Stronger background color for primary actions or messages (blue.80). */
$kui-color-background-primary-stronger: #002099;
/* Strongest background color for primary actions or messages (blue.90). */
$kui-color-background-primary-strongest: #001466;
/* Weak background color for primary actions or messages (blue.40). */
$kui-color-background-primary-weak: #5f9aff;
/* Weaker background color for primary actions or messages (blue.20). */
$kui-color-background-primary-weaker: #bee2ff;
/* Weakest background color for primary actions or messages (blue.10) */
$kui-color-background-primary-weakest: #eefaff;
/* Weak background color for success elements (green.40). */
$kui-color-background-success-weak: #00d6a4;
/* Weakest background color for success elements (green.10). */
$kui-color-background-success-weakest: #ecfffb;
/* Transparent background color (transparent). */
$kui-color-background-transparent: transparent;
/* Weak background color for warning elements (yellow.40). */
$kui-color-background-warning-weak: #ffc400;
/* Weakest background color for warning elements (yellow.10). */
$kui-color-background-warning-weakest: #fffce0;
/* Default border color for containers (gray.20). */
$kui-color-border: #e0e4ea;
/* Border color for danger actions or messages (red.60). */
$kui-color-border-danger: #d60027;
/* Strong border color for danger actions or messages (red.70). */
$kui-color-border-danger-strong: #ad000e;
/* Stronger border color for danger actions or messages (red.80). */
$kui-color-border-danger-stronger: #850000;
/* Strongest border color for danger actions or messages (red.90). */
$kui-color-border-danger-strongest: #5c0000;
/* Weak border color for danger actions or messages (red.40). */
$kui-color-border-danger-weak: #ff3954;
/* Weaker border color for danger actions or messages (red.20). */
$kui-color-border-danger-weaker: #ffabab;
/* Weakest border color for danger actions or messages (red.10). */
$kui-color-border-danger-weakest: #ffe5e5;
/* Border color for decorative purposes (purple.60). */
$kui-color-border-decorative-purple: #6f28ff;
/* Border color for disabled elements (gray.20). */
$kui-color-border-disabled: #e0e4ea;
/* Inverse border color (rgba(white, 0.2)). */
$kui-color-border-inverse: rgba(255, 255, 255, 0.2);
/* Weak border color for neutral elements (gray.40) */
$kui-color-border-neutral-weak: #afb7c5;
/* Weaker border color for neutral elements (gray.20) */
$kui-color-border-neutral-weaker: #e0e4ea;
/* Border color for primary actions or messages (blue.60). */
$kui-color-border-primary: #0044f4;
/* Strong border color for primary actions or messages (blue.70). */
$kui-color-border-primary-strong: #0030cc;
/* Stronger border color for primary actions or messages (blue.80). */
$kui-color-border-primary-stronger: #002099;
/* Strongest border color for primary actions or messages (blue.90). */
$kui-color-border-primary-strongest: #001466;
/* Weak border color for primary actions or messages (blue.40). */
$kui-color-border-primary-weak: #5f9aff;
/* Weaker border color for primary actions or messages (blue.20). */
$kui-color-border-primary-weaker: #bee2ff;
/* Weakest border color for primary actions or messages (blue.10). */
$kui-color-border-primary-weakest: #eefaff;
/* Transparent border color (transparent). */
$kui-color-border-transparent: transparent;
/* Default text color (blue.100). */
$kui-color-text: #000933;
/* Text color for danger actions or messages (red.60). */
$kui-color-text-danger: #d60027;
/* Strong text color for danger actions or messages (red.70). */
$kui-color-text-danger-strong: #ad000e;
/* Text color for decorative purposes (aqua.50). */
$kui-color-text-decorative-aqua: #00abd2;
/* Text color for decorative purposes (pink.60). */
$kui-color-text-decorative-pink: #d60067;
/* Text color for decorative purposes (purple.60). */
$kui-color-text-decorative-purple: #6f28ff;
/* Strong text color for decorative purposes (purple.70). */
$kui-color-text-decorative-purple-strong: #5e00f5;
/* Text color for disabled elements (gray.40). */
$kui-color-text-disabled: #afb7c5;
/* Inverse text color (white). */
$kui-color-text-inverse: #ffffff;
/* Text color for neutral elements (gray.60). */
$kui-color-text-neutral: #6c7489;
/* Strong text color for neutral elements (gray.70). */
$kui-color-text-neutral-strong: #52596e;
/* Stronger text color for neutral elements (gray.80). */
$kui-color-text-neutral-stronger: #3a3f51;
/* Strongest text color for neutral elements (gray.90). */
$kui-color-text-neutral-strongest: #232633;
/* Weak text color for neutral elements (gray.40). */
$kui-color-text-neutral-weak: #afb7c5;
/* Weaker text color for neutral elements (gray.20). */
$kui-color-text-neutral-weaker: #e0e4ea;
/* Text color for primary actions or messages (blue.60). */
$kui-color-text-primary: #0044f4;
/* Strong text color for primary actions or messages (blue.70). */
$kui-color-text-primary-strong: #0030cc;
/* Stronger text color for primary actions or messages (blue.80). */
$kui-color-text-primary-stronger: #002099;
/* Strongest text color for primary actions or messages (blue.90). */
$kui-color-text-primary-strongest: #001466;
/* Weak text color for primary actions or messages (blue.40). */
$kui-color-text-primary-weak: #5f9aff;
/* Text color for success actions or messages (green.60). */
$kui-color-text-success: #007d60;
/* Strong text color for success actions or messages (green.70). */
$kui-color-text-success-strong: #005944;
/* Text color for warning actions or messages (yellow.60). */
$kui-color-text-warning: #995c00;
/* Text color for warning actions or messages (yellow.70). */
$kui-color-text-warning-strong: #804400;
/* Default transition timing */
$kui-animation-duration-20: 0.2s;
/* 0px border radius. */
$kui-border-radius-0: 0px;
/* 2px border radius. */
$kui-border-radius-10: 2px;
/* 4px border radius. */
$kui-border-radius-20: 4px;
/* 6px border radius. */
$kui-border-radius-30: 6px;
/* 8px border radius. */
$kui-border-radius-40: 8px;
/* 10px border radius. */
$kui-border-radius-50: 10px;
/* 50% border radius used to create circles. */
$kui-border-radius-circle: 50%;
/* 100px border radius used to create pill shapes. */
$kui-border-radius-round: 100px;
/* 0px border width. */
$kui-border-width-0: 0px;
/* 1px border width. */
$kui-border-width-10: 1px;
/* 2px border width. */
$kui-border-width-20: 2px;
/* 4px border width. */
$kui-border-width-30: 4px;
/* Used for larger mobile screens. Any viewport width under this value is considered mobile. */
$kui-breakpoint-mobile: 640px;
/* Used for tablet screens. */
$kui-breakpoint-phablet: 768px;
/* Used for larger tablet screens. Any viewport width less than this value will likely show a mobile layout. Any viewport width this value and greater will likely show a desktop layout. */
$kui-breakpoint-tablet: 1024px;
/* Used for standard desktop screens. */
$kui-breakpoint-laptop: 1280px;
/* Used for larger desktop screens. */
$kui-breakpoint-desktop: 1536px;
/* Danger color for icons. */
$kui-icon-color-danger: #f50045;
/* Neutral color for icons. */
$kui-icon-color-neutral: #828a9e;
/* Primary color for icons. */
$kui-icon-color-primary: #306fff;
/* Success color for icons. */
$kui-icon-color-success: #00a17b;
/* Warning color for icons. */
$kui-icon-color-warning: #ffc400;
/* 10px icon size. */
$kui-icon-size-10: 10px;
/* 12px icon size. */
$kui-icon-size-20: 12px;
/* 16px icon size. */
$kui-icon-size-30: 16px;
/* 20px icon size. */
$kui-icon-size-40: 20px;
/* 24px icon size (default). */
$kui-icon-size-50: 24px;
/* 32px icon size. */
$kui-icon-size-60: 32px;
/* 40px icon size. */
$kui-icon-size-70: 40px;
/* 48px icon size. */
$kui-icon-size-80: 48px;
/* Background color for the CONNECT method (purple.10). */
$kui-method-color-background-connect: #f1f0ff;
/* Background color for the DELETE method (red.10). */
$kui-method-color-background-delete: #ffe5e5;
/* Background color for the GET method (blue.10). */
$kui-method-color-background-get: #eefaff;
/* Background color for the HEAD method (gray.70). */
$kui-method-color-background-head: #52596e;
/* Background color for the OPTIONS method (gray.20). */
$kui-method-color-background-options: #e0e4ea;
/* Background color for the PATCH method (aqua.10). */
$kui-method-color-background-patch: #ecfcff;
/* Background color for the POST method (green.10). */
$kui-method-color-background-post: #ecfffb;
/* Background color for the PUT method (yellow.10). */
$kui-method-color-background-put: #fffce0;
/* Background color for the TRACE method (pink.10). */
$kui-method-color-background-trace: #fff0f7;
/* Text color for the CONNECT method (purple.60). */
$kui-method-color-text-connect: #6f28ff;
/* Strong text color for the CONNECT method (purple.70). */
$kui-method-color-text-connect-strong: #5e00f5;
/* Text color for the DELETE method (red.60). */
$kui-method-color-text-delete: #d60027;
/* Strong text color for the DELETE method (red.70). */
$kui-method-color-text-delete-strong: #ad000e;
/* Text color for the GET method (blue.60). */
$kui-method-color-text-get: #0044f4;
/* Strong text color for the GET method (blue.70). */
$kui-method-color-text-get-strong: #0030cc;
/* Text color for the HEAD method (gray.20). */
$kui-method-color-text-head: #e0e4ea;
/* Strong text color for the HEAD method (gray.40). */
$kui-method-color-text-head-strong: #afb7c5;
/* Text color for the OPTIONS method (gray.70). */
$kui-method-color-text-options: #52596e;
/* Strong text color for the OPTIONS method (gray.80). */
$kui-method-color-text-options-strong: #3a3f51;
/* Text color for the PATCH method (aqua.60). */
$kui-method-color-text-patch: #00819d;
/* Strong text color for the PATCH method (aqua.70). */
$kui-method-color-text-patch-strong: #00647a;
/* Text color for the POST method (green.60). */
$kui-method-color-text-post: #007d60;
/* Strong text color for the POST method (green.70). */
$kui-method-color-text-post-strong: #005944;
/* Text color for the PUT method (yellow.60). */
$kui-method-color-text-put: #995c00;
/* Strong text color for the PUT method (yellow.70). */
$kui-method-color-text-put-strong: #804400;
/* Text color for the TRACE method (pink.60). */
$kui-method-color-text-trace: #d60067;
/* Strong text color for the TRACE method (pink.70). */
$kui-method-color-text-trace-strong: #ad0053;
/* blue.100 */
$kui-navigation-color-background: #000933;
/* The background color of a selected navigation item. */
$kui-navigation-color-background-selected: rgba(255, 255, 255, 0.12);
/* rgba(white, 0.12) */
$kui-navigation-color-border: rgba(255, 255, 255, 0.12);
/* The border color for a selected child navigation item. */
$kui-navigation-color-border-child: #00fabe;
/* The color of the navigation section divider. */
$kui-navigation-color-border-divider: rgba(255, 255, 255, 0.24);
/* Navigation link and icon color. */
$kui-navigation-color-text: #bee2ff;
/* Navigation link and icon focus-visible color. */
$kui-navigation-color-text-focus: #ffffff;
/* Navigation link and icon hover color. */
$kui-navigation-color-text-hover: #eefaff;
/* Navigation link and icon selected color. */
$kui-navigation-color-text-selected: #00fabe;
/* The box-shadow for a focus-visible navigation link. */
$kui-navigation-shadow-border: 0 0 0 1px rgba(255, 255, 255, 0.12) inset;
/* The left box-shadow for an active child navigation link. */
$kui-navigation-shadow-border-child: 4px 0 0 0 #00fabe inset;
/* Navigation link focus-visible box-shadow. */
$kui-navigation-shadow-focus: 0 0 0 1px rgba(255, 255, 255, 0.60) inset;
/* Color representing response status code 100 (blue.20). */
$kui-status-color-100: #bee2ff;
/* Color representing response status code 101 (blue.30). */
$kui-status-color-101: #8fc1ff;
/* Color representing response status code 102 (blue.40). */
$kui-status-color-102: #5f9aff;
/* Color representing response status code 103 (blue.50). */
$kui-status-color-103: #306fff;
/* Color representing response status code 200 (green.20). */
$kui-status-color-200: #b5ffee;
/* Color representing response status code 201 (green.30). */
$kui-status-color-201: #00fabe;
/* Color representing response status code 202 (green.40). */
$kui-status-color-202: #00d6a4;
/* Color representing response status code 203 (green.50). */
$kui-status-color-203: #00a17b;
/* Color representing response status code 204 (green.60). */
$kui-status-color-204: #007d60;
/* Color representing response status code 205 (green.70). */
$kui-status-color-205: #005944;
/* Color representing response status code 206 (green.20). */
$kui-status-color-206: #b5ffee;
/* Color representing response status code 207 (green.30). */
$kui-status-color-207: #00fabe;
/* Color representing response status code 208 (green.40). */
$kui-status-color-208: #b5ffee;
/* Color representing response status code 226 (green.50). */
$kui-status-color-226: #00a17b;
/* Color representing response status code 100 (yellow.20). */
$kui-status-color-300: #fff296;
/* Color representing response status code 101 (yellow.30). */
$kui-status-color-301: #ffe04b;
/* Color representing response status code 102 (yellow.40). */
$kui-status-color-302: #ffc400;
/* Color representing response status code 103 (yellow.50). */
$kui-status-color-303: #b37600;
/* Color representing response status code 103 (yellow.60). */
$kui-status-color-304: #995c00;
/* Color representing response status code 103 (yellow.70). */
$kui-status-color-305: #804400;
/* Color representing response status code 103 (yellow.20). */
$kui-status-color-307: #fff296;
/* Color representing response status code 103 (yellow.30). */
$kui-status-color-308: #ffe04b;
/* Color representing response status code 400 (orange.20). */
$kui-status-color-400: #FFC2B3;
/* Color representing response status code 401 (orange.30). */
$kui-status-color-401: #FF9877;
/* Color representing response status code 402 (orange.40). */
$kui-status-color-402: #FF723C;
/* Color representing response status code 403 (orange.50). */
$kui-status-color-403: #F75008;
/* Color representing response status code 404 (orange.60). */
$kui-status-color-404: #D13500;
/* Color representing response status code 405 (orange.70). */
$kui-status-color-405: #A31F00;
/* Color representing response status code 406 (orange.20). */
$kui-status-color-406: #FFC2B3;
/* Color representing response status code 407 (orange.30). */
$kui-status-color-407: #FF9877;
/* Color representing response status code 408 (orange.40). */
$kui-status-color-408: #FF723C;
/* Color representing response status code 409 (orange.50). */
$kui-status-color-409: #F75008;
/* Color representing response status code 410 (orange.60). */
$kui-status-color-410: #D13500;
/* Color representing response status code 411 (orange.70). */
$kui-status-color-411: #A31F00;
/* Color representing response status code 412 (orange.20). */
$kui-status-color-412: #FFC2B3;
/* Color representing response status code 413 (orange.30). */
$kui-status-color-413: #FF9877;
/* Color representing response status code 414 (orange.40). */
$kui-status-color-414: #FF723C;
/* Color representing response status code 415 (orange.50). */
$kui-status-color-415: #F75008;
/* Color representing response status code 416 (orange.60). */
$kui-status-color-416: #D13500;
/* Color representing response status code 417 (orange.70). */
$kui-status-color-417: #A31F00;
/* Color representing response status code 418 (orange.20). */
$kui-status-color-418: #FFC2B3;
/* Color representing response status code 421 (orange.30). */
$kui-status-color-421: #FF9877;
/* Color representing response status code 422 (orange.40). */
$kui-status-color-422: #FF723C;
/* Color representing response status code 423 (orange.50). */
$kui-status-color-423: #F75008;
/* Color representing response status code 424 (orange.60). */
$kui-status-color-424: #D13500;
/* Color representing response status code 425 (orange.70). */
$kui-status-color-425: #A31F00;
/* Color representing response status code 426 (orange.20). */
$kui-status-color-426: #FFC2B3;
/* Color representing response status code 428 (orange.30). */
$kui-status-color-428: #FF9877;
/* Color representing response status code 429 (orange.40). */
$kui-status-color-429: #FF723C;
/* Color representing response status code 431 (orange.50). */
$kui-status-color-431: #F75008;
/* Color representing response status code 451 (orange.60). */
$kui-status-color-451: #D13500;
/* Color representing response status code 500 (red.20). */
$kui-status-color-500: #ffabab;
/* Color representing response status code 501 (red.30). */
$kui-status-color-501: #ff7272;
/* Color representing response status code 502 (red.40). */
$kui-status-color-502: #ff3954;
/* Color representing response status code 503 (red.50). */
$kui-status-color-503: #f50045;
/* Color representing response status code 504 (red.60). */
$kui-status-color-504: #d60027;
/* Color representing response status code 505 (red.70). */
$kui-status-color-505: #ad000e;
/* Color representing response status code 506 (red.20). */
$kui-status-color-506: #ffabab;
/* Color representing response status code 507 (red.30). */
$kui-status-color-507: #ff7272;
/* Color representing response status code 508 (red.40). */
$kui-status-color-508: #ff3954;
/* Color representing response status code 510 (red.50). */
$kui-status-color-510: #f50045;
/* Color representing response status code 511 (red.60). */
$kui-status-color-511: #d60027;
/* Color for unknown response status codes in the 100-199 range (blue.10). */
$kui-status-color-1na: #eefaff;
/* Color for unknown response status codes in the 200-299 range (green.10). */
$kui-status-color-2na: #ecfffb;
/* Color for unknown response status codes in the 300-399 range (yellow.10). */
$kui-status-color-3na: #fffce0;
/* Color for unknown response status codes in the 400-499 range (orange.10). */
$kui-status-color-4na: #FFF1EF;
/* Color for unknown response status codes in the 500-599 range (red.10). */
$kui-status-color-5na: #ffe5e5;
/* Color for a group of response status codes in the 100-199 range (blue.40). */
$kui-status-color-100s: #5f9aff;
/* Color for a group of response status codes in the 200-299 range (green.40). */
$kui-status-color-200s: #00d6a4;
/* Color for a group of response status codes in the 300-399 range (yellow.40). */
$kui-status-color-300s: #ffc400;
/* Color for a group of response status codes in the 400-499 range (orange.40). */
$kui-status-color-400s: #FF723C;
/* Color for a group of response status codes in the 500-599 range (red.40). */
$kui-status-color-500s: #ff3954;
/* The standard monospace text font family. Typically used for code blocks, inline code, and copyable text. */
$kui-font-family-code: 'JetBrains Mono', Consolas, monospace;
/* The standard heading text font family. */
$kui-font-family-heading: 'Inter', Roboto, Helvetica, sans-serif;
/* The standard text font family. */
$kui-font-family-text: 'Inter', Roboto, Helvetica, sans-serif;
$kui-font-size-10: 10px;
$kui-font-size-20: 12px;
$kui-font-size-30: 14px;
$kui-font-size-40: 16px;
$kui-font-size-50: 18px;
$kui-font-size-60: 20px;
$kui-font-size-70: 24px;
$kui-font-size-80: 32px;
$kui-font-size-90: 40px;
$kui-font-size-100: 48px;
/* 700 */
$kui-font-weight-bold: 700;
/* 500 */
$kui-font-weight-medium: 500;
/* 400: The normal font weight. */
$kui-font-weight-regular: 400;
/* 600 */
$kui-font-weight-semibold: 600;
/* Alias for letter-spacing-normal */
$kui-letter-spacing-0: normal;
/* -0.12px */
$kui-letter-spacing-minus-10: -0.12px;
/* -0.24px */
$kui-letter-spacing-minus-20: -0.24px;
/* -0.32px */
$kui-letter-spacing-minus-30: -0.32px;
/* -0.4px */
$kui-letter-spacing-minus-40: -0.4px;
/* -0.48px */
$kui-letter-spacing-minus-50: -0.48px;
/* normal */
$kui-letter-spacing-normal: normal;
/* 12px */
$kui-line-height-10: 12px;
/* 16px */
$kui-line-height-20: 16px;
/* 20px */
$kui-line-height-30: 20px;
/* 24px */
$kui-line-height-40: 24px;
/* 28px */
$kui-line-height-50: 28px;
/* 32px */
$kui-line-height-60: 32px;
/* 36px */
$kui-line-height-70: 36px;
/* 40px */
$kui-line-height-80: 40px;
/* 48px */
$kui-line-height-90: 48px;
/* 56px */
$kui-line-height-100: 56px;
/* 0px 4px 20px 0px rgba(0, 0, 0, 0.08) */
$kui-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.08);
/* 0px 0px 0px 1px gray.20 inset */
$kui-shadow-border: 0px 0px 0px 1px #e0e4ea inset;
/* 0px 0px 0px 1px red.60 inset */
$kui-shadow-border-danger: 0px 0px 0px 1px #d60027 inset;
/* 0px 0px 0px 1px red.70 inset */
$kui-shadow-border-danger-strong: 0px 0px 0px 1px #ad000e inset;
/* 0px 0px 0px 1px gray.20 inset */
$kui-shadow-border-disabled: 0px 0px 0px 1px #e0e4ea inset;
/* 0px 0px 0px 1px blue.60 inset */
$kui-shadow-border-primary: 0px 0px 0px 1px #0044f4 inset;
/* 0px 0px 0px 1px blue.90 inset */
$kui-shadow-border-primary-strongest: 0px 0px 0px 1px #001466 inset;
/* 0px 0px 0px 1px blue.40 inset */
$kui-shadow-border-primary-weak: 0px 0px 0px 1px #5f9aff inset;
/* 0px 0px 0px 4px rgba(0, 68, 244, 0.2) */
$kui-shadow-focus: 0px 0px 0px 4px rgba(0, 68, 244, 0.2);
/* 0px value for gaps, margin, or padding. */
$kui-space-0: 0px;
/* 2px value for gaps, margin, or padding. */
$kui-space-10: 2px;
/* 4px value for gaps, margin, or padding. */
$kui-space-20: 4px;
/* 6px value for gaps, margin, or padding. */
$kui-space-30: 6px;
/* 8px value for gaps, margin, or padding. */
$kui-space-40: 8px;
/* 12px value for gaps, margin, or padding. */
$kui-space-50: 12px;
/* 16px value for gaps, margin, or padding. */
$kui-space-60: 16px;
/* 20px value for gaps, margin, or padding. */
$kui-space-70: 20px;
/* 24px value for gaps, margin, or padding. */
$kui-space-80: 24px;
/* 32px value for gaps, margin, or padding. */
$kui-space-90: 32px;
/* 40px value for gaps, margin, or padding. */
$kui-space-100: 40px;
/* 48px value for gaps, margin, or padding. */
$kui-space-110: 48px;
/* 56px value for gaps, margin, or padding. */
$kui-space-120: 56px;
/* 64px value for gaps, margin, or padding. */
$kui-space-130: 64px;
/* 80px value for gaps, margin, or padding. */
$kui-space-140: 80px;
/* 96px value for gaps, margin, or padding. */
$kui-space-150: 96px;
/* auto */
$kui-space-auto: auto;
`

function serializeTokens() {
	return Tokens.split('\n').filter(line => {
		return line.startsWith(`$kui`)
	})
}

function prefixMatch(valuePrefixes: string[], prefix: string): string[] {
	const p = prefix.toLocaleLowerCase()
	return valuePrefixes.filter(valuePrefix => {
		return valuePrefix.startsWith(p)
	})
}

export function activate(context: vscode.ExtensionContext) {

	const tokens = serializeTokens()

	const provider1 = vscode.languages.registerCompletionItemProvider({
		language: 'vue',
		scheme: 'file',
	}, {
		provideCompletionItems(document, position, token, context) {
			const text = document.getText();
			const styleStart = text.indexOf('<style');
			const styleEnd = text.indexOf('</style>');
			const offset = document.offsetAt(position);

			if ((styleStart === -1 || styleEnd === -1) || (offset < styleStart || offset > styleEnd)) {
				return [];
			}

			const line = document.lineAt(position).text;
			const cssPropertyMatch = line.match(/([a-zA-Z-]+):\s*([^;]*)/);

			let cssProperty = ''

			if (cssPropertyMatch) {
				cssProperty = cssPropertyMatch[1];
			}

			if (!PROPERTY_TOKEN_MAP[cssProperty]) {
				return []
			}

			const availableTokens = PROPERTY_TOKEN_MAP[cssProperty].map(token => `$kui-${token}`)

			const matchedTokens = availableTokens.flatMap(prefix => {
				return prefixMatch(tokens, prefix)
			})

			return matchedTokens.map(token => {
				const [key] = token.split(':')
				const item = new vscode.CompletionItem(token, vscode.CompletionItemKind.Value)
				item.insertText = key
				return item
			})
		}
	}, ' ', ':', '$');

	context.subscriptions.push(provider1);
}


