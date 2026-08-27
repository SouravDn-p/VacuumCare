"use client";

import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import ProductsFilterTabs from "./ProductsFilterTabs";
import ProductsTable from "./ProductsTable";
import CategoriesGrid from "./CategoriesGrid";
import ProductEditorCard from "./ProductEditorCard";
import { type ProductTab } from "./productsData";
import {
  useCreateAdminProductMutation,
  useGetAdminProductsQuery,
  useUpdateAdminProductMutation,
} from "@/redux/features/api/admin/productsApi";
import { getApiErrorMessage } from "@/lib/getApiErrorMessage";
import AdminSubmitOverlay from "@/components/admin/ui/AdminSubmitOverlay";

interface ProductsContainerProps {
  showCreate: boolean;
  onShowCreateChange: (open: boolean) => void;
}

export default function ProductsContainer({
  showCreate,
  onShowCreateChange,
}: ProductsContainerProps) {
  const [activeTab, setActiveTab] = useState<ProductTab>("All products");
  const [editingId, setEditingId] = useState<string | null>(null);

  const { data, isLoading } = useGetAdminProductsQuery({
    page: 1,
    pageSize: 100,
    ...(activeTab === "Active" ? { isActive: true } : {}),
    ...(activeTab === "Inactive" ? { isActive: false } : {}),
  });
  const [createProduct] = useCreateAdminProductMutation();
  const [updateProduct] = useUpdateAdminProductMutation();
  const [savingEditor, setSavingEditor] = useState(false);

  const products = data?.items ?? [];
  const editingProduct = products.find((item) => item.id === editingId);

  const categories = useMemo(() => {
    const unique = new Set(products.map((item) => item.category).filter(Boolean));
    return Array.from(unique).sort((a, b) => a.localeCompare(b));
  }, [products]);

  const handleCreate = async (body: FormData) => {
    setSavingEditor(true);
    try {
      await createProduct(body).unwrap();
      onShowCreateChange(false);
      toast.success("Product created.");
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Could not create this product."));
    } finally {
      setSavingEditor(false);
    }
  };

  const handleUpdate = async (id: string, body: FormData) => {
    setSavingEditor(true);
    try {
      await updateProduct({ id, body }).unwrap();
      setEditingId(null);
      toast.success("Product updated.");
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Could not update this product."));
    } finally {
      setSavingEditor(false);
    }
  };

  const handleToggleActive = async (id: string, isActive: boolean) => {
    try {
      await updateProduct({ id, body: { isActive: !isActive } }).unwrap();
      toast.success(isActive ? "Product deactivated." : "Product activated.");
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Could not change product status."));
    }
  };

  return (
    <div className="prod-content-layout">
      <ProductsFilterTabs
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          onShowCreateChange(false);
          setEditingId(null);
        }}
      />

      {activeTab === "Categories" ? (
        <CategoriesGrid categories={categories} />
      ) : (
        <>
          {(showCreate || editingProduct) && (
            <ProductEditorCard
              product={showCreate ? undefined : editingProduct}
              saving={savingEditor}
              onCancel={() => {
                onShowCreateChange(false);
                setEditingId(null);
              }}
              onCreate={handleCreate}
              onUpdate={(body) =>
                editingId ? handleUpdate(editingId, body) : undefined
              }
            />
          )}
          <AdminSubmitOverlay
            open={savingEditor}
            message={showCreate ? "Creating product..." : "Saving product..."}
          />
          <ProductsTable
            products={isLoading ? [] : products}
            onEdit={(id) => {
              onShowCreateChange(false);
              setEditingId(id);
            }}
            onToggleActive={handleToggleActive}
          />
        </>
      )}
    </div>
  );
}
