import Koa from "koa"
export interface Hook {
  default: (app: any) => void;
} 

export interface App extends Koa {
  appPath: string;
  extName: string;
  config: any;
}