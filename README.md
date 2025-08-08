# ⛽ Fuel Price Visualization Dashboard

A web application that visualizes the **Retail Selling Price (RSP)** of petrol and diesel in major Indian metro cities.  
It provides an **interactive bar chart** with dynamic filtering to analyze fuel price trends over time.

**🔗 Live Demo:** [https://fuel-app-steel.vercel.app/](https://fuel-app-steel.vercel.app/)

**📂 Download Fuel Price Data:** [Click here to get the dataset (CSV)](https://drive.google.com/file/d/1Zgb8KVmKoEWvk_3kMq9TVV7KDTujkfPd/view)

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

### **2️⃣ Install Dependencies**
With **Yarn**:
```bash
yarn install
```
With **npm**:
```bash
npm install
```

### **3️⃣ Add the Data File**
1. **Download** the fuel price dataset from [here](https://drive.google.com/file/d/1Zgb8KVmKoEWvk_3kMq9TVV7KDTujkfPd/view).
2. **Rename** the file to:
   ```
   petrol-diesel-prices.csv
   ```
3. Place the file inside the `/public` directory at the root of your project.

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

## 🚀 Deployment
The project is deployed on **Vercel**. To deploy your own version:
1. Push your project to GitHub.
2. Import it into [Vercel](https://vercel.com/).
3. Set up your environment and deploy.

---

## 📄 License
This project is licensed under the **MIT License** – feel free to use and modify it.

---

**Made with ❤️ in React + TypeScript**
