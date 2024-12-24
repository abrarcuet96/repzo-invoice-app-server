"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const mongoose_1 = require("mongoose");
const config_1 = __importDefault(require("../../../config"));
const objectFlattening_1 = __importDefault(require("../../../config/objectFlattening"));
const customer_model_1 = __importDefault(require("../customer/customer.model"));
const expense_model_1 = __importDefault(require("../expense/expense.model"));
const invoice_model_1 = __importDefault(require("../invoice/invoice.model"));
const item_model_1 = __importDefault(require("../item/item.model"));
const notification_model_1 = __importDefault(require("../notification/notification.model"));
const profile_model_1 = __importDefault(require("../profile/profile.model"));
const quotes_model_1 = __importDefault(require("../quotes/quotes.model"));
const settings_model_1 = __importDefault(require("../settings/settings.model"));
const UserSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    password: { type: String, required: false },
    profileImage: { type: String, required: true },
    role: {
        type: String,
        required: true,
        enum: ['user', 'customer'],
    },
    profile: { type: profile_model_1.default, required: false },
    customers: { type: [customer_model_1.default], required: false },
    items: { type: [item_model_1.default], required: false },
    invoices: { type: [invoice_model_1.default], required: false },
    quotes: { type: [quotes_model_1.default], required: false },
    expenses: { type: [expense_model_1.default], required: false },
    notifications: { type: [notification_model_1.default], required: false },
    settings: { type: settings_model_1.default, required: false },
    template: {
        type: String,
        required: false,
        enum: ['standard', 'continental', 'compact'],
        default: 'standard',
    },
}, {
    timestamps: true,
    toJSON: {
        transform: (doc, ret) => {
            const createdAt = (0, moment_timezone_1.default)(ret.createdAt).tz('Asia/Dhaka');
            const updatedAt = (0, moment_timezone_1.default)(ret.updatedAt).tz('Asia/Dhaka');
            ret.createdAt = createdAt.format('MM/DD/YYYY, hh:mm A');
            ret.updatedAt = updatedAt.format('MM/DD/YYYY, hh:mm A');
            return ret;
        },
    },
    toObject: {
        transform: (doc, ret) => {
            const createdAt = (0, moment_timezone_1.default)(ret.createdAt).tz('Asia/Dhaka');
            const updatedAt = (0, moment_timezone_1.default)(ret.updatedAt).tz('Asia/Dhaka');
            ret.createdAt = createdAt.format('MM/DD/YYYY, hh:mm A');
            ret.updatedAt = updatedAt.format('MM/DD/YYYY, hh:mm A');
            return ret;
        },
    },
});
UserSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        // console.log(this, 'pre hook: we will save the data');
        const user = this; // doc
        // hashing password and save into DB
        if (user.password) {
            user.password = yield bcrypt_1.default.hash(user.password, Number(config_1.default.bcrypt_salt_rounds));
        }
        next();
    });
});
UserSchema.post('save', function (doc, next) {
    doc.password = '';
    next();
});
// insert into user when data is created:
UserSchema.statics.insertProfileToUserData = function (userId, profileData) {
    return __awaiter(this, void 0, void 0, function* () {
        yield this.findByIdAndUpdate({ _id: userId }, {
            $set: { profile: profileData },
        });
    });
};
UserSchema.statics.insertCustomerToUserData = function (userId, customerData) {
    return __awaiter(this, void 0, void 0, function* () {
        yield this.findByIdAndUpdate({ _id: userId }, {
            $push: { customers: customerData },
        });
    });
};
UserSchema.statics.insertItemToUserData = function (userId, itemData) {
    return __awaiter(this, void 0, void 0, function* () {
        yield this.findByIdAndUpdate({ _id: userId }, {
            $push: { items: itemData },
        });
    });
};
UserSchema.statics.insertExpenseToUserData = function (userId, expenseData) {
    return __awaiter(this, void 0, void 0, function* () {
        yield this.findByIdAndUpdate({ _id: userId }, {
            $push: { expenses: expenseData },
        });
    });
};
UserSchema.statics.insertInvoiceToUserData = function (userId, invoiceData) {
    return __awaiter(this, void 0, void 0, function* () {
        yield this.findByIdAndUpdate({ _id: userId }, {
            $push: { invoices: invoiceData },
        });
    });
};
UserSchema.statics.insertQuoteToUserData = function (userId, quoteData) {
    return __awaiter(this, void 0, void 0, function* () {
        yield this.findOneAndUpdate({ _id: userId }, {
            $push: { quotes: quoteData },
        });
    });
};
// update user data when data is updated:
UserSchema.statics.updateUserProfileWhenProfileIsUpdated = function (userId, body) {
    return __awaiter(this, void 0, void 0, function* () {
        const userUpdateData = (0, objectFlattening_1.default)(body, 'profile');
        yield this.findOneAndUpdate({ _id: userId }, { $set: userUpdateData });
    });
};
UserSchema.statics.updateUserCustomerWhenCustomerIsUpdated = function (userId, customerId, 
// eslint-disable-next-line @typescript-eslint/no-explicit-any
body) {
    return __awaiter(this, void 0, void 0, function* () {
        // Define updateFields as an object with string keys
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const updateFields = {};
        for (const [key, value] of Object.entries(body)) {
            updateFields[`customers.$[customerField].${key}`] = value;
        }
        yield exports.User.updateOne({ _id: userId }, { $set: updateFields }, {
            arrayFilters: [
                { 'customerField.customerId': customerId }, // Match the specific customer by ID
            ],
        });
    });
};
UserSchema.statics.updateUserItemWhenItemIsUpdated = function (userId, itemId, 
// eslint-disable-next-line @typescript-eslint/no-explicit-any
body) {
    return __awaiter(this, void 0, void 0, function* () {
        // Define updateFields as an object with string keys
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const updateFields = {};
        for (const [key, value] of Object.entries(body)) {
            updateFields[`items.$[itemField].${key}`] = value;
        }
        yield exports.User.updateOne({ _id: userId }, { $set: updateFields }, {
            arrayFilters: [
                { 'itemField.itemId': itemId }, // Match the specific item by ID
            ],
        });
    });
};
UserSchema.statics.updateUserExpenseWhenExpenseIsUpdated = function (userId, expenseId, 
// eslint-disable-next-line @typescript-eslint/no-explicit-any
body) {
    return __awaiter(this, void 0, void 0, function* () {
        // Define updateFields as an object with string keys
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const updateFields = {};
        for (const [key, value] of Object.entries(body)) {
            updateFields[`expenses.$[expenseField].${key}`] = value;
        }
        yield exports.User.updateOne({ _id: userId }, { $set: updateFields }, {
            arrayFilters: [
                { 'expenseField.expenseId': expenseId }, // Match the specific item by ID
            ],
        });
    });
};
UserSchema.statics.updateUserInvoiceWhenInvoiceIsUpdated = function (userId, invoiceId, 
// eslint-disable-next-line @typescript-eslint/no-explicit-any
body) {
    return __awaiter(this, void 0, void 0, function* () {
        // Define updateFields as an object with string keys
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const updateFields = {};
        for (const [key, value] of Object.entries(body)) {
            updateFields[`invoices.$[invoiceField].${key}`] = value;
        }
        yield exports.User.updateOne({ _id: userId }, { $set: updateFields }, {
            arrayFilters: [
                { 'invoiceField.invoiceId': invoiceId }, // Match the specific item by ID
            ],
        });
    });
};
UserSchema.statics.updateUserQuoteWhenQuoteIsUpdated = function (userId, quoteId, 
// eslint-disable-next-line @typescript-eslint/no-explicit-any
body) {
    return __awaiter(this, void 0, void 0, function* () {
        // Define updateFields as an object with string keys
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const updateFields = {};
        for (const [key, value] of Object.entries(body)) {
            updateFields[`quotes.$[quoteField].${key}`] = value;
        }
        yield exports.User.updateOne({ _id: userId }, { $set: updateFields }, {
            arrayFilters: [
                { 'quoteField.quoteId': quoteId }, // Match the specific item by ID
            ],
        });
    });
};
// delete data from user when any data is deleted:
UserSchema.statics.deleteUserCustomerWhenCustomerIsDeleted = function (userId, customerId) {
    return __awaiter(this, void 0, void 0, function* () {
        yield exports.User.updateOne({ _id: userId }, {
            $pull: {
                customers: { customerId: customerId },
            },
        });
    });
};
UserSchema.statics.deleteUserItemWhenItemIsDeleted = function (userId, itemId) {
    return __awaiter(this, void 0, void 0, function* () {
        yield exports.User.updateOne({ _id: userId }, {
            $pull: {
                items: { itemId: itemId },
            },
        });
    });
};
UserSchema.statics.deleteUserExpenseWhenExpenseIsDeleted = function (userId, expenseId) {
    return __awaiter(this, void 0, void 0, function* () {
        yield exports.User.updateOne({ _id: userId }, {
            $pull: {
                expenses: { expenseId: expenseId },
            },
        });
    });
};
UserSchema.statics.deleteUserInvoiceWhenInvoiceIsDeleted = function (userId, invoiceId) {
    return __awaiter(this, void 0, void 0, function* () {
        yield exports.User.updateOne({ _id: userId }, {
            $pull: {
                invoices: { invoiceId: invoiceId },
            },
        });
    });
};
UserSchema.statics.deleteUserQuoteWhenQuoteIsDeleted = function (userId, quoteId) {
    return __awaiter(this, void 0, void 0, function* () {
        yield exports.User.updateOne({ _id: userId }, {
            $pull: {
                quotes: { quoteId: quoteId },
            },
        });
    });
};
UserSchema.statics.deleteUserProfileWhenProfileIsDeleted = function (userId) {
    return __awaiter(this, void 0, void 0, function* () {
        yield exports.User.updateOne({ _id: userId }, {
            $unset: { profile: 1 },
            $set: {
                customers: [],
                items: [],
                quotes: [],
                invoices: [],
                expenses: [],
                notifications: [],
            },
        });
    });
};
exports.User = (0, mongoose_1.model)('User', UserSchema);
