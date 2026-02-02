export default async function handler(req, res) {
  const auth = Buffer.from(
    process.env.PAYPAL_SECRET_ID + ":" + process.env.PAYPAL_SECRET
  ).toString("base64");

  const response = await fetch(
    "https://api-m.paypal.com/v2/checkout/orders",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${auth}`
      },
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: "USD",
              value: "24.99"
            },
            payee: {
              email_address: "lemononsteroids1@gmail.com"
            }
          }
        ]
      })
    }
  );

  const data = await response.json();
  res.status(200).json(data);
}
