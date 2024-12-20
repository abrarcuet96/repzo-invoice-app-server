import bodyParser from 'body-parser';
import cors from 'cors';
import express, { Application } from 'express';
import { CustomerRoutes } from './app/modules/user/customer/customer.route';
import { CustomerUserRoutes } from './app/modules/user/customerUser/customerUser.route';
import { ExpenseRoutes } from './app/modules/user/expense/expense.route';
import { InvoiceRoutes } from './app/modules/user/invoice/invoice.route';
import { InvoiceItemRoutes } from './app/modules/user/invoiceItem/invoiceItem.route';
import { ItemRoutes } from './app/modules/user/item/item.route';
import { NotificationRoutes } from './app/modules/user/notification/notification.route';
import { PaymentRoutes } from './app/modules/user/payment/payment.route';
import { ProfileRoutes } from './app/modules/user/profile/profile.route';
import { QuoteRoutes } from './app/modules/user/quotes/quotes.route';
import { SettingsRoutes } from './app/modules/user/settings/settings.route';
import { SSLPaymentRoutes } from './app/modules/user/sslPayment/sslPayment.route';
import { UserRoutes } from './app/modules/user/user-modules/user.route';
const app: Application = express();
app.use(bodyParser.json({ limit: '50mb' }));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

// API Routes:
// Admin Route:
// app.use('/api/admin', AdminRoutes);

// User Routes:
app.use('/api/sslPayment', SSLPaymentRoutes);
app.use('/api/users', UserRoutes);
app.use('/api/users', UserRoutes);
app.use('/api/customerUser', CustomerUserRoutes);
app.use('/api/customer', CustomerRoutes);
app.use('/api/expense', ExpenseRoutes);
app.use('/api/invoice', InvoiceRoutes);
app.use('/api/quote', QuoteRoutes);
app.use('/api/invoiceItem', InvoiceItemRoutes);
app.use('/api/item', ItemRoutes);
app.use('/api/notification', NotificationRoutes);
app.use('/api/payment', PaymentRoutes);
app.use('/api/profile', ProfileRoutes);
app.use('/api/settings', SettingsRoutes);

export default app;
