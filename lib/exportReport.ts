export function downloadCsv(filename: string, rows: string[][]) {
  const csv = rows
    .map((row) =>
      row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","),
    )
    .join("\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = filename;

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}

export function downloadVisibleReportTablesCsv(filename: string) {
  const rows: string[][] = [["Metric", "Change", "Value"]];

  document.querySelectorAll(".rpt-table-row").forEach((row) => {
    const label = row.querySelector(".rpt-table-row__label")?.textContent?.trim() ?? "";
    const badge = row.querySelector(".rpt-table-row__badge")?.textContent?.trim() ?? "";
    const value = row.querySelector(".rpt-table-row__value")?.textContent?.trim() ?? "";

    rows.push([label, badge, value]);
  });

  downloadCsv(filename, rows);
}
