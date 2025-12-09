import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CategoryImage from "../assets/Images/ShopCategory.jpg";
import { GetAllProducts } from "../reduxToolkit/slices/GetAllProducts";
import { supabase } from "../utils/supabase";
import { addItemToCart } from "../reduxToolkit/slices/CartSlice";

const ProductCardDetails = ({ product }) => {
  const dispatch = useDispatch();
  if (!product) {
    return (
      <div className="!my-10 text-center">
        <p className="text-white">Loading product...</p>
      </div>
    );
  }

  return (
    <div className="!my-10">
      <h2 className="text-white text-[64px] font-semibold !my-4 text-center">
        {product.name || "Product"}
      </h2>
      <div className="w-full flex flex-row !px-4 !py-3 rounded-2xl gap-6 bg-[#000000a9] max-md:flex-col">
        <div className="w-[500px] max-md:w-full">
          <img
            src={product.image || CategoryImage}
            className="w-full h-auto rounded-2xl"
          />
        </div>
        <div className="w-full flex flex-col !p-2 text-left">
          <h3 className="text-white text-[36px] font-medium">{product.name}</h3>
          <p className="font-medium text-[20px] text-gray-300 !my-4">
            {product.description}
          </p>
          <span className="text-red-500 text-[28px] font-semibold !my-4">
            {product.price ? `${product.price}$` : "—"}
          </span>
          <button
            onClick={() => dispatch(addItemToCart({ product }))}
            className="bg-red-600 w-[350px] cursor-pointer text-[20px] !px-2 !py-2 rounded-full text-white font-semibold hover:bg-red-700 transition !my-6"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

const ProductDetailsHeroSection = ({ title }) => {
  return (
    <div className="ShopHeroSec relative w-full h-[50dvh] flex flex-col justify-center align-middle items-center py-10 ">
      <div className="absolute inset-0 bg-[#0000009f]"></div>
      <h1 className="text-white text-4xl font-bold z-10">
        {title || "Product Details"}
      </h1>
    </div>
  );
};

const ProductDetails = () => {
  const { id } = useParams();
  const [productId, setProductId] = useState(id || null);
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();

  const productsState = useSelector((state) => state.Products || {});
  const productsData =
    productsState.productsData || productsState.ProductData || [];

  useEffect(() => {
    setProductId(id || null);
  }, [id]);

  useEffect(() => {
    if (!productsData || productsData.length === 0) {
      dispatch(GetAllProducts());
    }
  }, [dispatch, productsData]);

  useEffect(() => {
    if (!productId) return;

    const found = (productsData || []).find(
      (p) => String(p.id) === String(productId)
    );
    if (found) {
      setProduct(found);
      return;
    }

    let mounted = true;
    (async () => {
      try {
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .eq("id", productId)
          .single();
        if (!mounted) return;
        if (error) {
          console.error("Supabase fetch error:", error);
          return;
        }
        setProduct(data);
      } catch (e) {
        console.error(e);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [productId, productsData]);

  return (
    <div className="w-full">
      <ProductDetailsHeroSection title={product?.name || "Product Details"} />
      <ProductCardDetails product={product} />
    </div>
  );
};

export default ProductDetails;
