const nodemailer = require("nodemailer");
require("dotenv").config();

const sendWishlistEmail = async (req, res) => {
  const { to_email, to_name, to_number, wishlist } = req.body;

  if (!wishlist || wishlist.length === 0) {
    return res.status(400).json({ message: "Wishlist is empty" });
  }

  let attachments = [];
  let wishlistItemsHTML = wishlist
    .map((item, index) => {
      const filename = `image${index}.png`;
      attachments.push({
        filename,
        content: item.image.split(";base64,").pop(),
        encoding: "base64",
        cid: `image${index}`,
      });

      return `
        <p><strong>${item.product_name}</strong> (ID: ${item.product_id})</p>
        <p>Color: ${item.selected_color.color_name}</p>
        <img src="cid:image${index}" alt="${item.product_name}" width="150"/>
        <hr />
      `;
    })
    .join("");

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "onedegreeeyewear@gmail.com",
      pass: "wcwi bots xzwt cpvc",
    },
  });

  const mailOptions = {
    from: "onedegreeeyewear@gmail.com",
    to: "info@optimedcorp.com",
    subject: "Your Wishlist",
    html: `
      <h2>Your Wishlist</h2>
      <h3><strong> Customer Name :- ${to_name}</strong></h3>
      <h3><strong> Customer Email :- ${to_email}</strong></h3>
      <h3><strong> Customer Number :- ${to_number}</strong></h3>
      <hr/> 
      ${wishlistItemsHTML}
    `,
    attachments,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Wishlist sent successfully!" });
  } catch (error) {
    console.error("Email Error:", error);
    res.status(500).json({ message: "Failed to send wishlist" });
  }
};

module.exports = { sendWishlistEmail };
