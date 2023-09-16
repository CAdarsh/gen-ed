import express from "express";
import { UserDoc } from "../../models/User/User.js";

// augment current user property to req
declare global {
  namespace Express {
    interface Request {
      currentUser?: UserDoc
    }
  }
}