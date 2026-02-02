export default async function handler(req, res) {
  const { orderID } = req.body;

  const auth = Buffer.from(
    process.env.PAYPAL_SECRET_ID + ":" + process.env.PAYPAL_SECRET
  ).toString("base64");

  await fetch(
    `https://api-m.paypal.com/v2/checkout/orders/${orderID}/capture`,
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`
      }
    }
  );

  res.status(200).json({ success: true });
}
