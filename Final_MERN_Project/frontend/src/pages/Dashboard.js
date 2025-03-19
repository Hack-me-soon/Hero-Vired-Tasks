import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./styles.css"; // Importing styles.css
import { FaPencilAlt, FaCheck, FaTimes, FaPlus } from "react-icons/fa"; // Importing icons

function Dashboard() {
  const [stocks, setStocks] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editableStock, setEditableStock] = useState({});
  const [newRow, setNewRow] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Header format with line breaks
  const formattedHeaders = {
    itemName: "ITEM<br>NAME",
    quantityReceived: "QUANTITY<br>RECEIVED",
    quantitySold: "QUANTITY<br>SOLD",
    unitPrice: "UNIT<br>PRICE",
    sellingPrice: "SELLING<br>PRICE",
    week: "WEEK",
    createdAt: "CREATED<br>AT",
    updatedAt: "UPDATED<br>AT",
  };

  // Fetch stocks (Descending order)
  const fetchStocks = useCallback(async () => {
    if (!token) {
      navigate("/");
      return;
    }

    try {
      const response = await axios.get("http://localhost:5000/api/stocks/", {
        headers: { Authorization: `Bearer ${token}` }
        ,
      });

      // ✅ Sort stocks in DESCENDING order by createdAt
      const sortedStocks = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      setStocks(sortedStocks || []); // Ensure stocks is always an array
    } catch (error) {
      console.error("Error fetching stocks:", error.response?.data || error.message);
    }
  }, [token, navigate]);

  useEffect(() => {
    fetchStocks();
  }, [fetchStocks]);

  // Enable edit mode
  const handleEditClick = () => {
    setEditMode(true);
    setEditableStock(
      stocks.reduce((acc, stock) => {
        acc[stock._id] = { ...stock };
        return acc;
      }, {})
    );
  };

  // Handle input change for editing & new rows
  const handleInputChange = (id, key, value) => {
  if (id === "new") {
    setNewRow((prev) => ({ ...prev, [key]: value }));
  } else {
    setEditableStock((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [key]: key.includes("quantity") || key.includes("price") ? parseFloat(value) || 0 : value, // ✅ Ensure numeric values
      },
    }));
  }
};

  // Save updates
  // ✅ Save all edited stock entries including new ones
  // ✅ Save both new and edited stock entries to backend
  const handleSaveClick = async () => {
    try {
      let updatedIST;
      try {
        const timeResponse = await axios.get("https://timeapi.io/api/time/current/zone?timeZone=Asia/Kolkata");
        updatedIST = timeResponse.data.dateTime;
      } catch (apiError) {
        console.warn("⚠️ TimeAPI failed, using local date instead.");
        updatedIST = new Date().toISOString();
      }
  
      console.log("✅ Editable Stock Data before filtering:", editableStock);
  
      // ✅ Ensure `unitPrice` and `sellingPrice` are treated as numbers
      const changedStocks = Object.entries(editableStock)
        .filter(([id, stock]) => {
          const originalStock = stocks.find(s => s._id === id);
          if (!originalStock) return false; // Skip if original stock doesn't exist
  
          // ✅ Compare values properly
          const hasChanged = 
            originalStock.itemName !== stock.itemName ||
            originalStock.quantityReceived !== stock.quantityReceived ||
            originalStock.quantitySold !== stock.quantitySold ||
            parseFloat(originalStock.unitPrice) !== parseFloat(stock.unitPrice) ||
            parseFloat(originalStock.sellingPrice) !== parseFloat(stock.sellingPrice);
  
          return hasChanged;
        })
        .map(([_, stock]) => ({
          ...stock,
          unitPrice: parseFloat(stock.unitPrice), 
          sellingPrice: parseFloat(stock.sellingPrice),
          updatedAt: updatedIST,
        }));
  
      console.log("🔍 Stocks that need to be updated:", changedStocks);
  
      if (changedStocks.length === 0) {
        alert("No changes detected.");
        return;
      }
  
      // ✅ Send updates for changed stocks
      await Promise.all(
        changedStocks.map((stock) =>
          axios.put(`http://localhost:5000/api/stocks/update-sales/${stock._id}`, stock, {
            headers: { Authorization: `Bearer ${token}` },
          })
        )
      );
  
      console.log("✅ Stock update request sent successfully!");
      
      setEditMode(false);
      setEditableStock({});
      fetchStocks();
      alert("Stock's Updated");
    } catch (error) {
      console.error("❌ Error updating stock:", error.response?.data || error.message);
      alert("Failed to update stock");
    }
  };
  


  // Cancel editing
  const handleCancelClick = () => {
    setEditMode(false);
    setEditableStock({});
  };

  // ✅ Add new row at the **TOP**
  const handleAddRow = () => {
    setNewRow({
      itemName: "",
      quantityReceived: "",
      quantitySold: "",
      unitPrice: "",
      sellingPrice: "",
    });
    setEditMode(true);
  };

  // ✅ Save new stock entry (Add at the **TOP**)
  // ✅ Make new row instantly visible but save to backend later
  const handleSaveNewRow = async () => {
    if (!newRow?.itemName || !newRow?.quantityReceived || !newRow?.unitPrice || !newRow?.sellingPrice) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      let year, week, apiDateTime, preservedIST;

      try {
        // ✅ Fetch current date & time from TimeAPI.io (Already in IST)
        const timeResponse = await axios.get("https://timeapi.io/api/time/current/zone?timeZone=Asia/Kolkata");
        year = timeResponse.data.year;
        apiDateTime = timeResponse.data.dateTime; // ✅ Already in IST

        // ✅ Preserve IST as a string instead of letting JS convert it to UTC
        preservedIST = apiDateTime;

        // ✅ Calculate week number manually
        const startOfYear = new Date(year, 0, 1);
        week = Math.ceil(((new Date(apiDateTime) - startOfYear) / 86400000 + startOfYear.getDay() + 1) / 7);
      } catch (apiError) {
        console.warn("⚠️ TimeAPI failed, using local date instead.");
        const currentDate = new Date();
        preservedIST = currentDate.toISOString(); // ✅ Fallback to local time
        const startOfYear = new Date(currentDate.getFullYear(), 0, 1);
        week = Math.ceil(((currentDate - startOfYear) / 86400000 + startOfYear.getDay() + 1) / 7);
        year = currentDate.getFullYear();
      }

      // ✅ Add the new stock to the table but NOT to the backend yet
      const tempStock = {
        _id: `temp-${Date.now()}`, // Temporary ID for frontend display
        ...newRow,
        week,
        year,
        createdAt: preservedIST,
        updatedAt: preservedIST,
      };

      setStocks((prevStocks) => [tempStock, ...prevStocks]); // ✅ Adds new stock at top instantly
      setEditableStock((prev) => ({ ...prev, [tempStock._id]: tempStock })); // ✅ Track for saving later
      setNewRow(null);
    } catch (error) {
      console.error("❌ Error adding stock:", error.response?.data || error.message);
      alert("Failed to add stock");
    }
  };

  return (
    <div>
      <h2>Stock Dashboard</h2>
      <button onClick={() => navigate("/")}>Logout</button>

      {/* Edit & Add Row Buttons */}
      <div className="edit-icons">
        <FaPlus className="icon add-row-icon" onClick={handleAddRow} />
        {!editMode ? (
          <FaPencilAlt className="icon pencil-icon" onClick={handleEditClick} />
        ) : (
          <>
            <FaCheck className="icon check-icon" onClick={handleSaveClick} />
            <FaTimes className="icon cancel-icon" onClick={handleCancelClick} />
          </>
        )}
      </div>

      {/* Stock Table */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              {Object.keys(formattedHeaders)
                .filter((key) => key !== "year") // ✅ Exclude "year", but NOT "week"
                .map((key) => (
                  <th
                    key={key}
                    className="center-header"
                    dangerouslySetInnerHTML={{ __html: formattedHeaders[key] }}
                  />
                ))}
            </tr>
          </thead>

          <tbody>
            {/* ✅ New Row for Adding Data (Appears at the **TOP**) */}
            {newRow && (
              <tr>
                {Object.keys(newRow)
                  .filter((key) => key !== "year") // ✅ Exclude "year", but NOT "week"
                  .map((key) => (
                    <td key={key}>
                      <input
                        type={key.includes("quantity") || key.includes("price") ? "number" : "text"}
                        value={newRow[key] || ""}
                        onChange={(e) => handleInputChange("new", key, e.target.value)}
                      />
                    </td>
                  ))}
                <td>
                  <FaCheck className="icon check-icon" onClick={handleSaveNewRow} />
                  <FaTimes className="icon cancel-icon" onClick={() => setNewRow(null)} />
                </td>
              </tr>
            )}

            {/* ✅ Existing Stock Data (Displayed in DESCENDING ORDER) */}
            {stocks.map((stock) => (
              <tr key={stock._id}>
                {Object.entries(stock)
                  .filter(([key]) => key !== "_id" && key !== "userId" && key !== "__v" && key !== "message" && key !== "year") // ✅ Exclude "year", but NOT "week"
                  .map(([key, value]) => (
                    <td key={key}>
                      {editMode && !["week", "createdAt", "updatedAt"].includes(key) ? (
                        <input
                          type={typeof value === "number" ? "number" : "text"}
                          value={editableStock[stock._id]?.[key] ?? value} // ✅ Fixes undefined error
                          onChange={(e) => handleInputChange(stock._id, key, e.target.value)}
                        />
                      ) : (
                        value
                      )}
                    </td>
                  ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;