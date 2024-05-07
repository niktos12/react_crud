import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddProduct from "./components/AddProduct";
import ProductList from "./pages/ProductList";
import { useEffect, useState } from "react";
import axios from "axios";
import { Product } from "./models";
import ProductDetails from "./pages/ProductDetails";
import EditProduct from "./components/EditProduct";

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    axios
      .get("http://localhost:3001/products")
      .then((response) => setProducts(response.data));
  }, []);
  const deleteProduct = (id: number) => {
    axios
      .delete(`http://localhost:3001/products/${id}`)
      .then((response) => {
        const newProducts = response.data.filter((product : Product) => product.id !== id);
        setProducts(newProducts);
      }).catch((error) => {
        console.log(error);
      })
  }
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductList products={products} deleteProduct={deleteProduct}/>} />
        <Route
          path="/create"
          element={<AddProduct products={products} setProducts={setProducts} />}
        />
        <Route path="/edit/:id" element={<EditProduct setProducts={setProducts} />} />
        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
