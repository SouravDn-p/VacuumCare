import { type ProductItem } from "./productsData";
import type { AdminProduct } from "@/types/admin/products";
import { adminProductPrice } from "@/types/admin/products";
import AdminActionButton from "@/components/admin/ui/AdminActionButton";

interface ProductsTableProps {
  products: AdminProduct[];
  onEdit?: (id: string) => void;
  onToggleActive?: (id: string, isActive: boolean) => void;
}

function toRow(product: AdminProduct): ProductItem {
  return {
    id: product.id,
    name: product.name,
    sku: product.sku || "—",
    category: product.category,
    price: `$${adminProductPrice(product).toFixed(2)}`,
    taxable: product.taxable ? "Yes" : "No",
    status: product.isActive ? "Active" : "Deactive",
  };
}

export default function ProductsTable({
  products,
  onEdit,
  onToggleActive,
}: ProductsTableProps) {
  const rows = products.map(toRow);

  return (
    <div className="prod-table-card">
      <div className="prod-table-scroll">
        <table className="prod-table" aria-label="Products inventory list">
          <thead>
            <tr>
              <th className="prod-table__th" scope="col">Product</th>
              <th className="prod-table__th" scope="col">SKU</th>
              <th className="prod-table__th" scope="col">Category</th>
              <th className="prod-table__th" scope="col">Price</th>
              <th className="prod-table__th" scope="col">Taxable</th>
              <th className="prod-table__th" scope="col">Status</th>
              <th className="prod-table__th" scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={7} className="prod-table__empty-cell">
                  <p className="prod-table__empty-text">No products in this category.</p>
                </td>
              </tr>
            ) : (
              rows.map((prod) => {
                const source = products.find((item) => item.id === prod.id);
                return (
                  <tr key={prod.id} className="prod-table__tr">
                    <td className="prod-table__td prod-table__td--name">
                      {prod.name}
                    </td>
                    <td className="prod-table__td prod-table__td--sku">
                      {prod.sku}
                    </td>
                    <td className="prod-table__td prod-table__td--cat">
                      {prod.category}
                    </td>
                    <td className="prod-table__td prod-table__td--price">
                      {prod.price}
                    </td>
                    <td className="prod-table__td prod-table__td--tax">
                      {prod.taxable}
                    </td>
                    <td className="prod-table__td prod-table__td--status">
                      <span
                        className={`prod-badge ${
                          prod.status === "Active"
                            ? "prod-badge--active"
                            : "prod-badge--deactive"
                        }`}
                      >
                        {prod.status}
                      </span>
                    </td>
                    <td className="prod-table__td prod-table__td--action">
                      <div className="prod-actions-cell admin-btn-row">
                        <AdminActionButton
                          variant="secondary"
                          onClick={() => onEdit?.(prod.id)}
                        >
                          Edit
                        </AdminActionButton>
                        <AdminActionButton
                          variant={prod.status === "Active" ? "ghost" : "primary"}
                          onClick={() =>
                            onToggleActive?.(prod.id, source?.isActive ?? true)
                          }
                        >
                          {prod.status === "Active" ? "Deactivate" : "Activate"}
                        </AdminActionButton>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
