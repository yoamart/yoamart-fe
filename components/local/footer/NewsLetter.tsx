import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import React from "react";

export default function NewsLetter() {
  return (
    <div className="bg-green-600 text-white pt-10 px-5 md:px-10 flex flex-col md:flex-row gap-10 relative">
      {/* Left Content */}
      <div className="flex-1 space-y-4 md:pb-10">
        <p className="text-lg font-light">$20 discount for your first order</p>
        <h2 className="text-2xl lg:text-3xl font-semibold leading-tight">
          Join our newsletter and get...
        </h2>
        <p className="text-gray-200 text-[13px] lg:w-[70%]">
          Join our email subscription now to get updates on promotions and
          coupons.
        </p>

        {/* Subscription Form */}

        <div className="relative">
          <Input
            type="email"
            autoComplete="off"
            placeholder="Your email address"
            className="bg-[#f3f4f7] p-5 w-full h-full text-gray-900 "
          />

          <Button className="absolute top-1/2 right-3 transform -translate-y-1/2 bg-yprimary text-white px-6 py-3  font-semibold hover:bg-yprimary/50">
            Subscribe
          </Button>
        </div>
      </div>

      {/* Right Content - Image */}
      <div className="flex-1 relative ">
        <Image
          src="https://klbtheme.com/bacola/wp-content/uploads/2021/04/coupon.png"
          alt="Discount Placeholder"
          className="w-full h-full"
          width={300}
          height={200}
        />
      </div>
    </div>
  );
}
