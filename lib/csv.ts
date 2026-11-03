/**
 * Convert an array of objects to a CSV string
 */
export function jsonToCsv(rows: Record<string, unknown>[], headers: { key: string; label: string }[]): string {
  if (!rows || rows.length === 0) {
    return headers.map((h) => `"${h.label}"`).join(",") + "\n";
  }

  const headerLine = headers.map((h) => `"${h.label}"`).join(",");
  const dataLines = rows.map((row) => {
    return headers
      .map((h) => {
        const val = row[h.key];
        if (val === null || val === undefined) return '""';
        const str = String(val).replace(/"/g, '""');
        return `"${str}"`;
      })
      .join(",");
  });

  return [headerLine, ...dataLines].join("\n");
}

