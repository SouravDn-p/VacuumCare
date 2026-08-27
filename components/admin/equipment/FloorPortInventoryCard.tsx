import AdminActionButton from "@/components/admin/ui/AdminActionButton";
import { type FloorPortInventory } from "./equipmentData";

export default function FloorPortInventoryCard({
  rows = [],
}: {
  rows?: FloorPortInventory[];
}) {
  return (
    <div className="eq-card">
      <div className="eq-card__header">
        <h2 className="eq-card__title">Floor-wise Vacuum Port Inventory</h2>
        <AdminActionButton variant="secondary">
          Update inlet quantities
        </AdminActionButton>
      </div>
      <div className="eq-table-scroll">
        <table className="eq-table" aria-label="Floor-wise vacuum port inventory">
          <thead>
            <tr>
              <th className="eq-table__th" scope="col">Floor</th>
              <th className="eq-table__th" scope="col">HDH</th>
              <th className="eq-table__th" scope="col">Chameleon</th>
              <th className="eq-table__th" scope="col">Chameleon-Elite</th>
              <th className="eq-table__th" scope="col">Standard</th>
              <th className="eq-table__th" scope="col">Total</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={6}>No inlet inventory for this customer.</td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr
                  key={row.id}
                  className={`eq-table__tr${row.isTotalRow ? " eq-table__tr--total" : ""}`}
                >
                  <td className="eq-table__td eq-table__td--floor">{row.floor}</td>
                  <td className="eq-table__td eq-table__td--val">{row.hdh}</td>
                  <td className="eq-table__td eq-table__td--val">{row.chameleon}</td>
                  <td className="eq-table__td eq-table__td--val">{row.chameleonElite}</td>
                  <td className="eq-table__td eq-table__td--val">{row.standard}</td>
                  <td className="eq-table__td eq-table__td--val eq-table__td--total-col">
                    {row.total}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
