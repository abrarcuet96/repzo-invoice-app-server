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
exports.UserControllers = void 0;
// import { AdminModel } from '../../admin/admin.model';
// import { AdminServices } from '../../admin/admin.service';
// import AdminValidationSchema from '../../admin/admin.validation';
const user_service_1 = require("./user.service");
const user_validation_1 = __importDefault(require("./user.validation"));
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = req.body;
        const zodUserParsedData = user_validation_1.default.parse(userData);
        const result = yield user_service_1.UserServices.createUserIntoDB(zodUserParsedData);
        userData.userId = result._id.toString();
        // await AdminModel.insertUserToAdminData(adminId, userData);
        res.status(200).json({
            success: true,
            message: 'User is created successfully',
            data: result,
        });
        // } else if (userData.role === 'admin') {
        //   // data validation using zod:
        //   const zodParsedAdminData = AdminValidationSchema.parse(userData);
        //   const result = await AdminServices.createAdminIntoDB(zodParsedAdminData);
        //   res.status(200).json({
        //     success: true,
        //     message: 'Admin is created successfully',
        //     data: result,
        //   });
        // }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || 'Something went wrong',
            error: err,
        });
    }
});
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_service_1.UserServices.getUserFromDB();
        res.status(200).json({
            success: true,
            message: 'Users are retrieved successfully',
            data: result,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || 'Something went wrong',
            error: err,
        });
    }
});
const getSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.params.email;
        const result = yield user_service_1.UserServices.getSingleUserFromDB(email);
        res.status(200).json({
            success: true,
            message: 'User is retrieved successfully',
            data: result,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || 'Something went wrong',
            error: err,
        });
    }
});
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const body = req.body;
        const result = yield user_service_1.UserServices.updateUser(userId, body);
        res.status(200).json({
            success: true,
            message: 'User is updated successfully',
            data: result,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || 'Something went wrong',
            error: err,
        });
    }
});
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const result = yield user_service_1.UserServices.deleteUser(userId);
        res.status(200).json({
            success: true,
            message: 'User is deleted successfully',
            data: result,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || 'Something went wrong',
            error: err,
        });
    }
});
exports.UserControllers = {
    createUser,
    getUsers,
    getSingleUser,
    updateUser,
    deleteUser,
};
