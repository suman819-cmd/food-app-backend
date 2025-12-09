// import { TPayload } from "./types/payload.type";
// declare global {
//   declare namespace Express {
//     export interface Request {
//       user?: TPayload;
//     }
//   }
// }






import { TPayload } from "./types/payload.type";

declare global {
  namespace Express {
    export interface Request {
      user?: TPayload; // optional because not every route has authenticated user
    }
  }
}

export {};
