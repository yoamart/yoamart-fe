import { HandshakeIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function HeaderNavDesktop() {
  return (
    <div className=" w-full  py-2 border-b border-gray-300  hidden lg:block ">
      <div className="lg:grid grid-cols-3 max-w-7xl mx-auto hidden px-10">
      <div className="flex gap-5 items-center">
        <Link
          href={"/about-us"}
          className="text-[12px] text-[#3E445A] hover:text-ysecondary"
        >
          About Us
        </Link>{" "}
        <a
          href={"/my-account"}
          className="text-[12px] text-[#3E445A] hover:text-ysecondary"
        >
          My Account
        </a>{" "}
        <Link
          href={"/my-account/wishlist"}
          className="text-[12px] text-[#3E445A] hover:text-ysecondary"
        >
          Wishlist
        </Link>
      </div>

      <div className="flex items-center gap-2">
        <HandshakeIcon className="w-5 h-5" />
        <p className="text-[12px] text-[#3E445A]">
          100% Secure delivery without contacting the courier
        </p>
      </div>

      <div className="flex justify-end">
        <p className="text-[12px] text-[#3E445A]">
          Need help? Call Us:{" "}
          <a
            href="tel:0020500"
            className="hover:underline font-extrabold text-ysecondary"
          >
            + 0020 500
          </a>
        </p>
      </div>
      </div>
    </div>
  );
}
