import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Product, productSchema } from "../models";
import DialogWindow from "./DialogWindow";

interface EditProductProps {
  setProducts: (products: Product[]) => void;
}

const EditProduct: React.FC<EditProductProps> = ({ setProducts }) => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Product>({
    resolver: zodResolver(productSchema),
  });
  const backToProductList = () => {
    navigate("/");
  };
  const incrementQuantity = () => {
    setValue("quantity", Number(watch("quantity")) + 1);
  };

  const decrementQuantity = () => {
    const currentQuantity = Number(watch("quantity"));
    if (currentQuantity > 1) {
      setValue("quantity", currentQuantity - 1);
    }
  };

  useEffect(() => {
    axios
      .get<Product>(`http://localhost:3001/products/${id}`)
      .then((response) => {
        reset(response.data);
      })
      .catch((error) => {
        console.error("Ошибка при получении продукта:", error);
      });
  }, [id, reset]);

  const onSubmit = (updatedProduct: Product) => {
    axios
      .put<Product>(`http://localhost:3001/products/${id}`, updatedProduct)
      .then(() => {
        axios
          .get<Product[]>("http://localhost:3001/products")
          .then((response) => {
            setProducts(response.data);
            navigate("/");
          })
          .catch((error) => {
            console.error("Ошибка при получении списка продуктов:", error);
          });
      })
      .catch((error) => {
        console.error("Ошибка при обновлении продукта:", error);
      });
  };

  return (
    <>
      <DialogWindow
        backToProductList={backToProductList}
        isDialogOpen={open}
        setIsDialogOpen={setOpen}
      />
      <form className="bg-white rounded w-[500px] p-5 rounded bg-white z-40 left-1/2 shadow-2xl -translate-x-1/2 fixed translate-y-1/2">
        <div>
          <label htmlFor="name" className="block text-gray-700 mb-2">
            Name
          </label>
          <input
            {...register("name")}
            id="name"
            type="text"
            className="border p-2 w-full"
            required
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>
        <div>
          <label htmlFor="price" className="block text-gray-700 mb-2">
            Price
          </label>
          <input
            {...register("price", { valueAsNumber: true })}
            id="price"
            type="number"
            className="border p-2 w-full"
            required
          />
          {errors.price && (
            <p className="text-red-500">{errors.price.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="description" className="block text-gray-700 mb-2">
            Description
          </label>
          <input
            {...register("description")}
            id="description"
            type="text"
            className="border p-2 w-full"
            required
          />
          {errors.description && (
            <p className="text-red-500">{errors.description.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="image" className="block text-gray-700 mb-2">
            Image
          </label>
          <input
            {...register("image")}
            id="image"
            type="text"
            className="border p-2 w-full"
            required
          />
          {errors.image && (
            <p className="text-red-500">{errors.image.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="quantity" className="block text-gray-700 mb-2">
            Quantity
          </label>
          <div className="flex items-center">
            <input
              {...register("quantity", { valueAsNumber: true })}
              type="number"
              id="quantity"
              className="border p-2 w-full"
              required
            />
            <button
              type="button"
              onClick={decrementQuantity}
              className="border p-2 rounded-l-md"
            >
              -
            </button>
            <button
              type="button"
              onClick={incrementQuantity}
              className="border p-2 rounded-r-md"
            >
              +
            </button>
          </div>
        </div>
        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleSubmit(onSubmit)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
          >
            Save Changes
          </button>
        </div>
      </form>
    </>
  );
};
export default EditProduct;
