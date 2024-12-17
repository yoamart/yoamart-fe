import React from "react";

export default function TermsAndConditions() {
  return (
    <div className="my-10 px-2 md:px-10">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Our Terms & Conditions
      </h1>
      <p className="text-gray-700 leading-relaxed mb-4">
        It is a long established fact that a reader will be distracted by the
        readable content of a page when looking at its layout. The point of
        using Lorem Ipsum is that it has a more-or-less normal distribution of
        letters...
      </p>

      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        Where does it come from?
      </h2>
      <p className="text-gray-700 leading-relaxed mb-4">
        It is a long established fact that a reader will be distracted by the
        readable content of a page when looking at its layout...
      </p>
      <ul className="list-disc pl-8 mb-4 text-gray-700">
        <li>Lorem Ipsum dolor sit amet...</li>
        <li>Quis autem vel eum iure reprehenderit...</li>
        <li>Et harum quidem rerum facilis...</li>
        <li>Temporibus autem quibusdam...</li>
      </ul>

      <p className="text-gray-700 leading-relaxed mb-4">
        There are many variations of passages...
      </p>

      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        Why do we use it?
      </h2>
      <p className="text-gray-700 leading-relaxed">
        Contrary to popular belief, Lorem Ipsum is not simply random text...
      </p>
      <ul className="list-disc pl-8 mt-4 text-gray-700">
        <li>Lorem ipsum dolor sit amet...</li>
        <li>Duis aute irure dolor in reprehenderit...</li>
        <li>No one rejects, dislikes, or avoids...</li>
      </ul>
    </div>
  );
}
