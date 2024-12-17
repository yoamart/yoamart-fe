"use client";
import CustomLoader from "@/components/local/CustomLoader";
import { Button } from "@/components/ui/button";
import { Order, RootState } from "@/lib/types";
import { useGetUserOrderByIdQuery } from "@/redux/appData";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";

const Main = ({ orderId }: { orderId: string }) => {
  const session = useSelector((state: RootState) => state.auth.userData);
  const router = useRouter();
  const {
    data,
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
  const order: Order = data.order;

  //   console.log(data);

  return (
    <div className=" px-2 md:px-10">
      {/* Order Header */}
      <div className="bg-white shadow-sm rounded-md p-6 mb-8">
        <p className="text-sm text-gray-600">
          Order <span className="font-semibold">#{order._id}</span> was placed
          on{" "}
          <span className="font-semibold">
            {order?.orderDate
              ? new Date(order.orderDate).toLocaleDateString()
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
          {order.isPaid === "unpaid" && (
            <Button
              onClick={() => router.push(`/checkout/${order._id}`)}
              className="bg-ysecondary"
            >
              Pay Now <ArrowRight />
            </Button>
          )}
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
                <td className="py-2 px-4 font-semibold border-b border-gray-200">Note:</td>
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
