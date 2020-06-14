import { Prop, Schema, SchemaFactory, } from '@nestjs/mongoose';
import { hashSync } from 'bcrypt';
import { Document } from 'mongoose';


@Schema({ timestamps: true })
export class User extends Document {

    @Prop({ required: true, maxlength: 32, trim: true, type: String })
    firstName: string

    @Prop({ required: true, maxlength: 32, trim: true, type: String })
    lastName: string

    @Prop({ type: String, trim: true, required: true, unique: true })
    email: string

    @Prop({ type: String, required: true, })
    password: string

    @Prop({ type: Number, default: 0 })
    role: number
}

export const userSchema = SchemaFactory.createForClass(User);

userSchema.pre("save", function (next) {
    if (!this.isModified("password")) {
        console.log("skipp");
        return next();
    } else {
        let plaintext = this.get('password');
        console.warn("TODO: Mongo Schema password might produce bug");
        this.set('password', hashSync(plaintext, 10));
        next();
    }
});


userSchema.methods = {
    authenticate: function (plainPassword) {
        return this.securePassword(plainPassword) === this.password;
    },

    securePassword: async function (plainPassword) {
        if (!plainPassword) return '';
        try {
            return await hashSync(this.password, 10);
        } catch (err) {
            return '';
        }
    },
};


// export const userSchema = new mongoose.Schema({
//     firstname: {
//         type: String,
//         required: true,
//         maxlength: 32,
//         trim: true,
//     },
//     lastname: {
//         type: String,
//         maxlength: 32,
//         trim: true,
//     },
//     email: {
//         type: String,
//         trim: true,
//         required: true,
//         unique: true,
//     },
//     userinfo: {
//         type: String,
//         trim: true,
//     },
//     encry_password: {
//         type: String,
//         required: true,
//     },
//     // salt: String,
//     role: {
//         type: Number,
//         default: 0,
//     },
//     purchases: {
//         type: Array,
//         default: [],
//     },
// },
//     {
//         timestamps: true,
//     }
// )

// userSchema
//     .virtual('password')
//     .set(function (password) {
//         this._password = password;
//         // this.salt = uuidv1();
//         this.encry_password = this.securePassword(password);
//     })
//     .get(function () {
//         return this._password;
//     });


// userSchema.methods = {
//     authenticate: function (plainPassword) {
//         return this.securePassword(plainPassword) === this.encry_password;
//     },

//     securePassword: async function (plainPassword) {
//         if (!plainPassword) return '';
//         try {
//             return await hash(this.password, 10);
//         } catch (err) {
//             return '';
//         }
//     },
// };