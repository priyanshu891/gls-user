import { Document } from "mongoose";

export interface IUser extends Document {
    id?: any
    firstName?: string
    lastName?: string
    password?: string
    email?: string
    accesstoken?: string
    role?: number
}