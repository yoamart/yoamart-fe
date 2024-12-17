import Image from "next/image";
import React from "react";

export default function Banner3() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <div className="relative w-full  h-[229px] rounded-lg overflow-hidden ">
        {/* Background Image */}
        <div className="w-full h-full mx-auto relative">
          <Image
            // src={"/images/test.jpg"}
            src="/images/new/270x200 landscape 1@3x.jpg"
            alt="slider"
            width={420}
            height={229}
            className="w-full object-cover h-full filter brightness-75 blur-[0.2px] object-bottom" // Adds darkness and slight blur
            // className="w-full object-fit h-full  object-bottom"
          />

          <div className="absolute inset-0 bg-black/20"></div>
        </div>

        {/* Text Content */}
        <div className="absolute top-6 right-5 md:right-7 text-right">
          <p className="text-sm text-gray-700">Flavor That Inspires</p>
          <h2 className="text-xl font-light text-gray-800">
            Cook With Confidence
          </h2>
          <h1 className="text-2xl font-bold text-green-800">
            Knorr Chicken Seasoning
          </h1>
          <p className="text-sm text-gray-400 mt-2">Starting at</p>
          <p className="text-2xl font-bold text-red-500">
            {new Intl.NumberFormat("en-NG", {
              style: "currency",
              currency: "NGN",
            }).format(500)}
          </p>
        </div>
      </div>

      <div className="relative w-full h-[229px] rounded-lg overflow-hidden">
        {/* Background Image */}
        <div className="w-full h-full mx-auto relative">
          <Image
            // src={"/images/butter.jpg"}
            src="/images/new/270x200 landscape 3@3x.jpg"
            alt="slider"
            width={420}
            height={229}
            className="w-full object-cover h-full filter brightness-75 blur-[0.2px] object-bottom" // Adds darkness and slight blur
          />

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/30"></div>
        </div>

        {/* Text Content */}
        <div className="absolute top-6 left-6 z-10">
          <p className="text-sm text-gray-700">Cleanliness Guaranteed</p>
          <h2 className="text-xl font-light text-gray-800">
            Keep Your Home Fresh
          </h2>
          <h1 className="text-2xl font-bold text-blue-600">
            Harpic Disinfectant
          </h1>
          <p className="text-sm text-gray-400 mt-2">Now available for</p>
          <p className="text-2xl font-bold text-red-500">
            {new Intl.NumberFormat("en-NG", {
              style: "currency",
              currency: "NGN",
            }).format(1000)}
          </p>
        </div>
      </div>
    </div>
  );
}
