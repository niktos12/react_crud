import React from "react";
import { Product } from "../models";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";
import axios from "axios";

interface ProductListProps {
  products: Product[];
  deleteProduct: (id: number) => void;
}

const ProductList: React.FC<ProductListProps> = ({
  products,
  deleteProduct,
}) => {
  const productArray = Array.isArray(products) ? products : [];
  return (
    <>
      <h1 className="text-3xl font-bold underline">Product List</h1>
      <div className="grid grid-cols-3 gap-4">
        {productArray.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            deleteProduct={deleteProduct}
          />
        ))}
      </div>
      <Link to="/create">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded fixed bottom-5 right-5 z-10 ">
          Add Product
        </button>
      </Link>
    </>
  );
};
export default ProductList;
