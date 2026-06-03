import Product from "../models/productModel.js";

const getAllProducts = async (req,res)=>{
  try{
     const products= await Product.find();
     res.status(200).json(products);
  }
  catch(error){
    res.status(500).json({message:error.message});
  };


};

const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createProduct =async (req,res)=>{
    const { name, price, description, image, category, stock, rating, size, color } = req.body;
    try{
        const newProduct = new Product({
            name,
            price,
            description,
            image,
            category,
            stock,
            rating,
            size,
            color
        });
        await newProduct.save();
        res.status(201).json(newProduct);
    }catch(error){
        res.status(500).json({message:error.message});
    }
};
 
const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try{
        const product= await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).json({message:"Product not found"});
        }
        res.status(200).json({message:"Product deleted successfully"});
    }catch(error){
        res.status(500).json({message:error.message});
    }
};
const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, price, description, image, category, stock, rating, size, color } = req.body;
    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, {
            name,
            price,
            description,
            image,
            category,
            stock,
            rating,
            size,
            color
        }, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export { getAllProducts, getProductById, createProduct, deleteProduct , updateProduct };