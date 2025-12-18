import { FaSquareFacebook } from "react-icons/fa6";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaSquareInstagram } from "react-icons/fa6";
import { AiFillTikTok } from "react-icons/ai";
import { FaSnapchatSquare } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa6";

export default function Footer() {
  const socialLinks = [
    {
      name: "Facebook",
      icon: <FaSquareFacebook />,
      link: "https://www.facebook.com/people/xdiasporamediacom/61583959273072/",
    },
    {
      name: "X",
      icon: <FaSquareXTwitter />,
      link: "https://x.com/AwoudouHaman",
    },
    {
      name: "Instagram",
      icon: <FaSquareInstagram />,
      link: "https://www.instagram.com/xdiasporamedia",
    },
    {
      name: "TikTok",
      icon: <AiFillTikTok />,
      link: "https://www.tiktok.com/@xdiasporamedia.com",
    },
    {
      name: "Snapchat",
      icon: <FaSnapchatSquare />,
      link: "https://www.snapchat.com/@xdiasporamedia",
    },
    {
      name: "YouTube",
      icon: <FaYoutube />,
      link: "https://www.youtube.com/@XDiasporaMedia",
    },
  ];

  return (
    <footer className="bg-[#2e8b57] text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* News Categories */}
          <div>
            <h3 className="text-lg font-bold mb-6">News Categories</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={"/"}
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  Home
                </a>
              </li>
              {[
                { id: 1, title: "Home" },
                { id: 2, title: "Community Stories" },
                { id: 3, title: "Politics & Policy" },
                { id: 4, title: "Culture" },
                { id: 5, title: "Events" },
                { id: 6, title: "Interviews" },
                { id: 7, title: "Opinion" },
                { id: 8, title: "Travel & Migration" },
                { id: 9, title: "Visa Updates" },
              ].map((item) => (
                <li key={item.id}>
                  <a
                    href={"/category/" + item.id + "/" + item.title}
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {item.title}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={"/videos"}
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  XD TV
                </a>
              </li>
              <li>
                <a
                  href={"/podcast"}
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  Podcast
                </a>
              </li>
            </ul>
          </div>

          {/* About Corper News */}
          <div>
            <h3 className="text-lg font-bold mb-6">About XDiaspora Media</h3>
            <ul className="space-y-3">
              {[
                { label: "About Us", href: "/about" },
                { label: "Career", href: "/careers" },
                { label: "Advert Inquiry", href: "/inquiry" },
                { label: "Send Your Story", href: "/story" },
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Useful Links */}
          <div>
            <h3 className="text-lg font-bold mb-6">Useful Links</h3>
            <ul className="space-y-3">
              {[
                {
                  label: "Terms and Conditions",
                  href: "/terms",
                },
                { label: "Privacy Policy", href: "/privacy" },
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect With Us */}
          <div>
            <h3 className="text-lg font-bold mb-6">Connect With Us</h3>
            <ul className="space-y-3">
              {socialLinks.map(({ name, icon, link }) => (
                <li key={name}>
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center gap-2"
                  >
                    {icon} {name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="text-center text-gray-300">
            <p>
              Copyright © {new Date().getFullYear()} XDiaspora Media. All rights
              reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
