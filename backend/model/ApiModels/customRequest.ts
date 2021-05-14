import { Request } from "express";

export default interface CustomRequest extends Request {
  userData: {
    id: number;
  };
}