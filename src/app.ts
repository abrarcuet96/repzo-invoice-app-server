import cors from 'cors';
import express, { Application } from 'express';
import { AdminRoutes } from './app/modules/admin/admin.router';
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
app.use('/api/admin', AdminRoutes);
app.use('/api/users', UserRoutes);
app.use('/api/customer', CustomerRoutes);
app.use('/api/expense', ExpenseRoutes);
app.use('/api/invoice', InvoiceRoutes);
app.use('/api/invoiceItem', InvoiceItemRoutes);
app.use('/api/item', ItemRoutes);
app.use('/api/notification', NotificationRoutes);
app.use('/api/payment', PaymentRoutes);
app.use('/api/profile', ProfileRoutes);
app.use('/api/settings', SettingsRoutes);
export default app;
