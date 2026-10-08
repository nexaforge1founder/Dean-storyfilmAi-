// Minimal ambient shim used ONLY to let `tsc` parse/syntax-check TSX in this
// sandbox, which has no network access to install @types/react. This is NOT
// a substitute for real type-checking against the actual React/Next types —
// run `npm install` and a real `tsc`/`next build` in a networked environment
// before trusting this beyond "the syntax is valid TypeScript/JSX and these
// modules/exports exist".
declare const process: { env: Record<string, string | undefined> };
declare module "*.css";

interface ReactShim {
  FC: any; ReactNode: any; CSSProperties: any;
  MouseEvent: any; ChangeEvent: any; FormEvent: any;
  useState: <T = any>(initial: T | (() => T)) => [T, (v: T | ((prev: T) => T)) => void];
  useEffect: (fn: () => void | (() => void), deps?: any[]) => void;
  useRef: <T = any>(initial?: T) => { current: T };
  useCallback: <T extends (...args: any[]) => any>(fn: T, deps: any[]) => T;
  useMemo: <T>(fn: () => T, deps: any[]) => T;
  [key: string]: any;
}

declare module "react" {
  const React: ReactShim;
  export type ReactNode = any;
  export type FC<P = any> = (props: P) => any;
  export type CSSProperties = { [key: string]: any };
  export type MouseEvent<T = any> = any;
  export type ChangeEvent<T = any> = any;
  export type FormEvent<T = any> = any;
  export const useState: ReactShim["useState"];
  export const useEffect: ReactShim["useEffect"];
  export const useRef: ReactShim["useRef"];
  export const useCallback: ReactShim["useCallback"];
  export const useMemo: ReactShim["useMemo"];
  export default React;
}
declare module "react/jsx-runtime" { const x: any; export = x; }
declare module "react/jsx-dev-runtime" { const x: any; export = x; }
declare module "react-dom" { const x: any; export default x; }
declare module "react-dom/client" { const x: any; export default x; }
declare module "next" {
  export interface Metadata { title?: string; description?: string; [key: string]: any }
}
declare module "next/link" { const Link: any; export default Link; }
declare module "next/navigation" {
  export function useRouter(): any;
  export function usePathname(): string;
  export function useParams(): any;
}
declare module "next/image" { const Image: any; export default Image; }
declare module "lucide-react" {
  export const Home: any; export const FolderOpen: any; export const Users: any;
  export const Mountain: any; export const Boxes: any; export const Clapperboard: any;
  export const ListVideo: any; export const Store: any; export const Cpu: any;
  export const Settings: any; export const Brain: any; export const ChevronDown: any;
  export const ChevronUp: any; export const ChevronLeft: any; export const ChevronRight: any;
  export const Play: any; export const Pause: any; export const Square: any;
  export const SkipBack: any; export const SkipForward: any; export const Layers: any;
  export const Eye: any; export const Sparkles: any; export const RotateCcw: any;
  export const X: any; export const Check: any; export const AlertTriangle: any;
  export const Clock: any; export const Flame: any; export const Mail: any;
  export const Lock: any; export const User: any; export const ArrowRight: any;
  export const LogOut: any; export const Loader2: any; export const Pause2: any;
  export const Film: any; export const HardDrive: any; export const Activity: any;
}
declare namespace JSX {
  interface IntrinsicElements { [elemName: string]: any }
  interface Element { }
}
