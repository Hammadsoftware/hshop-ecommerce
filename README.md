# 🛒 MERN Stack E-Commerce Platform

A fully functional, modern e-commerce web application built using the MERN stack (MongoDB, Express.js, React, and Node.js). This platform features user authentication, product management, a shopping cart, and a secure payment gateway integration.

---

## 🚀 Features

### 👤 User Authentication & Profiles
* **JWT-Based Auth:** Secure registration, login, and logout.
* **User Dashboard:** View order history and update profile settings.
* **Role-Based Access Control:** Distinct views and permissions for **Users** and **Admins**.

### 🛍️ Shopping Experience
* **Product Catalog:** Browse products with advanced filtering, sorting, and search capabilities.
* **Product Details:** View rich descriptions, images, stock availability, and user reviews.
* **Shopping Cart:** Add, update, or remove items with real-time price calculations.

### 💳 Order & Payment Management
* **Checkout Process:** Multi-step checkout (Shipping address ➡️ Payment ➡️ Order Summary).
* **Payment Gateway:** Integrated with **Stripe** (or PayPal) for secure credit card processing.
* **Order Tracking:** Real-time updates on order status (Pending, Shipped, Delivered).

### 🛠️ Admin Dashboard (Management)
* **Product Control:** Create, read, update, and delete (CRUD) products and categories.
* **Order Overview:** View and manage all customer orders, and update shipping statuses.
* **User Management:** View registered users and manage permissions.

---

## 🛠️ Tech Stack

* **Frontend:** React.js, Redux Toolkit (State Management), Tailwind CSS / Bootstrap, Axios
* **Backend:** Node.js, Express.js
* **Database:** MongoDB (via Mongoose Object Modeling)
* **Authentication:** JSON Web Tokens (JWT) & bcryptjs
* **Payments:** Stripe API / PayPal SDK
* **File Uploads:** Cloudinary (for product images)

---

## ⚙️ Prerequisites

Before running the project locally, ensure you have the following installed:
* [Node.js](https://nodejs.org/) (v16.x or higher)
* [MongoDB](https://www.mongodb.com/) (Local instance or MongoDB Atlas account)
* [Git](https://git-scm.com/)

---

## 📥 Getting Started

### 1. Clone the Repository
```bash
git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)
cd your-repo-name