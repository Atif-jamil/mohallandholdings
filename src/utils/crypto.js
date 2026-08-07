/* src/utils/crypto.js */

// Fast & secure browser SHA-256 password hash helper
export async function hashPassword(password) {
  if (!password) return "";
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

// Compare plain text password against stored hash
export async function verifyPassword(password, storedHash) {
  if (!password || !storedHash) return false;
  const hash = await hashPassword(password);
  return hash === storedHash;
}

// Download data array as CSV file
export function exportToCSV(filename, rows, headers) {
  if (!rows || !rows.length) return;
  const headerKeys = headers ? Object.keys(headers) : Object.keys(rows[0]);
  const headerTitles = headers ? Object.values(headers) : headerKeys;

  let csvContent = "data:text/csv;charset=utf-8,";
  csvContent += headerTitles.map((t) => `"${t}"`).join(",") + "\n";

  rows.forEach((row) => {
    const rowContent = headerKeys
      .map((key) => {
        let val = row[key] ?? "";
        if (typeof val === "object") val = JSON.stringify(val);
        return `"${String(val).replace(/"/g, '""')}"`;
      })
      .join(",");
    csvContent += rowContent + "\n";
  });

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `${filename}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
