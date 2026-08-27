"use client";

import { useEffect, useState } from "react";
import type {
  AdminCreateProductBody,
  AdminProduct,
  AdminUpdateProductBody,
} from "@/types/admin/products";
import { adminProductPrice } from "@/types/admin/products";
import AdminActionButton from "@/components/admin/ui/AdminActionButton";

interface ProductEditorCardProps {
  product?: AdminProduct;
  saving?: boolean;
  onCancel: () => void;
  onCreate: (body: FormData) => void;
  onUpdate: (body: FormData) => void;
}

type SpecRow = { key: string; value: string };

function slugFromName(name: string) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function specRowsFromProduct(product?: AdminProduct): SpecRow[] {
  const entries = Object.entries(product?.specifications ?? {});
  if (!entries.length) return [{ key: "", value: "" }];
  return entries.map(([key, value]) => ({ key, value: String(value) }));
}

function appendProductForm(
  form: FormData,
  payload: AdminCreateProductBody | AdminUpdateProductBody,
  files: File[],
) {
  Object.entries(payload as Record<string, unknown>).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") return;
    if (Array.isArray(value) || typeof value === "object") {
      form.append(key, JSON.stringify(value));
      return;
    }
    form.append(key, String(value));
  });
  files.forEach((file) => form.append("images", file));
  return form;
}

