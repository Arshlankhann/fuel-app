```markdown
# ⛽ Fuel Price Visualization Dashboard

A web application that visualizes the **Retail Selling Price (RSP)** of petrol and diesel in major Indian metro cities.  
It provides an **interactive bar chart** with dynamic filtering to analyze fuel price trends over time.

**🔗 Live Demo:** [https://fuel-app-steel.vercel.app/](https://fuel-app-steel.vercel.app/)

---

## 📌 Features

- **📊 Interactive Chart** – Monthly average fuel prices displayed in a clean, readable bar chart.
- **🔍 Dynamic Filtering** – Filter by **metro city**, **fuel type** (petrol or diesel), and **calendar year**.
- **📱 Responsive Design** – Works seamlessly on **desktop, tablet, and mobile devices**.
- **🎨 Classic UI** – Clean and professional interface for better user experience.

---

## 🛠 Tech Stack

- **Frontend:** React, TypeScript
- **Build Tool:** Vite
- **Charting Library:** Apache ECharts
- **CSV Parsing:** PapaParse

---

## ⚙️ Setup and Installation

### **Prerequisites**
- **Node.js** (v16.x or higher)
- **Yarn** or **npm**

---

### **1️⃣ Clone the Repository**
```bash
git clone <your-repository-url>
cd <your-project-directory>
```

---

### **2️⃣ Install Dependencies**

With **Yarn**:
```bash
yarn install
```

With **npm**:
```bash
npm install
```

---

### **3️⃣ Add the Data File**

1. **Download** the fuel price dataset (CSV).
2. **Rename** the file to:
   ```
   petrol-diesel-prices.csv
   ```
3. Place the file inside the `/public` directory at the root of your project.

---

### **4️⃣ Run the Development Server**

With **Yarn**:
```bash
yarn dev
```

With **npm**:
```bash
npm run dev
```

The app will be available in your browser at:
```
http://localhost:5173
```

---

## 📸 Screenshot
*(Add a screenshot of your dashboard here)*

---

## 📄 License
This project is licensed under the **MIT License** – feel free to use and modify it.

---

**Made with ❤️ in React + TypeScript**
```
