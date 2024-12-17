"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/hooks/use-cart";
import Image from "next/image";
import React from "react";
import { MdCancel } from "react-icons/md";
import { Loader } from "lucide-react";
import NoItemFound from "@/components/local/NoItemFound";

export default function Cart() {
  const {
    cart,
    handleRemoveFromCart,
    handleCheckout,
    handleClearCart,
    handleDecreaseQuantity,
    handleAddToCart,
    isLoading,
    // isSuccess,
    // isError,
  } = useCart();

  const { cartItems } = cart;

  if (cart.cartTotalQuantity < 1) {
    return (
      <NoItemFound
        title1="Your Cart is Empty"
        title2="Looks like you haven't added any items to your cart yet. Start
        browsing our products and add them to your cart."
      />
    );
  }

  return (
    <div className="px-2 md:mx-10">
      {" "}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Cart Items */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          <div className="lg:col-span-2">
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-4">Product</th>
                    <th className="p-4 md:table-cell hidden ">Price</th>
                    <th className="p-4 ">Quantity</th>
                    <th className="p-4 md:table-cell hidden ">Subtotal</th>
                    <th className="p-2 md:table-cell hidden "></th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item._id} className="border-t">
                      <td className="p-4 flex items-center gap-4 relative">
                        <MdCancel
                          onClick={() => handleClearCart()}
                          className="text-red-500 w-6 h-6 cursor-pointer absolute top-1/2 left-1 bg-white rounded-full transform -translate-y-1/2 md:hidden"
                        />{" "}
                        <Image
                          width={70}
                          height={70}
                          src={item?.image[0]}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-md bg-gray-500"
                        />
                        <span>{item.name}</span>
                      </td>
                      <td className="p-4 md:table-cell hidden">
                        {new Intl.NumberFormat("en-NG", {
                          style: "currency",
                          currency: "NGN",
                        }).format(item?.price)}{" "}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleDecreaseQuantity(item)}
                            className="w-8 h-8 border rounded-full"
                          >
                            -
                          </button>
                          <span>{item.cartQuantity}</span>
                          <button
                            onClick={() => handleAddToCart(item)}
                            className="w-8 h-8 border rounded-full"
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="p-4 md:table-cell hidden">
                        {new Intl.NumberFormat("en-NG", {
                          style: "currency",
                          currency: "NGN",
                        }).format(item.price * item.quantity)}
                      </td>
                      <td className="p-2 md:table-cell hidden">
                        <MdCancel
                          onClick={() => handleRemoveFromCart(item)}
                          className="text-red-500 w-6 h-6 cursor-pointer"
                        />{" "}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-end mt-4">
              <Button
                onClick={() => handleClearCart()}
                className="text-sm bg-ysecondary text-white"
              >
                Remove all
              </Button>
            </div>
          </div>

          {/* Cart Totals */}
          <div className="p-4 border rounded-lg">
            <h2 className="text-lg font-semibold mb-4 font-dosis uppercase">
              Cart Totals
            </h2>
            <Separator className="my-2 " />
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>
                {" "}
                {new Intl.NumberFormat("en-NG", {
                  style: "currency",
                  currency: "NGN",
                }).format(cart.cartTotalAmount)}
              </span>
            </div>
            {/* <div className="flex justify-between mb-2">
              <span>Shipping</span>
              <div>
                <label className="block">
                  <input type="radio" name="shipping" className="mr-2" />
                  Flat rate: $5.00
                </label>
                <label className="block">
                  <input type="radio" name="shipping" className="mr-2" />
                  Local pickup
                </label>
              </div>
            </div> */}
            <Separator className="my-3 " />

            <div className="flex justify-between mb-4">
              <span>Total</span>
              <span className="text-lg font-bold">
                {" "}
                {new Intl.NumberFormat("en-NG", {
                  style: "currency",
                  currency: "NGN",
                }).format(cart.cartTotalAmount)}
              </span>
            </div>

            <div className="w-full">
              {isLoading ? (
                <Button
                  disabled
                  className="w-full bg-ysecondary text-white py-2 rounded-lg"
                  type="submit"
                >
                  <span>Please wait</span>
                  <Loader className="animate-spin" />
                </Button>
              ) : (
                <Button
                  onClick={handleCheckout}
                  className="w-full bg-ysecondary text-white py-2 rounded-lg"
                  type="submit"
                >
                  Proceed to Checkout
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
