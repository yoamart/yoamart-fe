"use client";

import { useDispatch, useSelector } from "react-redux";
import { CartType, RootState, Product } from "@/lib/types";
import { removeFromCart, clearCart, getTotals, decreaseCartQuantity, addToCart } from "@/redux/slices/cartSlice";
import { useCreateOrderMutation } from "@/redux/appData";
import React from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useCart = () => {
    const dispatch = useDispatch();
    const cart = useSelector((state: { cart: CartType }) => state.cart);
    const session = useSelector((state: RootState) => state.auth.userData);
    const router = useRouter()

    const [createOrder, { isLoading, isSuccess, isError, error }] =
        useCreateOrderMutation();

    React.useEffect(() => {
        dispatch(getTotals());
    }, [dispatch]);

    const handleRemoveFromCart = (product: Product) => {
        dispatch(removeFromCart(product));
    };

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    const handleDecreaseQuantity = (item: Product) => {
        dispatch(decreaseCartQuantity(item));
    };

    const handleAddToCart = (datas: Product) => {
        dispatch(addToCart({ datas, router }));
    };


    const handleCheckout = async () => {
        try {
            const cartData = cart.cartItems.map((item) => ({
                id: item?._id,
                name: item.name,
                category: item.categoryId,
                price: item.price,
                image: item.image,
                quantity: item.cartQuantity,
            }));

            const credentials = {
                name: session?.name || "",
                email: session?.email,
                address: session?.address || "",
                phone: session?.phone || "",
                totalPrice: cart.cartTotalAmount,
                cart: JSON.stringify(cartData),
            };

            const result = await createOrder(credentials);
            // console.log(result)

            if (result?.data) {
                dispatch(clearCart());
                toast.success('order process started')
                router.push(`/checkout/${result?.data?.order?._id}`, { scroll: true });
            }




        } catch (error) {
            console.error("Error during checkout:", error);
            throw error;
        }
    };

    return {
        cart,
        clearCart,
        session,
        isLoading,
        isSuccess,
        isError,
        error,
        handleRemoveFromCart,
        handleClearCart,
        handleDecreaseQuantity,
        handleAddToCart,
        handleCheckout,
    };
};
