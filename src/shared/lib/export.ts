export function exportToCsv(
  filename: string,
  headers: string[],
  rows: (string | number)[][],
) {
  const cleanRows = rows.map((row) =>
    row.map((val) => {
      if (val === undefined || val === null) return "";
      const valStr = String(val);
      if (
        valStr.includes(",") ||
        valStr.includes('"') ||
        valStr.includes("\n") ||
        valStr.includes("\r")
      ) {
        return `"${valStr.replace(/"/g, '""')}"`;
      }
      return valStr;
    }),
  );

  const csvContent = [
    headers.join(","),
    ...cleanRows.map((row) => row.join(",")),
  ].join("\r\n");

  const blob = new Blob(["\ufeff" + csvContent], {
    type: "text/csv;charset=utf-8;",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
