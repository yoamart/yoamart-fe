"use client";
import CustomLoader from "@/components/local/CustomLoader";
// import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  getLastShuffleDate,
  setLastShuffleDate,
  shuffleArray,
} from "@/hooks/shuffle";
import { Product } from "@/lib/types";
import { useGetAllProductQuery } from "@/redux/appData";
// import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function HotProduct() {
  const { data, isLoading, error } = useGetAllProductQuery({
    page: 1,
    limit: 10,
  });

  const [products, setProducts] = React.useState<Product[]>([]);

  React.useEffect(() => {
    if (data?.products) {
      const storedDate = getLastShuffleDate();
      const today = new Date();
      const lastShuffleDate = storedDate ? new Date(storedDate) : null;

      // Check if 7 days have passed since the last shuffle
      if (
        !lastShuffleDate ||
        today.getTime() - lastShuffleDate.getTime() > 7 * 24 * 60 * 60 * 1000
      ) {
        const shuffledProducts = shuffleArray([...data.products]);
        setProducts(shuffledProducts);
        setLastShuffleDate(today.toISOString()); // Save the new shuffle date
      } else {
        setProducts([...data.products]); // Use the original order
      }
    }
  }, [data]);

  const hotProduct = products[0];

  // Function to calculate time left
  const getTimeRemaining = () => {
    const storedDate = getLastShuffleDate();
    const today = new Date();
    const lastShuffleDate = storedDate ? new Date(storedDate) : null;

    if (lastShuffleDate) {
      const timeDifference = today.getTime() - lastShuffleDate.getTime();
      const daysLeft = 7 * 24 * 60 * 60 * 1000 - timeDifference; // Time left for the next shuffle (7 days)

      if (daysLeft <= 0) {
        // If 7 days have passed, reset and start the countdown again
        setLastShuffleDate(today.toISOString());
        return { days: 0, hours: 0, minutes: 0, seconds: 0, progress: 100 };
      }

      // Calculate remaining time
      const remainingTime = new Date(daysLeft);
      const days = remainingTime.getUTCDate() - 1; // Get days left
      const hours = remainingTime.getUTCHours();
      const minutes = remainingTime.getUTCMinutes();
      const seconds = remainingTime.getUTCSeconds();

      // Calculate progress based on the remaining time
      const progress =
        ((7 * 24 * 60 * 60 * 1000 - daysLeft) / (7 * 24 * 60 * 60 * 1000)) *
        100;

      return {
        days,
        hours,
        minutes,
        seconds,
        progress: Math.min(progress, 100), // Ensure progress doesn't go over 100%
      };
    }

    // If there's no shuffle date, set it to today
    setLastShuffleDate(today.toISOString());
    return { days: 7, hours: 0, minutes: 0, seconds: 0, progress: 0 };
  };

  const [countdown, setCountdown] = React.useState(getTimeRemaining);
  // console.log(countdown.progress);
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(getTimeRemaining());
    }, 1000); // Update every second

    return () => clearInterval(interval); // Clear the interval on component unmount
  }, []);

  // console.log("hot", hotProduct);

  return (
    <div className="space-y-5">
      <div className="flex justify-between items-center">
        <div className="">
          <h2 className="font-dosis uppercase text-[16px] md:text-[20px] text-[#202435] font-semibold">
            HOT PRODUCT FOR <span className="text-[#ED174A]">THIS WEEK</span>
          </h2>
          <p className="text-[#9b9bb4] text-[12px]">
            Dont miss this opportunity at a special discount just for this week.
          </p>
        </div>

        {/* <Button
          variant={"outline"}
          className="rounded-[30px] text-[#9b9bb4] text-[12px]"
        >
          View all <ArrowRight className="" />
        </Button> */}
      </div>

      <div className="border border-[#ED174A] p-5 rounded-lg w-full lg:h-[190px]">
        {isLoading ? (
          <div className="w-full h-full flex items-center justify-center">
            <CustomLoader />
          </div>
        ) : error ? (
          <div className="flex items-center justify-center lg:h-[190px]">
            <p className="text-red-500">Failed to load bestSellers.</p>
          </div>
        ) : (
          <div className="flex gap-5 flex-col lg:flex-row items-center lg:items-start pb-5">
            {/* when we activate hot product make lg:items-start and uncomment teh discount stuffs */}
            <Link href={`/store/${hotProduct?._id}`}>
              <div className="relative max-w-[140px] h-[126px] md:h-[126px]">
                {/* <span className="absolute top-0 left-0 rounded-full bg-[#ED174A] font-dosis font-semibold text-[20px] text-white h-16 w-16 items-center justify-center flex">
              19%
            </span> */}
                <Image
                  src={hotProduct?.image[0]}
                  alt="slider"
                  width={140}
                  height={126}
                  className="w-auto h-auto max-w-full max-h-full"
                  loading="lazy"
                />
              </div>
            </Link>
            <div className="space-y-2">
              <div className="flex gap-2">
                {/* <h2 className="text-[#c2c2d3] font-dosis text-[18px] font-semibold line-through">
                {new Intl.NumberFormat("en-NG", {
                  style: "currency",
                  currency: "NGN",
                }).format(1500)}
              </h2> */}

                <h2 className="text-[#D51243] font-dosis text-[18px] font-semibold">
                  {new Intl.NumberFormat("en-NG", {
                    style: "currency",
                    currency: "NGN",
                  }).format(hotProduct?.price)}
                </h2>
              </div>
              <Link href={`/store/${hotProduct?._id}`}>
                <h2 className="text-[#202435] font-dosis text-[20px] font-medium hover:text-yprimary">
                  {hotProduct?.name}{" "}
                </h2>
              </Link>
              <p
                className={`uppercase ${
                  hotProduct?.inStock ? "text-[#30e682]" : "text-red-500"
                } font-dosis text-[11px] font-semibold`}
              >
                {hotProduct?.inStock ? "In stock" : "Out of stock"}
              </p>
              <Progress value={countdown.progress} />

              <div className="flex items-center gap-1">
                <span className="bg-[#c2c3c7] h-10 w-10 rounded-full flex items-center justify-center">
                  {countdown.days}{" "}
                </span>{" "}
                :
                <span className="bg-[#c2c3c7] h-10 w-10 rounded-full flex items-center justify-center">
                  {countdown.hours}{" "}
                </span>{" "}
                :
                <span className="bg-[#c2c3c7] h-10 w-10 rounded-full flex items-center justify-center">
                  {countdown.minutes}{" "}
                </span>{" "}
                :
                <span className="bg-[#c2c3c7] h-10 w-10 rounded-full flex items-center justify-center">
                  {countdown.seconds}{" "}
                </span>
                <p className="text-[12px] ml-3">
                  Remains until the end of the offer
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
