# PGCB-Bangladesh-Loadshed-Data-Extract
# Bangladesh Power Grid Dashboard Repair Script

A client-side JavaScript utility to uncover hidden **Demand (MW)** and **Loadshedding** data columns on the Bangladesh power grid hourly generation portal. 

The website developers hidden these metrics using broken HTML comment tags, causing table misalignment. This script surgically extracts the hidden data from the browser's memory, mathematically recalculates the true values, and restores the table layout smoothly without breaking frontend application frameworks.

## 🚀 How to Use It

You can run this script directly inside your browser without installing anything.

### Step 1: Open the Dashboard
Navigate to the official Bangladesh power grid generation updates page. 
> **Important:** If you have run previous layout scripts, refresh the page to ensure you have a clean slate.

### Step 2: Open Developer Console
* Press `F12` (or `Ctrl + Shift + I` on Windows/Linux, `Cmd + Option + I` on Mac).
* Click on the **Console** tab at the top of the developer panel.

### Step 3: Execute the Script
1. Open the [`loadshedview.js`](./loadshedview.js) file in this repository and copy the entire code block.
2. Paste the code directly into your browser console line.
3. Press **Enter**.

The table will instantly update, revealing perfectly aligned data for both **Demand** and **Loadshed**.

---

## 🛠️ How It Works

The script repairs the interface using a three-tiered approach to bypass strict frontend framework loops:

1. **Header Resurrection:** Uses a browser native `NodeIterator` to locate the invisible comment node (`NodeFilter.SHOW_COMMENT`) inside the `<thead>`. It cleanly extracts the text and injects proper `<th>` cells for *Demand(MW)* and *Loadshed*.
2. **Mathematical Calculation:** The developer comments left behind are corrupted text fragments (e.g., `td> -15150.00`). Rather than relying on broken text parsing, the script grabs the live **Generation ($G$)** value and isolates the true **Loadshed ($L$)** variable from the hidden block, then derives the true **Demand** dynamically:
   $$\text{Demand} = \text{Generation} + \text{Loadshedding}$$
3. **Surgical Alignment:** Instead of forcefully overwriting the table via disruptive `.innerHTML` mutations, it targets structural child arrays to cleanly insert the new elements right after the Generation cell anchor, sliding the shifted columns back into place seamlessly.

## 📄 License
This project is open-source and available under the MIT License.
