import userModel from "../models/user.model.js";

export async function findUser(query) {
    return await userModel.findOne(query);
}

export async function createUser(userData) {
    return await userModel.create(userData);
}