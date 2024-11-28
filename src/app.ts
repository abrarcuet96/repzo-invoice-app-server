import cors from 'cors';
import express, { Application } from 'express';
import { CustomerRoutes } from './app/modules/user/customer/customer.route';
import { ExpenseRoutes } from './app/modules/user/expense/expense.route';
import { InvoiceRoutes } from './app/modules/user/invoice/invoice.route';
import { InvoiceItemRoutes } from './app/modules/user/invoiceItem/invoiceItem.route';
import { ItemRoutes } from './app/modules/user/item/item.route';
import { NotificationRoutes } from './app/modules/user/notification/notification.route';
import { PaymentRoutes } from './app/modules/user/payment/payment.route';
import { ProfileRoutes } from './app/modules/user/profile/profile.route';
import { SettingsRoutes } from './app/modules/user/settings/settings.route';
import { UserRoutes } from './app/modules/user/user-modules/user.route';

const app: Application = express();
app.use(express.json());
app.use(cors());

// Routes:
app.use('/api/users', UserRoutes);
app.use('/api/users/customer', CustomerRoutes);
app.use('/api/users/expense', ExpenseRoutes);
app.use('/api/users/invoice', InvoiceRoutes);
app.use('/api/users/invoiceItem', InvoiceItemRoutes);
app.use('/api/users/item', ItemRoutes);
app.use('/api/users/notification', NotificationRoutes);
app.use('/api/users/payment', PaymentRoutes);
app.use('/api/users/profile', ProfileRoutes);
app.use('/api/users/settings', SettingsRoutes);
export default app;
