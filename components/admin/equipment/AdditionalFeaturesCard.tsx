import { type AdditionalFeature } from "./equipmentData";

export default function AdditionalFeaturesCard({
  features = [],
}: {
  features?: AdditionalFeature[];
}) {
  return (
    <div className="eq-card">
      <div className="eq-card__header">
        <h2 className="eq-card__title">Additional Features</h2>
      </div>
      <div className="eq-table-scroll">
        <table className="eq-table" aria-label="Additional vacuum features list">
          <thead>
            <tr>
              <th className="eq-table__th" scope="col">Type</th>
              <th className="eq-table__th" scope="col">Quantity</th>
              <th className="eq-table__th" scope="col">Location</th>
            </tr>
          </thead>
          <tbody>
            {features.length === 0 ? (
              <tr>
                <td colSpan={3}>No additional features recorded.</td>
              </tr>
            ) : (
              features.map((feat) => (
                <tr key={feat.id} className="eq-table__tr">
                  <td className="eq-table__td eq-table__td--type">{feat.type}</td>
                  <td className="eq-table__td eq-table__td--val">{feat.quantity}</td>
                  <td className="eq-table__td eq-table__td--loc">{feat.location}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
