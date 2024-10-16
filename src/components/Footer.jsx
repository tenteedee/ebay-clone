import React, { useState } from 'react';

export default function Footer() {
  const [country, setCountry] = useState('United States');

  const footerLinks = [
    {
      title: 'Buy',
      links: ['Registration', 'eBay Money Back Guarantee', 'Bidding & buying help', 'Stores']
    },
    {
      title: 'Sell',
      links: ['Start selling', 'Learn to sell', 'Affiliates']
    },
    {
      title: 'Tools & apps',
      links: ['Developers', 'Security center', 'Site map']
    },
    {
      title: 'Stay connected',
      links: ["eBay's Blogs", 'Facebook', 'Twitter']
    },
    {
      title: 'About eBay',
      links: ['Company info', 'News', 'Investors', 'Careers', 'Government relations', 'Advertise with us', 'Policies', 'Verified Rights Owner (VeRO) Program']
    },
    {
      title: 'Help & Contact',
      links: ['Seller Information Center', 'Contact us']
    },
    {
      title: 'Community',
      links: ['Announcements', 'Discussion boards', 'eBay Giving Works']
    }
  ];

  return (
    <footer className="bg-gray-100 pt-10 pb-5 px-4 font-sans text-sm">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-8">
          {footerLinks.map((column, index) => (
            <div key={index}>
              <h3 className="font-bold mb-3">{column.title}</h3>
              <ul className="space-y-2">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a href="#" className="text-gray-600 hover:underline">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <h3 className="font-bold mb-3">eBay Sites</h3>
          <select 
            value={country} 
            onChange={(e) => setCountry(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="United States">United States</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="Germany">Germany</option>
            <option value="Australia">Australia</option>
            {/* Add more countries as needed */}
          </select>
        </div>

        <div className="mt-10 text-xs text-gray-500 space-y-2">
          <p>Copyright © 1995-2024 eBay Inc. All Rights Reserved.</p>
          <p>
            <a href="#" className="hover:underline">Accessibility</a>,
            <a href="#" className="hover:underline"> User Agreement</a>,
            <a href="#" className="hover:underline"> Privacy</a>,
            <a href="#" className="hover:underline"> Payments Terms of Use</a>,
            <a href="#" className="hover:underline"> Cookies</a>,
            <a href="#" className="hover:underline"> Your Privacy Choices</a>
          </p>
        </div>
      </div>
    </footer>
  );
}