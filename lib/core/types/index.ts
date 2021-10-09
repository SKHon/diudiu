import Koa from "koa"
export interface Hook {
  default: (app: any) => void;
} 

export interface App extends Koa {
  appPath: string;
  extName: string;
  config: any;
}

type Signals =
        "SIGABRT" | "SIGALRM" | "SIGBUS" | "SIGCHLD" | "SIGCONT" | "SIGFPE" | "SIGHUP" | "SIGILL" | "SIGINT" | "SIGIO" |
        "SIGIOT" | "SIGKILL" | "SIGPIPE" | "SIGPOLL" | "SIGPROF" | "SIGPWR" | "SIGQUIT" | "SIGSEGV" | "SIGSTKFLT" |
        "SIGSTOP" | "SIGSYS" | "SIGTERM" | "SIGTRAP" | "SIGTSTP" | "SIGTTIN" | "SIGTTOU" | "SIGUNUSED" | "SIGURG" |
        "SIGUSR1" | "SIGUSR2" | "SIGVTALRM" | "SIGWINCH" | "SIGXCPU" | "SIGXFSZ" | "SIGBREAK" | "SIGLOST" | "SIGINFO";
type MultipleResolveType = 'resolve' | 'reject';
type MultipleResolveListener = (type: MultipleResolveType, promise: Promise<any>, value: any) => void;
type BeforeExitListener = (code: number) => void;
type DisconnectListener = () => void;
type ExitListener = (code: number) => void;
type RejectionHandledListener = (promise: Promise<any>) => void;
type UncaughtExceptionListener = (error: Error) => void;
type UnhandledRejectionListener = (reason: {} | null | undefined, promise: Promise<any>) => void;
type WarningListener = (warning: Error) => void;
type MessageListener = (message: any, sendHandle: any) => void;
type SignalsListener = (signal: Signals) => void;
type NewListenerListener = (type: string | symbol, listener: (...args: any[]) => void) => void;
type RemoveListenerListener = (type: string | symbol, listener: (...args: any[]) => void) => void;



export interface DiudiuProcess extends NodeJS.Process {
  emit(event: "error", listener: any);
  emit(event: "error", listener: any);
  emit(event: "error", listener: any);
  emit(event: "beforeExit", code: number): boolean;
  emit(event: "disconnect"): boolean;
  emit(event: "exit", code: number): boolean;
  emit(event: "rejectionHandled", promise: Promise<any>): boolean;
  emit(event: "uncaughtException", error: Error): boolean;
  emit(event: "unhandledRejection", reason: any, promise: Promise<any>): boolean;
  emit(event: "warning", warning: Error): boolean;
  emit(event: "message", message: any, sendHandle: any): this;
  emit(event: Signals, signal: Signals): boolean;
  emit(event: "newListener", eventName: string | symbol, listener: (...args: any[]) => void): this;
  emit(event: "removeListener", eventName: string, listener: (...args: any[]) => void): this;
  emit(event: "multipleResolves", listener: MultipleResolveListener): this;
  emit(event: string|Symbol, message: Error): boolean;
  emit(event: string|Symbol, message: any): any;
 

  on(event: "beforeExit", listener: BeforeExitListener): this;
  on(event: "disconnect", listener: DisconnectListener): this;
  on(event: "exit", listener: ExitListener): this;
  on(event: "rejectionHandled", listener: RejectionHandledListener): this;
  on(event: "uncaughtException", listener: UncaughtExceptionListener): this;
  on(event: "unhandledRejection", listener: UnhandledRejectionListener): this;
  on(event: "warning", listener: WarningListener): this;
  on(event: "message", listener: MessageListener): this;
  on(event: Signals, listener: SignalsListener): this;
  on(event: "newListener", listener: NewListenerListener): this;
  on(event: "removeListener", listener: RemoveListenerListener): this;
  on(event: "multipleResolves", listener: MultipleResolveListener): this;
  on(event: string|Symbol, listener: MessageListener): this;
 
}