// components/FeaturedProducts/SaleRibbon.jsx

export default function SaleRibbon({ text = "SALE" }) {
  return (
    <>
      <style>{`
        /* ── Container ── */
        .sale-ribbon-wrap {
          position: absolute;
          top: -2px;
          left: -2px;
          width: 100px;
          height: 100px;
          overflow: hidden;
          z-index: 40;
          pointer-events: none;
        }

 

        /* ── الشريط نفسه ── */
        .sale-ribbon-strip {
          position: absolute;
          display: block;
          width: 150px;
          padding: 7px 0;
          text-align: center;

          /* اللون الأحمر + gradient للـ depth */
          background: linear-gradient(
            180deg,
            #f87171 0%,
            #ef4444 35%,
            #dc2626 70%,
            #b91c1c 100%
          );

          /* الظل */
          box-shadow:
            0 4px 12px rgba(185, 28, 28, 0.4),
            inset 0 1px 0 rgba(255, 255, 255, 0.25),
            inset 0 -1px 0 rgba(0, 0, 0, 0.1);

          /* النص */
          color: #fff;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
          line-height: 1.2;

          /* الموقع والدوران — شمال فوق */
          left: -40px;
          top: 22px;
          transform: rotate(-45deg);
        }

        /* ── Fold يمين ── */
        .sale-ribbon-strip::before {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 0;
          height: 0;
          border-style: solid;
          border-width: 5px 5px 0 0;
          border-color: #7f1d1d transparent transparent transparent;
        }

        /* ── Fold شمال ── */
        .sale-ribbon-strip::after {
          content: '';
          position: absolute;
          bottom: -5px;
          right: 0;
          width: 0;
          height: 0;
          border-style: solid;
          border-width: 0 5px 5px 0;
          border-color: transparent #7f1d1d transparent transparent;
        }

        /* ── Glossy shine ── */
        .sale-ribbon-shine {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 50%;
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.28) 0%,
            rgba(255, 255, 255, 0.08) 60%,
            rgba(255, 255, 255, 0) 100%
          );
          pointer-events: none;
          border-radius: 1px;
        }

        /* ── Tablet ── */
        @media (max-width: 1024px) {
          .sale-ribbon-wrap {
            width: 90px;
            height: 90px;
          }
          .sale-ribbon-strip {
            width: 135px;
            padding: 6px 0;
            font-size: 10px;
            left: -37px;
            top: 18px;
          }
        }

        /* ── Mobile ── */
        @media (max-width: 640px) {
          .sale-ribbon-wrap {
            width: 80px;
            height: 80px;
          }
          .sale-ribbon-strip {
            width: 120px;
            padding: 5px 0;
            font-size: 9.5px;
            left: -34px;
            top: 16px;
          }
          .sale-ribbon-strip::before,
          .sale-ribbon-strip::after {
            border-width: 4px;
          }
        }

        /* ── Extra small ── */
        @media (max-width: 380px) {
          .sale-ribbon-wrap {
            width: 75px;
            height: 75px;
          }
          .sale-ribbon-strip {
            width: 110px;
            padding: 4px 0;
            font-size: 9px;
            left: -32px;
            top: 14px;
          }
        }
      `}</style>

      <div className="sale-ribbon-wrap" aria-label={text}>
        <span className="sale-ribbon-strip">
          <span className="sale-ribbon-shine" aria-hidden="true" />
          {text}
        </span>
      </div>
    </>
  );
}
