import ContactForm from '@/components/local/ContactForm'
import React from 'react'

export default function page() {
  return (
<div className="px-2 md:px-10 text-gray-800">

{/* <!-- Get In Touch Section --> */}
<section className="py-12">
  <div className="max-w-7xl mx-auto text-center">
    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Get In Touch</h2>
    <p className="text-gray-600 mt-4">
      Lorem, ipsum dolor sit amet consectetur adipiscing elit. Expedita quaerat unde quam dolor culpa veritatis inventore, aut commodi eum veniam vel.
    </p>

    <div className="mt-10 grid gap-6 md:grid-cols-3">
      {/* <!-- Address Card --> */}
      <div className="p-6 bg-gray-200 rounded-md shadow-md text-center">
        <div className="text-blue-500 text-4xl mb-4">
          📍
        </div>
        <h3 className="text-lg font-semibold">102 Street 2714 Donovan</h3>
        <p className="text-gray-600">Lorem ipsum dolor sit amet discont</p>
      </div>
      {/* <!-- Phone Card --> */}
      <div className="p-6 bg-gray-200 rounded-md shadow-md text-center">
        <div className="text-blue-500 text-4xl mb-4">
          📞
        </div>
        <h3 className="text-lg font-semibold">+02 1234 567 88</h3>
        <p className="text-gray-600">Lorem ipsum dolor sit amet discont</p>
      </div>
      {/* <!-- Email Card --> */}
      <div className="p-6 bg-gray-200 rounded-md shadow-md text-center">
        <div className="text-blue-500 text-4xl mb-4">
          ✉️
        </div>
        <h3 className="text-lg font-semibold">info@example.com</h3>
        <p className="text-gray-600">Lorem ipsum dolor sit amet discont</p>
      </div>
    </div>
  </div>
</section>

{/* <!-- Send Us Section --> */}
<section className="py-12 bg-white shadow-md mb-10 rounded-lg">
  <div className="max-w-5xl mx-auto">
    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center">Send Us</h2>
    <p className="text-gray-600 mt-4 text-center">
      Lorem, ipsum dolor sit amet consectetur adipiscing elit. Expedita quaerat unde quam dolor culpa veritatis inventore, aut commodi eum veniam vel.
    </p>

    {/* <div className="mt-10 p-8 ">
      <form action="#" method="POST" className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-gray-600 mb-2">Your name *</label>
            <input type="text" id="name" name="name" placeholder="Your name" required
              className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-blue-200" />
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-600 mb-2">Your email *</label>
            <input type="email" id="email" name="email" placeholder="Your email" required
              className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-blue-200" />
          </div>
        </div>
        <div>
          <label htmlFor="subject" className="block text-gray-600 mb-2">Subject *</label>
          <input type="text" id="subject" name="subject" placeholder="Subject" required
            className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-blue-200" />
        </div>
        <div>
          <label htmlFor="message" className="block text-gray-600 mb-2">Your message</label>
          <textarea id="message" name="message" rows={6} placeholder="Your message"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"></textarea>
        </div>
        <button type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-200">
          Send Message
        </button>
      </form>
    </div> */}

    <ContactForm />
  </div>
</section>

</div>  )
}
