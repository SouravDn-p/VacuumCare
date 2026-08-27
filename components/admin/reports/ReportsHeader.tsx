import { FileDown, FileText } from "lucide-react";

export default function ReportsHeader({
  onExportPdf,
  onExportCsv,
}: {
  onExportPdf?: () => void;
  onExportCsv?: () => void;
}) {
  return (
    <div className="rpt-header">
      <div className="rpt-header__left">
        <h1 className="rpt-header__title">Reports</h1>
        <p className="rpt-header__subtitle">Analyze business performance and trends</p>
      </div>

      <div className="rpt-header__actions">
        <button id="rpt-export-pdf" className="rpt-btn rpt-btn--outline" type="button" onClick={onExportPdf}>
          <FileText size={16} className="rpt-btn__icon" strokeWidth={1.5} />
          <span>Export PDF</span>
        </button>
        <button id="rpt-export-csv" className="rpt-btn rpt-btn--primary" type="button" onClick={onExportCsv}>
          <FileDown size={16} className="rpt-btn__icon" strokeWidth={1.5} />
          <span>Export CSV</span>
        </button>
      </div>
    </div>
  );
}
