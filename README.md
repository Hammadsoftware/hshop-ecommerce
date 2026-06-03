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

## 🏗️ System Architecture & Data Flow

The application utilizes a decoupled Client-Server architecture. The frontend React application communicates asynchronously with the Node/Express backend via a RESTful API.