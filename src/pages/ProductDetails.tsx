import { Link, useParams } from "react-router-dom";
import { Product } from "../models";
import React, { useEffect, useState, useMemo, useCallback } from "react";
import axios from "axios";

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await axios.get(`http://localhost:3001/products/${id}`);
      setProduct(response.data);
    };
    fetchProduct();
  }, [id]);

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="flex flex-row justify-center gap-20 items-center bg-white rounded-3xl shadow-2xl p-20 w-[90%]">
        <Link
          to="/"
          className="fixed top-5 left-5 text-2xl font-semibold text-black"
        >
          Back to products
        </Link>
        <img className="w-[500px]" src={product?.image} alt={product?.name} />
        <div className="flex flex-col justify-center items-center gap-2 w-full">
          <h1 className="text-4xl font-bold">{product?.name}</h1>
          <p className="text-2xl font-semibold">{product?.description}</p>
          <button className="text-2xl font-semibold bg-green-500 text-white rounded-3xl px-4 py-2">
            Buy for {product?.price}$
          </button>
          <p className="text-2xl font-semibold">
            Quantity: {product?.quantity}
          </p>
        </div>
      </div>
    </div>
  );
};
export default ProductDetails;
