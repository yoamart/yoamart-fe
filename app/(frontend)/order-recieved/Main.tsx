"use client";
import CustomLoader from "@/components/local/CustomLoader";
import { Order, RootState } from "@/lib/types";
import { useGetUserOrderByIdQuery } from "@/redux/appData";
import React from "react";
import { useSelector } from "react-redux";

export default function Main({ orderId }: { orderId: string }) {
  const session = useSelector((state: RootState) => state.auth.userData);

  const {
    data: order,
    isLoading,
    // error: errorCategories,
  } = useGetUserOrderByIdQuery(orderId);
  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <CustomLoader />
      </div>
    );
  }
  const data: Order = order?.order;
  //   console.log(data);
  return (
    <div className="px-2 md:px-10 my-10">
      {/* Success Message */}
      <div className="text-center border-b pb-4 mb-6">
        <h2 className="text-2xl font-semibold text-green-600 border p-3">
          Thank you. Your order has been received.
        </h2>
      </div>

      {/* Order Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <div className="flex justify-between">
            <span className="font-medium">Order reference:</span>
            <span className="font-bold">{data?.orderNumber}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Date:</span>
            <span className="font-bold">
            {data?.orderDate
                        ? new Intl.DateTimeFormat("en-US", {
                            dateStyle: "medium",
                            timeStyle: "short",
                          }).format(new Date(data?.orderDate))
                        : "N/A"}
            </span>
          </div>
        </div>
        <div>
          <div className="flex justify-between">
            <span className="font-medium">Total:</span>
            <span className="font-bold">
              {new Intl.NumberFormat("en-NG", {
                style: "currency",
                currency: "NGN",
              }).format(data?.total)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Payment method:</span>
            <span className="font-bold">Direct bank transfer</span>
          </div>
        </div>
      </div>

      {/* Order Details */}
      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold mb-4">Order Details</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-gray-200 text-gray-700 text-left">
                <th className="px-4 py-2">Product</th>
                <th className="px-4 py-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {data?.cart?.map((cartItem, index) => (
                <tr key={index} className="border-b">
                  <td className="px-4 py-2">
                    {cartItem.name} × {cartItem?.quantity}
                  </td>
                  <td className="px-4 py-2">
                    {" "}
                    {new Intl.NumberFormat("en-NG", {
                      style: "currency",
                      currency: "NGN",
                    }).format(cartItem?.price)}
                  </td>
                </tr>
              ))}

              <tr>
                <td className="px-4 py-2 font-medium">Subtotal:</td>
                <td className="px-4 py-2">
                  {new Intl.NumberFormat("en-NG", {
                    style: "currency",
                    currency: "NGN",
                  }).format(data?.total)}
                </td>
              </tr>
              {/* <tr>
                <td className="px-4 py-2 font-medium">Shipping:</td>
                <td className="px-4 py-2">Local pickup</td>
              </tr> */}
              <tr>
                <td className="px-4 py-2 font-medium">Payment method:</td>
                <td className="px-4 py-2">Direct bank transfer</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-medium">Total:</td>
                <td className="px-4 py-2">
                  {new Intl.NumberFormat("en-NG", {
                    style: "currency",
                    currency: "NGN",
                  }).format(data?.total)}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-medium">Note:</td>
                <td className="px-4 py-2">{data?.note}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Addresses */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* Billing Address */}
        <div className="bg-white shadow-sm rounded-md p-6">
          <h3 className="text-lg font-semibold mb-4">Billing Address</h3>
          <p>{session?.name}</p>
          <p className="">{session?.address}</p>
          <p>{session?.phone}</p>
          <p>{session?.email}</p>
        </div>

        {/* Shipping Address */}
        <div className="bg-white shadow-sm rounded-md p-6">
          <h3 className="text-lg font-semibold mb-4">Shipping Address</h3>
          <p>{data?.name}</p>
          <p className="">{data?.address}</p>
          <p>{data?.mobile}</p>
          <p>{data?.email}</p>
        </div>
      </div>
    </div>
  );
}
