const exportCSV = (data, filename) => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      ["Date,Category,Amount,Description"].join(",") + // CSV Headers
      "\n" +
      data.map((row) => `${row.date},${row.category},${row.amount},${row.description || ""}`).join("\n");
  
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
  };
  