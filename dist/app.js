"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const customer_route_1 = require("./app/modules/user/customer/customer.route");
const customerUser_route_1 = require("./app/modules/user/customerUser/customerUser.route");
const expense_route_1 = require("./app/modules/user/expense/expense.route");
const invoice_route_1 = require("./app/modules/user/invoice/invoice.route");
const invoiceItem_route_1 = require("./app/modules/user/invoiceItem/invoiceItem.route");
const item_route_1 = require("./app/modules/user/item/item.route");
const notification_route_1 = require("./app/modules/user/notification/notification.route");
const payment_route_1 = require("./app/modules/user/payment/payment.route");
const profile_route_1 = require("./app/modules/user/profile/profile.route");
const quotes_route_1 = require("./app/modules/user/quotes/quotes.route");
const settings_route_1 = require("./app/modules/user/settings/settings.route");
const sslPayment_route_1 = require("./app/modules/user/sslPayment/sslPayment.route");
const track_route_1 = require("./app/modules/user/track/track.route");
const user_route_1 = require("./app/modules/user/user-modules/user.route");
const app = (0, express_1.default)();
app.use(body_parser_1.default.json({ limit: '50mb' }));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded());
// API Routes:
// Admin Route:
// app.use('/api/admin', AdminRoutes);
// User Routes:
app.use('/api/track', track_route_1.TrackRoutes);
app.use('/api/sslPayment', sslPayment_route_1.SSLPaymentRoutes);
app.use('/api/users', user_route_1.UserRoutes);
app.use('/api/customerUser', customerUser_route_1.CustomerUserRoutes);
app.use('/api/customer', customer_route_1.CustomerRoutes);
app.use('/api/expense', expense_route_1.ExpenseRoutes);
app.use('/api/invoice', invoice_route_1.InvoiceRoutes);
app.use('/api/quote', quotes_route_1.QuoteRoutes);
app.use('/api/invoiceItem', invoiceItem_route_1.InvoiceItemRoutes);
app.use('/api/item', item_route_1.ItemRoutes);
app.use('/api/notification', notification_route_1.NotificationRoutes);
app.use('/api/payment', payment_route_1.PaymentRoutes);
app.use('/api/profile', profile_route_1.ProfileRoutes);
app.use('/api/settings', settings_route_1.SettingsRoutes);
exports.default = app;
