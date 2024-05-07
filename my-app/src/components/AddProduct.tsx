import { useState } from "react";
import { Product, ProductInput, productSchema } from "../models";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import DialogWindow from "./DialogWindow";

interface AddProductProps {
  setProducts: any;
  products: Product[];
}
const AddProduct: React.FC<AddProductProps> = ({ setProducts, products }) => {
  const navigate = useNavigate();
  const backToProductList = () => {
    navigate("/");
  };
  const [open, setOpen] = useState(false);
  const onSubmit = (e: any) => {
    axios
      .post("http://localhost:3001/products", {
        name,
        price,
        image,
        description,
        quantity,
      })
      .then((response) => {
        setProducts([...products, response.data]);
        reset();
        backToProductList();
      });
  };

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<ProductInput>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      price: 0,
      image: "",
      description: "",
      quantity: 1,
    },
  });
  const name = watch("name");
  const price = watch("price");
  const image = watch("image");
  const description = watch("description");
  const quantity = watch("quantity");

  return (
    <>
    <DialogWindow backToProductList={backToProductList} isDialogOpen={open} setIsDialogOpen={setOpen}/>
      <form className="bg-white rounded w-[500px] p-5 rounded bg-white z-40 left-1/2 shadow-2xl -translate-x-1/2 fixed translate-y-1/2">
        <div>
          <label htmlFor="name" className="block text-gray-700 mb-2">
            Name
          </label>
          <input
            {...register("name")}
            id="name"
            value={name}
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
            value={price}
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
            value={description}
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
            value={image}
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
          <input
            {...register("quantity", { valueAsNumber: true })}
            id="quantity"
            value={quantity}
            type="number"
            className="border p-2 w-full"
            required
          />
          {errors.quantity && (
            <p className="text-red-500">{errors.quantity.message}</p>
          )}
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
            Add Product
          </button>
        </div>
      </form>
    </>
  );
};
export default AddProduct;
