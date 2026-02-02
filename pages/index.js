import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://www.paypal.com/sdk/js?client-id=" +
      process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID +
      "&currency=USD";
    script.async = true;
    script.onload = () => {
      window.paypal
        .Buttons({
          createOrder: () =>
            fetch("/api/create-order", { method: "POST" })
              .then(res => res.json())
              .then(data => data.id),
          onApprove: data =>
            fetch("/api/capture-order", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ orderID: data.orderID })
            }).then(() =>
              alert("Payment successful ✈️ Thanks for choosing SkySnooze!")
            )
        })
        .render("#paypal-buttons");
    };
    document.body.appendChild(script);
  }, []);

  return (
    <main style={{ padding: "80px 24px", textAlign: "center" }}>
      <h1>SkySnooze</h1>
      <p>Sleep better at 35,000 feet.</p>
      <h2>$24.99</h2>
      <div id="paypal-buttons" />
      <p style={{ marginTop: 20 }}>
        Every purchase enters the 10,000-pillow sweepstake ✈️
      </p>
    </main>
  );
}
