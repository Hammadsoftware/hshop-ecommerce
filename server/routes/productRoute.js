import express from "express";
import multer from "multer";
import { getAllProducts, getProductById, createProduct, deleteProduct, updateProduct } from "../controlers/productControlers.js";

const productRouter = express.Router();
const upload = multer(); // You can configure storage if needed

productRouter.get("/getAllProducts", getAllProducts);
productRouter.get("/getProductById/:id", getProductById);
// Use multer middleware for multipart/form-data
productRouter.post("/createProduct", upload.single("image"), createProduct);
productRouter.delete("/deleteProduct/:id", deleteProduct);
productRouter.put("/updateProduct/:id", updateProduct);

export default productRouter;