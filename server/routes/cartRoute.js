import express from "express";

import { AddToCart ,getCart } from "../controlers/cartControlers.js";


const cartRouter = express.Router();

cartRouter.post("/add", AddToCart);
cartRouter.get("/getCart" ,getCart); 
    


export default cartRouter;
