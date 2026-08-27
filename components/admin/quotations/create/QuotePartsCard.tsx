"use client";

import { useState } from "react";
import AdminActionButton from "@/components/admin/ui/AdminActionButton";
import { useGetAdminProductsQuery } from "@/redux/features/api/admin/productsApi";
import { adminProductPrice } from "@/types/admin/products";

export interface QuotePartLine {
  productId: string;
  name: string;
  price: number;
  qty: number;
}

interface QuotePartsCardProps {
  lines: QuotePartLine[];
  onChange: (lines: QuotePartLine[]) => void;
  readOnly?: boolean;
}

export default function QuotePartsCard({
  lines,
  onChange,
  readOnly = false,
}: QuotePartsCardProps) {
  const [selectedId, setSelectedId] = useState("");
  const { data } = useGetAdminProductsQuery({
    page: 1,
    pageSize: 100,
    isActive: true,
  });

  const products = data?.items ?? [];

  const addProduct = () => {
    const product = products.find((item) => item.id === selectedId);
    if (!product) return;

    const existing = lines.find((line) => line.productId === product.id);
    if (existing) {
      onChange(
        lines.map((line) =>
          line.productId === product.id
            ? { ...line, qty: line.qty + 1 }
            : line,
        ),
      );
    } else {
      onChange([
        ...lines,
        {
          productId: product.id,
          name: product.name,
          price: adminProductPrice(product),
          qty: 1,
        },
      ]);
    }
    setSelectedId("");
  };

  return (
    <div className="cq-card">
      <h2 className="cq-card__title">Parts from products</h2>

      {!readOnly && (
      <div className="cq-field-group">
        <label htmlFor="cq-part-product" className="cq-field-label">
          Add a catalog product
        </label>
        <select
          id="cq-part-product"
          className="cq-currency-input"
          value={selectedId}
          onChange={(e) => setSelectedId(e.target.value)}
        >
          <option value="">Select product...</option>
          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name} — ${adminProductPrice(product).toFixed(2)}
            </option>
          ))}
        </select>
        <AdminActionButton
          variant="primary"
          disabledReason={
            selectedId ? undefined : "Select a catalog product before adding a part."
          }
          onClick={addProduct}
        >
          Add part
        </AdminActionButton>
      </div>
      )}

      <div className="cq-price-rows">
        {lines.length === 0 ? (
          <p className="cq-field-label">
            No parts added. Labor can still be sent on its own.
          </p>
        ) : (
          lines.map((line) => (
            <div key={line.productId} className="cq-price-row">
              <span className="cq-price-label">
                {line.name} × {line.qty}
              </span>
              <span className="cq-price-value">
                ${(line.price * line.qty).toFixed(2)}
              </span>
              {!readOnly && (
              <div className="quote-actions-cell admin-btn-row">
                <AdminActionButton
                  variant="ghost"
                  onClick={() =>
                    onChange(
                      lines.map((item) =>
                        item.productId === line.productId
                          ? { ...item, qty: item.qty + 1 }
                          : item,
                      ),
                    )
                  }
                >
                  +
                </AdminActionButton>
                <AdminActionButton
                  variant="ghost"
                  onClick={() =>
                    onChange(
                      line.qty <= 1
                        ? lines.filter((item) => item.productId !== line.productId)
                        : lines.map((item) =>
                            item.productId === line.productId
                              ? { ...item, qty: item.qty - 1 }
                              : item,
                          ),
                    )
                  }
                >
                  −
                </AdminActionButton>
                <AdminActionButton
                  variant="danger"
                  onClick={() =>
                    onChange(
                      lines.filter((item) => item.productId !== line.productId),
                    )
                  }
                >
                  Remove
                </AdminActionButton>
              </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export function partsTotal(lines: QuotePartLine[]) {
  return Number(
    lines
      .reduce((sum, line) => sum + line.price * line.qty, 0)
      .toFixed(2),
  );
}

export function partsNotes(lines: QuotePartLine[]) {
  if (!lines.length) return "";
  return [
    "Parts:",
    ...lines.map(
      (line) =>
        `- ${line.name} × ${line.qty} — $${(line.price * line.qty).toFixed(2)}`,
    ),
  ].join("\n");
}
