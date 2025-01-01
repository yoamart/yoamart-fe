"use client";
import CustomLoader from "@/components/local/CustomLoader";
import { Button } from "@/components/ui/button";
import { Order, RootState } from "@/lib/types";
import {
  useConfirmOrderMutation,
  useConfirmPaymentMutation,
  useGetUserOrderByIdQuery,
} from "@/redux/appData";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import {  Check, Loader } from "lucide-react";
import Image from "next/image";
// import { notFound, useRouter } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";

type ErrorResponse = { data: { message: string } };

const Main = ({ orderId }: { orderId: string }) => {
  const session = useSelector((state: RootState) => state.auth.userData);
  // const router = useRouter();
  const { data, isLoading, error } = useGetUserOrderByIdQuery(orderId);

  const [confirmPayment, { isLoading: isConfirming }] =
    useConfirmPaymentMutation();

  const [confirmOrder, { isLoading: isConfirmingOrder }] =
    useConfirmOrderMutation();

  const handleConfirmPayment = async () => {
    try {
      // Make the API call to toggle the status
      const response = await confirmPayment(orderId);
      // console.log(response);
      // Optionally handle the response from the server if needed
      if (response?.data?.message) {
        toast.success(response.data.message || "Success");
      } else if (
        "data" in (response?.error as FetchBaseQueryError) &&
        (response?.error as FetchBaseQueryError)?.data
      ) {
        const error = response.error as ErrorResponse;
        toast.error(error.data.message || "Error updating status");
      } else {
        toast.error("Error updating status");
      }
    } catch (error) {
      console.error("API call failed", error);
      // Revert the toggle if the API call fails
    }
  };

  const handleChangeOrderStatus = async () => {
    try {
      // Make the API call to toggle the status
      const response = await confirmOrder(orderId);
      // console.log(response);
      // Optionally handle the response from the server if needed
      if (response?.data?.message) {
        toast.success(response.data.message || "Success");
      } else if (
        "data" in (response?.error as FetchBaseQueryError) &&
        (response?.error as FetchBaseQueryError)?.data
      ) {
        const error = response.error as ErrorResponse;
        toast.error(error.data.message || "Error updating status");
      } else {
        toast.error("Error updating status");
      }
    } catch (error) {
      console.error("API call failed", error);
      // Revert the toggle if the API call fails
    }
  };

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <CustomLoader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Image
          src={"/images/error.png"}
          alt="Empty Wishlist"
          width={200} // Adjust the width as needed
          height={200} // Adjust the height as needed
          className="mb-6"
        />
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Order Not Found!
        </h2>
        <Button
          onClick={() => (window.location.href = `/admin/orders/`)} // Redirect to the store page
          className="bg-ysecondary text-white px-6 py-2 rounded hover:bg-primary/80"
        >
          All Orders
        </Button>
      </div>
    );
  }
  const order: Order = data.order;
  // console.log(data);
  return (
    <div className="">
      {/* Order Header */}
      <div className="bg-white shadow-sm rounded-md p-6 mb-8">
        <p className="text-sm text-gray-600">
          Order <span className="font-semibold">#{order._id}</span> was placed
          on{" "}
          <span className="font-semibold">
            {order?.createdAt
              ? new Intl.DateTimeFormat("en-US", {
                  dateStyle: "medium",
                  timeStyle: "short",
                }).format(new Date(order?.createdAt))
              : "N/A"}
          </span>{" "}
          and is currently{" "}
          <span className="text-yellow-600">{order.orderStatus}</span>.
        </p>
      </div>

      {/* Order Details Table */}
      <div className="bg-white shadow-sm rounded-md p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold ">Order Details</h3>
          {order.isPaid === "processing" ? (
            <Button onClick={handleConfirmPayment} className="bg-ysecondary">
              Confirm Payment{" "}
              {isConfirming ? <Loader className="animate-spin" /> : <Check />}
            </Button>
          ) : order.isPaid === "paid" ? (
            <Button onClick={handleChangeOrderStatus} className="bg-ysecondary">
              {order.orderStatus === "pending"
                ? "mark as Shipped"
                : order.orderStatus === "shipped"
                ? "mark as delivered"
                : "completed"}{" "}
              {isConfirmingOrder ? (
                <Loader className="animate-spin" />
              ) : (
                <Check />
              )}{" "}
            </Button>
          ) : null}
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 text-sm">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="py-2 px-4 border-b border-gray-200">Product</th>
                <th className="py-2 px-4 border-b border-gray-200 text-right">
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              {order.cart.map((item, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {item.name} &times; {item.quantity}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200 text-right">
                    {new Intl.NumberFormat("en-NG", {
                      style: "currency",
                      currency: "NGN",
                    }).format(item.price)}{" "}
                  </td>
                </tr>
              ))}
              <tr>
                <td className="py-2 px-4 border-b border-gray-200 font-semibold">
                  Subtotal:
                </td>
                <td className="py-2 px-4 border-b border-gray-200 text-right">
                  {new Intl.NumberFormat("en-NG", {
                    style: "currency",
                    currency: "NGN",
                  }).format(order?.total)}
                </td>
              </tr>
              {/* <tr>
                <td className="py-2 px-4 border-b border-gray-200 font-semibold">
                  Shipping:
                </td>
                <td className="py-2 px-4 border-b border-gray-200 text-right">
                  {order.shipping}
                </td>
              </tr> */}
              <tr>
                <td className="py-2 px-4 border-b border-gray-200 font-semibold">
                  Payment method:
                </td>
                <td className="py-2 px-4 border-b border-gray-200 text-right">
                  Direct Bank Transfer
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b border-gray-200 font-semibold">
                  Total:
                </td>
                <td className="py-2 px-4 border-b border-gray-200 text-right">
                  {new Intl.NumberFormat("en-NG", {
                    style: "currency",
                    currency: "NGN",
                  }).format(order?.total)}
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 font-semibold border-b border-gray-200">
                  Note:
                </td>
                <td className="py-2 px-4 text-right">{order.note}</td>
              </tr>

              <tr>
                <td className="py-2 px-4 font-semibold">Order Reference:</td>
                <td className="py-2 px-4 text-right">{order.orderNumber}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Addresses */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
          <p>{order?.name}</p>
          <p className="">{order?.address}</p>
          <p>{order?.mobile}</p>
          <p>{order?.email}</p>
        </div>
      </div>
    </div>
  );
};

export default Main;
