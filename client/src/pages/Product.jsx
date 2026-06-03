import React, { useEffect, useState } from "react";
import ProductGrid from "../components/Products/ProductGrid";
import { ProductFilter } from "../components/Products/FilterGroup";
import Loader from "@components/Common/Loader";

export default function Product() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter states
  const [categories, setCategories] = useState([]);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [availability, setAvailability] = useState("");
  const [priceRange, setPriceRange] = useState([0, 300]);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Detect mobile screen
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("http://localhost:3000/product/getAllProducts");
        const data = await res.json();
        setProducts(Array.isArray(data) ? data : []);
      } catch (err) {
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Filtering logic
  const filteredProducts = products.filter((product) => {
    // Category filter
    const categoryMatch =
      categories.length === 0 ||
      categories.includes(product.category);

    // Color filter
    const productColors = Array.isArray(product.color)
      ? product.color
      : [product.color].filter(Boolean);
    const colorMatch =
      colors.length === 0 ||
      productColors.some((c) => colors.includes(c));

    // Size filter
    const productSizes = Array.isArray(product.size)
      ? product.size
      : [product.size].filter(Boolean);
    const sizeMatch =
      sizes.length === 0 ||
      productSizes.some((s) => sizes.includes(s));

    // Availability filter
    const inStock = product.stock === undefined ? true : !!product.stock;
    const availabilityMatch =
      availability === "" ||
      (availability === "In Stock" && inStock) ||
      (availability === "Out of Stock" && !inStock);

    // Price filter
    const priceNum = typeof product.price === "number"
      ? product.price
      : Number(String(product.price).replace(/[^0-9.]/g, "") || 0);
    const priceMatch =
      priceNum >= priceRange[0] && priceNum <= priceRange[1];

    return (
      categoryMatch &&
      colorMatch &&
      sizeMatch &&
      availabilityMatch &&
      priceMatch
    );
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500 text-lg">
        <Loader/>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row gap-6 p-4">
      <ProductFilter
        categories={categories}
        setCategories={setCategories}
        colors={colors}
        setColors={setColors}
        sizes={sizes}
        setSizes={setSizes}
        availability={availability}
        setAvailability={setAvailability}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        showMobileFilters={showMobileFilters}
        setShowMobileFilters={setShowMobileFilters}
        isMobile={isMobile}
      />
      <div className="flex-1">
        <ProductGrid products={filteredProducts} />
      </div>
    </div>
  );
}