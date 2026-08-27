import AdminActionButton from "@/components/admin/ui/AdminActionButton";
import { type VacuumUnit } from "./equipmentData";

export default function MainVacuumUnitsCard({
  units = [],
}: {
  units?: VacuumUnit[];
}) {
  return (
    <div className="eq-card">
      <div className="eq-card__header">
        <h2 className="eq-card__title">Main Vacuum Units</h2>
        <AdminActionButton variant="secondary">
          Edit equipment
        </AdminActionButton>
      </div>

      <div className="eq-table-scroll">
        <table className="eq-table" aria-label="Main vacuum units list">
          <thead>
            <tr>
              <th className="eq-table__th" scope="col">Unit #</th>
              <th className="eq-table__th" scope="col">Manufacturer</th>
              <th className="eq-table__th" scope="col">Model</th>
              <th className="eq-table__th" scope="col">Serial number</th>
              <th className="eq-table__th" scope="col">Location</th>
            </tr>
          </thead>
          <tbody>
            {units.length === 0 ? (
              <tr>
                <td colSpan={5}>No vacuum units for this customer.</td>
              </tr>
            ) : (
              units.map((unit) => (
              <tr key={unit.id} className="eq-table__tr">
                <td className="eq-table__td eq-table__td--num">{unit.unitNumber}</td>
                <td className="eq-table__td">{unit.manufacturer}</td>
                <td className="eq-table__td">{unit.model}</td>
                <td className="eq-table__td">{unit.serialNumber}</td>
                <td className="eq-table__td">{unit.location}</td>
              </tr>
            ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
