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
Object.defineProperty(exports, "__esModule", { value: true });
const userServices = require('../services/userServices');
exports.registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield userServices.register(req, res);
    }
    catch (err) {
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield userServices.login(req, res);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.findUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield userServices.findUser(req, res);
    }
    catch (err) {
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield userServices.getAllUsers(req, res);
    }
    catch (err) {
        res.status(500).json({ message: "Internal server error" });
    }
});
