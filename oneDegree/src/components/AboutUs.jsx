import { useEffect } from "react";
import AboutBanner from "../assets/AboutBanner.png";


const AboutUs = () => {
   useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

  const sections = [
    {
      title: "Our Story",
      description:
        "At One Degree, our story begins with an idea: to create eyewear that seamlessly merges timeless elegance with contemporary functionality. Inspired by the precision of a single degree, our designs embody our commitment to perfecting the balance of comfort and style. Each frame is a testament to meticulous craftsmanship, where every detail is thoughtfully considered. Our journey is to empower individuals seeking refinement in eyewear through classic design, high durability, ergonomic comfort and performance.",
      image:
        "https://darkgrey-porpoise-359659.hostingersite.com/wp-content/uploads/2024/12/1.png",
    },
    {
      title: "Our Vision & Values",
      description:
        "Our vision is to be the final brand in the users' eyewear journey, offering classic, comfort-driven eyewear that seamlessly combines timeless style with exceptional comfort. Each pair is crafted with expertise, ensuring that you not only look great but also experience all-day wearability. Our commitment goes beyond aesthetics, prioritising durability and performance. With One Degree, you invest in eyewear that complements your lifestyle and adapts effortlessly to your everyday needs.",
      image:
        "https://darkgrey-porpoise-359659.hostingersite.com/wp-content/uploads/2024/12/2.png",
    },
    {
      title: "Materials We Use",
      description:
        "Titanium is at the heart of One Degree eyewear. With Titanium as our cornerstone, every frame is a masterpiece of precision and performance, designed for those who seek comfort. Crafted to perfection, our Titanium frames maintain their original integrity, ensuring they look as impeccable years later as the day they were first worn. Alongside Titanium, we use Acetanium, a fusion of high-quality acetate and Titanium for enhanced comfort and durability",
      image:
        "https://darkgrey-porpoise-359659.hostingersite.com/wp-content/uploads/2024/12/3.png",
    },
  ];

  return (
    <div>
      {/* Banner Image */}
      <div>
        <img
          src={AboutBanner}
          alt="About Us Banner"
          className="w-full md:h-[780px] object-contain md:object-cover mt-[3.2rem] md:mt-0 "
        />
      </div>

      {/* Sections */}
      <div className="  ">
        {sections.map((section, index) => (
          <div className="bg-[#485c3b]" key={index}>
            <div
              key={index}
              className={`flex flex-col md:flex-row ${index % 2 === 0 ? "md:flex-row-reverse" : ""
                } items-center  p-6 md:p-12  mt-3 mb-3  px-4 md:px-40 `}
            >
              {/* Image Section */}
              <div className="w-full md:w-1/2 flex justify-center mb-6 md:mb-0">
                <img
                  src={section.image}
                  alt={section.title}
                  className="w-full h-auto md:h-[24rem] object-contain"
                />
              </div>

              {/* Text Section */}
              <div className="w-full md:w-1/2 text-center md:text-left">
                <h2 className="text-2xl md:text-3xl font-bold text-white font-libre">
                  {section.title}
                </h2>
                <p className="text-slate-50 mt-4 text-md md:text-lg">
                  {section.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutUs;
