import React from "react";
import warrentyBanner from "../assets/warrantyBanner.jpg"


const Warranty = () => {
  window.scrollTo(0, 0);
  return (
    <div>
      {/* main banner page */}
      <div className="">
        <img
          src={warrentyBanner}
          alt="About Us Banner"
          className="w-[100%] md:h-[780px] object-contain md:object-cover mt-[3.2rem] md:mt-0"
        />
      </div>

      {/*  Heading Section */}
      <div className="mx-5 md:mx-40">
        <h1 className="text-center mt-3 md:mt-5 font-medium text-[25px] md:text-[40px]  text-[#3A4831] font-libre">
          Warranty and Care
        </h1>

        {/* content 1 */}
        <div className=" text-[17px] md:text-[20px]">
          <p className="mt-3 md:mt-5">
            One Degree Eyewear embodies the essence of luxury and
            sophistication. Our frames are crafted from the finest Titanium and
            premium-quality acetate, designed to deliver exceptional comfort,
            enduring style and durability.
          </p>

          <h2 className="mt-3 md:mt-5 font-bold text-[#3A4831] font-libre">
            2 Years Manufacturing Warranty
          </h2>

          <p className="mt-3 md:mt-5 ">
            Each pair of One Degree Eyewear comes with a 2-year manufacturing
            warranty from the date of purchase at an authorised Eye care
            Practitioner or Optical store, ensuring the highest quality and
            satisfaction standards. During this period, if your One Degree
            Eyewear is found to have a manufacturing defect, the company will
            attempt to either:
          </p>

          <ul className="list-disc mt-3 md:mt-5 ml-8 md:ml-16">
            <li>Repair the damaged part of the product, or</li>
            <li>
              Replace it with the same product (if available) or a similar
              product of equivalent value.
            </li>
          </ul>
        </div>

        {/*  content2 */}
        <div className=" text-[17px] md:text-[20px]">
          <h1 className="mt-3 md:mt-5 font-bold text-[#3A4831] font-libre">
            The warranty does not cover:
          </h1>

          <ul className="list-disc mt-3 md:mt-5 ml-8 md:ml-16">
            <li> Damage resulting from accidents, misuse, or negligence.</li>
            <li>Tampering and loss of components or accessories.</li>
            <li>Normal wear and tear.</li>
            <li>Unauthorised repairs or modifications.</li>
          </ul>
        </div>

        {/* content 3 */}
        <div className=" text-[17px] md:text-[20px]">
          <h1 className="mt-3 md:mt-5 font-bold text-[#3A4831] font-libre">Conditions of Warranty:</h1>
          <ul className="list-disc mt-3 md:mt-5 ml-8 md:ml-16">
            <li>
              {" "}
              To validate this warranty, make sure the purchase date is written
              on your product warranty card.
            </li>
            <li>
              Please obtain proof of purchase (Invoice) from the authorised
              dealer.
            </li>
            <li>
              The warranty will automatically expire at the end of the warranty
              period, regardless of the product's usage.
            </li>
            <li>
              The company's decision regarding the nature of defects and the
              applicability of the warranty will be final.
            </li>
            <li>
              The defective product must be delivered to the Eyecare
              Practitioner or Optical store at the user's risk and expense.
            </li>
            <li>
              The company will in no event be liable or obligated for the
              payments/refund of any specific incidental or consequential
              damages.
            </li>
            <li>This warranty is subject to Mumbai jurisdiction.</li>
          </ul>

          <p className=" mt-3 md:mt-5  mb-10">
            {" "}
            By following these simple steps, you can continue to experience the
            exceptional comfort and durability that your One Degree Eyewear is
            designed to give.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Warranty;
