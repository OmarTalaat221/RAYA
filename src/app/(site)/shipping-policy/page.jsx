export const metadata = {
  title: "Shipping Policy | Al Reaya Al Owla Medicine",
};

export default function ShippingPolicy() {
  return (
    <main className=" bg-white py-12 md:py-20 font-sans" dir="ltr">
      <div className="container mx-auto px-4 max-w-4xl">
        <div
          dangerouslySetInnerHTML={{
            __html: `
<div class="shopify-policy__title" style="box-sizing: inherit; text-align: center; color: rgba(38, 36, 42, 0.75); font-family: Poppins, sans-serif; font-size: 16px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: 0.6px; orphans: 2; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; margin-bottom: 2rem;">
    <h1 style="box-sizing: inherit; font-family: Poppins, sans-serif; font-style: normal; font-weight: 500; letter-spacing: 0.78px; color: rgb(38, 36, 42); line-height: 1.23077; word-break: break-word; font-size: 52px;">Shipping policy</h1>
</div>
<div class="shopify-policy__body" style="box-sizing: inherit; color: rgba(38, 36, 42, 0.75); font-family: Poppins, sans-serif; font-size: 16px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: 0.6px; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">
    <div class="rte" style="box-sizing: inherit;">
        <p style="box-sizing: inherit; margin-top: 0px; margin-bottom: 1rem;">Free Delivery over 150AED</p>
        <p style="box-sizing: inherit; margin-bottom: 0px;">Delivery within two working Days</p>
    </div>
</div>
        `,
          }}
        />
      </div>
    </main>
  );
}