export default function ProductEditorCard({
  product,
  saving,
  onCancel,
  onCreate,
  onUpdate,
}: ProductEditorCardProps) {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [sku, setSku] = useState("");
  const [category, setCategory] = useState("Products");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("0");
  const [description, setDescription] = useState("");
  const [featuresText, setFeaturesText] = useState("");
  const [specRows, setSpecRows] = useState<SpecRow[]>([{ key: "", value: "" }]);
  const [warranty, setWarranty] = useState("");
  const [shippingInfo, setShippingInfo] = useState("");
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [taxable, setTaxable] = useState(true);
  const [slugTouched, setSlugTouched] = useState(false);

  useEffect(() => {
    setName(product?.name ?? "");
    setSlug(product?.slug ?? "");
    setSku(product?.sku ?? "");
    setCategory(product?.category ?? "Products");
    setPrice(product ? String(adminProductPrice(product)) : "");
    setStock(product ? String(product.stock) : "0");
    setDescription(product?.description ?? "");
    setFeaturesText((product?.features ?? []).join("\n"));
    setSpecRows(specRowsFromProduct(product));
    setWarranty(product?.warranty ?? "");
    setShippingInfo(product?.shippingInfo ?? "");
    setImageUrls(product?.imageUrls ?? []);
    setImageFiles([]);
    setTaxable(product?.taxable ?? true);
    setSlugTouched(Boolean(product?.slug));
  }, [product]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const features = featuresText
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);
    const specifications = Object.fromEntries(
      specRows
        .filter((row) => row.key.trim() && row.value.trim())
        .map((row) => [row.key.trim(), row.value.trim()]),
    );
    const payload: AdminCreateProductBody | AdminUpdateProductBody = {
      name: name.trim(),
      description: description.trim() || name.trim(),
      category: category.trim(),
      price: Number(price) || 0,
      stock: Number(stock) || 0,
      sku: sku.trim() || undefined,
      slug: (slug.trim() || slugFromName(name)) || undefined,
      features,
      specifications,
      warranty: warranty.trim() || undefined,
      shippingInfo: shippingInfo.trim() || undefined,
      imageUrls,
      taxable,
      isActive: product?.isActive ?? true,
    };

    if (!payload.name || !payload.category) return;

    const form = appendProductForm(new FormData(), payload, imageFiles);
    if (product) {
      onUpdate(form);
      return;
    }
    onCreate(form);
  };

  const isEditing = Boolean(product);

  return (
    <form className="prod-editor-card" onSubmit={handleSubmit}>
      <div className="prod-editor-card__header">
        <h2 className="prod-editor-card__title">
          {isEditing ? "Edit product" : "Add product"}
        </h2>
        <p className="prod-editor-card__subtitle">
          These fields appear on the store product page: gallery, description,
          specifications, shipping info, and feature list.
        </p>
      </div>

      <div className="prod-editor-grid">
        <div className="prod-editor-field">
          <label className="prod-editor-label" htmlFor="prod-name">
            Product name
          </label>
          <input
            id="prod-name"
            className="prod-editor-input"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (!slugTouched) setSlug(slugFromName(e.target.value));
            }}
            placeholder="Modern Wall Inlets"
            required
          />
        </div>
        <div className="prod-editor-field">
          <label className="prod-editor-label" htmlFor="prod-slug">
            Store URL slug
          </label>
          <input
            id="prod-slug"
            className="prod-editor-input"
            value={slug}
            onChange={(e) => {
              setSlugTouched(true);
              setSlug(e.target.value);
            }}
            placeholder="modern-wall-inlets"
          />
        </div>
        <div className="prod-editor-field">
          <label className="prod-editor-label" htmlFor="prod-sku">
            SKU
          </label>
          <input
            id="prod-sku"
            className="prod-editor-input"
            value={sku}
            onChange={(e) => setSku(e.target.value)}
            placeholder="EL-INLET-5"
          />
        </div>
        <div className="prod-editor-field">
          <label className="prod-editor-label" htmlFor="prod-category">
            Category
          </label>
          <input
            id="prod-category"
            className="prod-editor-input"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Products or Accessories"
            required
          />
        </div>
        <div className="prod-editor-field">
          <label className="prod-editor-label" htmlFor="prod-price">
            Price
          </label>
          <input
            id="prod-price"
            type="number"
            min="0"
            step="0.01"
            className="prod-editor-input"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="0.00"
            required
          />
        </div>
        <div className="prod-editor-field">
          <label className="prod-editor-label" htmlFor="prod-stock">
            Stock
          </label>
          <input
            id="prod-stock"
            type="number"
            min="0"
            step="1"
            className="prod-editor-input"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />
        </div>
        <div className="prod-editor-field prod-editor-field--full">
          <label className="prod-editor-label" htmlFor="prod-description">
            Description
          </label>
          <textarea
            id="prod-description"
            className="prod-editor-textarea"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Shown on the product page Description tab."
          />
        </div>
        <div className="prod-editor-field prod-editor-field--full">
          <label className="prod-editor-label" htmlFor="prod-features">
            Features
          </label>
          <textarea
            id="prod-features"
            className="prod-editor-textarea"
            rows={4}
            value={featuresText}
            onChange={(e) => setFeaturesText(e.target.value)}
            placeholder={"One feature per line\nPremium finish\nEasy installation"}
          />
        </div>
        <div className="prod-editor-field prod-editor-field--full">
          <span className="prod-editor-label">Specifications</span>
          <div className="prod-editor-spec-list">
            {specRows.map((row, index) => (
              <div key={`spec-${index}`} className="prod-editor-spec-row">
                <input
                  className="prod-editor-input"
                  value={row.key}
                  placeholder="Motor"
                  onChange={(e) =>
                    setSpecRows((current) =>
                      current.map((item, itemIndex) =>
                        itemIndex === index
                          ? { ...item, key: e.target.value }
                          : item,
                      ),
                    )
                  }
                />
                <input
                  className="prod-editor-input"
                  value={row.value}
                  placeholder="Dual Stage"
                  onChange={(e) =>
                    setSpecRows((current) =>
                      current.map((item, itemIndex) =>
                        itemIndex === index
                          ? { ...item, value: e.target.value }
                          : item,
                      ),
                    )
                  }
                />
              </div>
            ))}
            <AdminActionButton
              variant="ghost"
              onClick={() =>
                setSpecRows((current) => [...current, { key: "", value: "" }])
              }
            >
              Add specification
            </AdminActionButton>
          </div>
        </div>
        <div className="prod-editor-field">
          <label className="prod-editor-label" htmlFor="prod-warranty">
            Warranty
          </label>
          <input
            id="prod-warranty"
            className="prod-editor-input"
            value={warranty}
            onChange={(e) => setWarranty(e.target.value)}
            placeholder="10 Years"
          />
        </div>
        <div className="prod-editor-field">
          <span className="prod-editor-label">Tax</span>
          <label className="prod-editor-check" htmlFor="prod-taxable">
            <input
              id="prod-taxable"
              type="checkbox"
              checked={taxable}
              onChange={(e) => setTaxable(e.target.checked)}
            />
            This product is taxable
          </label>
        </div>
        <div className="prod-editor-field prod-editor-field--full">
          <label className="prod-editor-label" htmlFor="prod-shipping">
            Shipping info
          </label>
          <textarea
            id="prod-shipping"
            className="prod-editor-textarea"
            rows={3}
            value={shippingInfo}
            onChange={(e) => setShippingInfo(e.target.value)}
            placeholder="Shown on the product page Shipping Info tab."
          />
        </div>
        <div className="prod-editor-field prod-editor-field--full">
          <label className="prod-editor-label" htmlFor="prod-images">
            Product images
          </label>
          <input
            id="prod-images"
            type="file"
            accept="image/*"
            multiple
            className="prod-editor-input"
            onChange={(e) =>
              setImageFiles(Array.from(e.target.files ?? []))
            }
          />
          {imageUrls.length > 0 && (
            <div className="prod-editor-image-list">
              {imageUrls.map((url) => (
                <div key={url} className="prod-editor-image-chip">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={url}
                    alt=""
                    className="prod-editor-image-chip__img"
                  />
                  <button
                    type="button"
                    className="admin-btn admin-btn--ghost"
                    onClick={() =>
                      setImageUrls((current) =>
                        current.filter((item) => item !== url),
                      )
                    }
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="prod-editor-card__footer">
        <AdminActionButton variant="ghost" onClick={onCancel}>
          Cancel
        </AdminActionButton>
        <AdminActionButton
          type="submit"
          variant="primary"
          disabled={saving}
          disabledReason={saving ? "This product is still being saved." : undefined}
        >
          {saving ? "Saving..." : isEditing ? "Save changes" : "Create product"}
        </AdminActionButton>
      </div>
    </form>
  );
}
