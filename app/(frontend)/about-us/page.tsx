import Image from "next/image";
import React from "react";

export default function AboutUs() {
  return (
    <div className="text-gray-800">
      {/* <!-- Hero Section --> */}
      <section className="relative w-full  md:h-[300px] rounded-lg overflow-hidden shadow-lg">
        {/* Background Image */}
        <div className="relative">
          <Image
            src="/images/about.jpg"
            alt="banner"
            width={600}
            height={230}
            className="w-full h-[300px] object-cover rounded-lg filter brightness-75 blur-[0.2px] object-bottom"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
        </div>

        {/* Text Content */}
        <div className="absolute top-1/2 transform -translate-y-1/2  text-center -translate-x-1/2 left-1/2">
          {/* <p className="text-xs text-white tracking-wide uppercase">About Us</p> */}
          <h2 className="text-lg font-medium text-white">About Us</h2>
          <h1 className="text-2xl font-bold text-white">
            We can do more for you!
          </h1>
        </div>
      </section>

      {/* <!-- Content Section --> */}
      <div className=" px-2 md:px-10 py-10 space-y-10">
        <p className="text-lg leading-7">
          In nec purus eget neque accumsan finibus. Duis condimentum elit ut
          libero commodo iaculis. Donec augue diam, tristique et ultricies nec,
          consectetur quis enim. Nullam id rutrum ex. Aliquam a lectus id lacus
          rhoncus dapibus non ac justo. Vivamus lacinia vestibulum metus in
          dapibus. Vestibulum sit amet sollicitudin enim. Ut id interdum turpis.
          Curabitur porta auctor quam, pretium facilisis nisl. Pellentesque
          efficitur elit ante, vel vulputate tortor blandit nec.
        </p>

        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
          Quisque erat urna, congue et libero in eleifend euismod velit.
        </h2>
        <p className="text-lg leading-7">
          In nec purus eget neque accumsan finibus. Duis condimentum elit ut
          libero commodo iaculis. Donec augue diam, tristique et ultricies nec,
          consectetur quis enim. Nullam id rutrum ex. Aliquam a lectus id lacus
          rhoncus dapibus non ac justo. Vivamus lacinia vestibulum metus in
          dapibus. Vestibulum sit amet sollicitudin enim. Ut id interdum turpis.
          Curabitur porta auctor quam, pretium facilisis nisl. Pellentesque
          efficitur elit ante, vel vulputate tortor blandit nec.
        </p>

        {/* <!-- Image and Text Section --> */}
        <div className="md:flex md:space-x-8">
          <div className="md:w-1/3">
            <Image
              width={400}
              height={600}
              src="/images/about.jpg"
              alt="Placeholder"
              className="rounded-md shadow-md bg-gray-300 min-h-[300px]"
            />
          </div>
          <div className="md:w-2/3 mt-6 md:mt-0 space-y-4">
            <p className="text-lg font-semibold">Rachel Leonard - Bacola CEO</p>
            <h3 className="text-xl font-bold text-gray-900">
              Duis convallis luctus pretium. Pellentesque habitant morbi
            </h3>
            <p className="text-lg leading-7">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis
              ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas
              accumsan lacus vel facilisis.
            </p>
            <p className="text-lg leading-7">
              In fermentum mi et sapien semper, a sagittis lorem vulputate.
              Integer gravida, dui eget aliquet tempus, turpis orci vehicula
              ipsum, eget porttitor sapien tortor at neque. Cras id pulvinar
              lacus, volutpat augue.
            </p>
          </div>
        </div>

        <p className="text-lg leading-7">
          In nec purus eget neque accumsan finibus. Duis condimentum elit ut
          libero commodo iaculis. Donec augue diam, tristique et ultricies nec,
          consectetur quis enim. Nullam id rutrum ex. Aliquam a lectus id lacus
          rhoncus dapibus non ac justo. Vivamus lacinia vestibulum metus in
          dapibus. Vestibulum sit amet sollicitudin enim. Ut id interdum turpis.
          Curabitur porta auctor quam, pretium facilisis nisl. Pellentesque
          efficitur elit ante, vel vulputate tortor blandit nec.
        </p>
      </div>

      {/* <div className="fixed bottom-4 right-4">
    <button onclick="window.scrollTo({ top: 0, behavior: 'smooth' });" className="p-3 bg-gray-900 text-white rounded-full shadow-md hover:bg-gray-700">
      ↑
    </button>
  </div> */}
    </div>
  );
}
