// components/ui/SaleRibbon.jsx

export default function SaleRibbon() {
  return (
    <>
      <style>{`
        /* ── Ribbon Container ── */
        .ribbon-corner {
          position: absolute;
          top: 0;
          left: 0;
          width: 96px;
          height: 96px;
          overflow: hidden;
          z-index: 30;
          pointer-events: none;
          border-radius: 1rem 0 0 0; /* يتبع border-radius الكارد */
        }

        /* ── الشريط الرئيسي ── */
        .ribbon-corner .ribbon-strip {
          position: absolute;
          top: 20px;
          left: -28px;
          width: 130px;
          padding: 6px 0;
          text-align: center;
          transform: rotate(-45deg);
          transform-origin: center;

          /* اللون والـ gradient للـ glossy effect */
          background: linear-gradient(
            180deg,
            #f87171 0%,
            #ef4444 40%,
            #dc2626 100%
          );

          /* النص */
          color: #fff;
          font-size: 9.5px;
          font-weight: 800;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.25);

          /* الظل */
          box-shadow:
            0 3px 8px rgba(220, 38, 38, 0.45),
            inset 0 1px 0 rgba(255, 255, 255, 0.3);
        }

        /* ── الطية اليسرى (fold) ── */
        .ribbon-corner .ribbon-strip::before {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 0;
          height: 0;
          border-style: solid;
          border-width: 5px 0 0 5px;
          border-color: transparent transparent transparent #991b1b;
        }

        /* ── الطية اليمنى (fold) ── */
        .ribbon-corner .ribbon-strip::after {
          content: '';
          position: absolute;
          bottom: -5px;
          right: 0;
          width: 0;
          height: 0;
          border-style: solid;
          border-width: 5px 5px 0 0;
          border-color: #991b1b transparent transparent transparent;
        }

        /* ── الـ Gloss shine ── */
        .ribbon-corner .ribbon-shine {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 50%;
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.22) 0%,
            rgba(255, 255, 255, 0) 100%
          );
          border-radius: 1px;
          pointer-events: none;
        }
      `}</style>

      <div className="ribbon-corner" aria-label="Sale">
        <div className="ribbon-strip">
          <span className="ribbon-shine" aria-hidden="true" />
          SALE
        </div>
      </div>
    </>
  );
}
