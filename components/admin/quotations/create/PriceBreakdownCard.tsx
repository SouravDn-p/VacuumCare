interface PriceBreakdownCardProps {
  laborAmount: string;
  onLaborChange: (val: string) => void;
  partsAmount: number;
  discount: string;
  onDiscountChange: (val: string) => void;
  taxAmount: number;
  validUntil: string;
  onValidUntilChange: (val: string) => void;
  totalAmount: number;
  readOnly?: boolean;
}

export default function PriceBreakdownCard({
  laborAmount,
  onLaborChange,
  partsAmount,
  discount,
  onDiscountChange,
  taxAmount,
  validUntil,
  onValidUntilChange,
  totalAmount,
  readOnly = false,
}: PriceBreakdownCardProps) {
  return (
    <div className="cq-card">
      <h2 className="cq-card__title">Price Breakdown</h2>

      <div className="cq-price-rows">
        <div className="cq-price-row">
          <label htmlFor="cq-labor-input" className="cq-price-label">
            Labor
          </label>
          <div className="cq-currency-input-wrap">
            <span className="cq-currency-symbol">$</span>
            <input
              type="number"
              id="cq-labor-input"
              className="cq-currency-input"
              placeholder="0"
              min="0"
              step="0.01"
              value={laborAmount}
              onChange={(e) => onLaborChange(e.target.value)}
              readOnly={readOnly}
            />
          </div>
        </div>

        <div className="cq-price-row">
          <span className="cq-price-label">Parts and materials</span>
          <span className="cq-price-value">${partsAmount.toFixed(2)}</span>
        </div>

        <div className="cq-price-row">
          <label htmlFor="cq-discount-input" className="cq-price-label">
            Discount
          </label>
          <div className="cq-currency-input-wrap">
            <span className="cq-currency-symbol">$</span>
            <input
              type="number"
              id="cq-discount-input"
              className="cq-currency-input"
              placeholder="0"
              min="0"
              step="0.01"
              value={discount}
              onChange={(e) => onDiscountChange(e.target.value)}
              readOnly={readOnly}
            />
          </div>
        </div>

        <div className="cq-price-row cq-price-row--tax">
          <span className="cq-price-label">Tax (0%)</span>
          <span className="cq-price-value">${taxAmount.toFixed(2)}</span>
        </div>

        <div className="cq-price-row">
          <label htmlFor="cq-valid-until" className="cq-price-label">
            Valid until
          </label>
          <input
            type="date"
            id="cq-valid-until"
            className="cq-currency-input"
            value={validUntil}
            onChange={(e) => onValidUntilChange(e.target.value)}
            readOnly={readOnly}
            disabled={readOnly}
          />
        </div>

        <div className="cq-price-row cq-price-row--total">
          <span className="cq-price-label cq-price-label--total">
            Final quoted amount
          </span>
          <span className="cq-price-value cq-price-value--total">
            ${totalAmount.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}
