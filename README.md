# 🌟 **RepZo (Invoice App)**  
A powerful, user-friendly invoice management application for streamlining financial processes.

---

## 🚀 **Technologies Used**

### **Backend Technologies**  
- 🛠️ **Node.js**  
- 🌐 **Express.js**

### **Database**  
- 🗄️ **MongoDB** (with **Mongoose**)

### **Programming Language**  
- 🖋️ **TypeScript**

### **Validation Library**  
- ✅ **Zod**

---

## 📖 **Project Description**

**RepZo** is a feature-rich application designed to make invoicing and financial management effortless.  
The platform allows:  
- 📋 Users to manage customers, items, payments, expenses, and invoices.  
- 🔍 Administrators to monitor user activities, ensuring operational transparency and efficiency.

---

## 🌟 **Features**

### 👤 **For Users**
- **User Registration & Profile Management**: Register and create personalized profiles.  
- **Customer Management**: Add, update, and delete customer information.  
- **Item Management**: Manage inventory by creating, updating, or deleting item records.  
- **Sales & Payments**: Facilitate item sales and record payments.  
- **Expense Tracking**: Keep track of expenses efficiently.  
- **Invoice Management**: Create and manage invoices with ease.

### 🛡️ **For Administrators**
- **User Tracking**: Monitor all registered users and their data.  
- **Customer and Invoice Monitoring**: Access details of users’ customers and invoices.  
- **Payment & Expense Oversight**: Keep track of payment statuses and user expenses.  
- **Data Management**: Seamlessly integrate specific user data into the admin dashboard.

---

## 🔗 **API Endpoints**

### **User Routes**
| **Action**            | **Method** | **Endpoint**                                |
|-----------------------|------------|--------------------------------------------|
| Create User           | `POST`     | `/api/users`                               |
| Get All Users         | `GET`      | `/api/users`                               |
| Get Single User       | `GET`      | `/api/users/:userId`                       |
| Update User           | `PUT`      | `/api/users/:userId`                       |
| Delete User           | `DELETE`   | `/api/users/:userId`                       |

### **Profile Routes**
| **Action**            | **Method** | **Endpoint**                                |
|-----------------------|------------|--------------------------------------------|
| Create Profile        | `POST`     | `/api/profile/:userId`                     |
| Get All Profiles      | `GET`      | `/api/profile`                             |
| Get Single Profile    | `GET`      | `/api/profile/:profileId`                  |
| Update Profile        | `PUT`      | `/api/profile/:profileId`                  |
| Delete Profile        | `DELETE`   | `/api/profile/:profileId`                  |

### **Customer Routes**
| **Action**            | **Method** | **Endpoint**                                |
|-----------------------|------------|--------------------------------------------|
| Create Customer       | `POST`     | `/api/customer/:userId`                    |
| Get All Customers     | `GET`      | `/api/customer`                            |
| Get Single Customer   | `GET`      | `/api/customer/:customerId`                |
| Update Customer       | `PUT`      | `/api/customer/:customerId`                |
| Delete Customer       | `DELETE`   | `/api/customer/:customerId`                |

### **Item Routes**
| **Action**            | **Method** | **Endpoint**                                |
|-----------------------|------------|--------------------------------------------|
| Create Item           | `POST`     | `/api/item/:userId`                        |
| Get All Items         | `GET`      | `/api/item`                                |
| Get Single Item       | `GET`      | `/api/item/:itemId`                        |
| Update Item           | `PUT`      | `/api/item/:itemId`                        |
| Delete Item           | `DELETE`   | `/api/item/:itemId`                        |

### **Expense Routes**
| **Action**            | **Method** | **Endpoint**                                |
|-----------------------|------------|--------------------------------------------|
| Create Expense        | `POST`     | `/api/expense/:userId`                     |
| Get All Expenses      | `GET`      | `/api/expense`                             |
| Get Single Expense    | `GET`      | `/api/expense/:expenseId`                  |
| Update Expense        | `PUT`      | `/api/expense/:expenseId`                  |
| Delete Expense        | `DELETE`   | `/api/expense/:expenseId`                  |

### **Invoice Routes**
| **Action**            | **Method** | **Endpoint**                                |
|-----------------------|------------|--------------------------------------------|
| Create Invoice        | `POST`     | `/api/invoice/:userId`                     |
| Get All Invoices      | `GET`      | `/api/invoice`                             |
| Get Single Invoice    | `GET`      | `/api/invoice/:invoiceId`                  |
| Update Invoice        | `PUT`      | `/api/invoice/:invoiceId`                  |
| Delete Invoice        | `DELETE`   | `/api/invoice/:invoiceId`                  |

### **Admin Routes**
| **Action**            | **Method** | **Endpoint**                                |
|-----------------------|------------|--------------------------------------------|
| Get Admin Data        | `GET`      | `/api/admin`                               |
| Update Admin Data     | `PUT`      | `/api/admin/:adminId`                      |
| Get Single Admin      | `GET`      | `/api/admin/:adminId`                      |

---

## 🎯 **Special Functionalities**

1. **Automatic Data Synchronization**:  
   - Customers, items, expenses, and invoices created by users are automatically reflected in admin dashboards.

2. **Separate Admin Routes**:  
   - Admin-specific operations are managed through designated routes.

3. **User Data Integration**:  
   - Relevant user data is selectively and securely added to the admin dashboard.

4. **Focused Data Access**:  
   - Admins can access specific details, such as customer and invoice information for each user.

---

