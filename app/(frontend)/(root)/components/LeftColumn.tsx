import CustomLoader from "@/components/local/CustomLoader";
import { shuffleArray } from "@/hooks/shuffle";
import { Product } from "@/lib/types";
import { useGetAllProductQuery } from "@/redux/appData";
import { Leaf, ShoppingCart, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function LeftColumn() {
  const { data, isLoading, error } = useGetAllProductQuery({
    page: 1,
    limit: 20,
  });
  const products: Product[] = data ? data.products : [];
  const shuffledData: Product[] = shuffleArray([...products]);
  const trendingProducts: Product[] = shuffledData.slice(0, 5);
  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="relative w-full md:w-[270px] h-[229px] md:h-[350px] rounded-lg overflow-hidden shadow-md">
        {/* Background Image */}

        <div className="relative h-full w-full">
          {" "}
          <Image
            src="/images/output2.jpg"
            alt="slider"
            width={270}
            height={403}
            className="w-full object-cover h-full rounded-lg object-bottom hidden md:block filter brightness-75 blur-[0.2px]"
          />
          <Image
            src="/images/output2.jpg"
            alt="slider"
            width={270}
            height={403}
            className="w-full object-fit h-full rounded-lg object-bottom md:hidden filter brightness-75 blur-[0.2px]"
          />
          <div className="absolute inset-0 bg-black/30"></div>
        </div>

        {/* Text Content */}
        <div className="top-6 absolute right-3 text-right">
          <p className="text-sm text-gray-700">Celebrate Every Moment</p>
          <h2 className="text-xl font-light text-gray-800">
            Fine Taste, Rich Experience
          </h2>
          <h1 className="text-2xl font-bold text-purple-700">
            Premium Red Wine
          </h1>
          <p className="text-sm text-gray-400 mt-2">From only</p>
          <p className="text-2xl font-bold text-red-500">
            {new Intl.NumberFormat("en-NG", {
              style: "currency",
              currency: "NGN",
            }).format(3000)}
          </p>
        </div>
      </div>

      <div className="relative w-full md:w-[270px] h-[229px] md:h-[350px] rounded-lg overflow-hidden shadow-md">
        {/* Background Image */}
        <div className="relative h-full w-full">
          {" "}
          <Image
            src="/images/270x350potrait3@3x.jpg"
            alt="slider"
            width={270}
            height={403}
            className="w-full object-cover h-full rounded-lg object-bottom hidden md:block filter brightness-75 blur-[0.2px]"
          />
          <Image
            src="/images/270x200landscape2@3x.jpg"
            alt="slider"
            width={270}
            height={403}
            className="w-full object-fit h-full rounded-lg object-bottom md:hidden filter brightness-75 blur-[0.2px]"
          />
          <div className="absolute inset-0 bg-black/30"></div>
        </div>
        {/* Text Content */}
        <div className="absolute top-6 left-6 ">
          <p className="text-sm text-gray-700">Healthy & Delicious</p>
          <h2 className="text-xl font-light text-gray-800">
            The Perfect Spread
          </h2>
          <h1 className="text-2xl font-bold text-yellow-600">
            Blue Band Margarine
          </h1>
          <p className="text-sm text-gray-400 mt-2">From as low as</p>
          <p className="text-2xl font-bold text-red-500">
            {new Intl.NumberFormat("en-NG", {
              style: "currency",
              currency: "NGN",
            }).format(2400)}
          </p>
        </div>
      </div>

      <div className="flex flex-col  w-full md:w-[270px]">
        <div className="border p-6 flex items-center gap-3 rounded-tl-md rounded-tr-md">
          <Truck className="w-7 h-7" />
          <p className="text-[12px]">
            Fast and Reliable Delivery — Get your orders at your doorstep in
            record time!{" "}
          </p>
        </div>

        <div className="border p-6 flex items-center gap-3 ">
          <ShoppingCart className="w-7 h-7" />
          <p className="text-[12px]">
            Shop with Ease — Discover exclusive deals and unbeatable prices on
            Yoamart!{" "}
          </p>
        </div>

        <div className="border p-6 flex items-center gap-3 rounded-bl-md rounded-br-md">
          <Leaf className="w-7 h-7" />
          <p className="text-[12px]">
            Freshness Guaranteed — Experience farm-to-table goodness with every
            order!{" "}
          </p>
        </div>
      </div>

      <div className="space-y-5">
        <h2 className="font-dosis uppercase text-[16px] text-[#202435] font-semibold">
          TRENDING PRODUCTS
        </h2>

        <div className="p-5 border rounded-lg h-[550px]">
          {isLoading ? (
            <div className="w-full flex items-center justify-center">
              <CustomLoader />
            </div>
          ) : error ? (
            <div className="flex items-center justify-center h-[283px]">
              <p className="text-red-500">Failed to load trending Products.</p>
            </div>
          ) : (
            <div className="space-y-10">
              {trendingProducts.map((data, index) => (
                <div key={index} className="flex gap-5 items-center">
                  <Link
                    href={`/store/${data?._id}`}
                    className="w-[70px] h-[62px]"
                  >
                    <Image
                      src={data?.image[0]}
                      alt="slider"
                      width={70}
                      height={62}
                      className="w-full object-cover bg-gray-400 h-full rounded-lg"
                    />
                  </Link>
                  <div className="space-y-2">
                    <Link
                      href={`/store/${data?._id}`}
                      className="line-clamp-2 font-medium text-sm hover:text-yprimary"
                    >
                      {data?.name}
                    </Link>

                    <h2 className="text-[#D51243] font-dosis text-[18px] font-semibold">
                      {new Intl.NumberFormat("en-NG", {
                        style: "currency",
                        currency: "NGN",
                      }).format(data?.price)}
                    </h2>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
