import mongoose, { Schema, Document, Types } from "mongoose";

interface IUser extends Document {
  name: string;
  email: string;
  clerkId: string;
  skills?: Types.ObjectId[];
}

interface ISkill extends Document {
  userId: Types.ObjectId;
  name: string;
  application: string;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    clerkId: { type: String, required: true, unique: true },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

UserSchema.virtual("skills", {
  ref: "Skill",
  localField: "_id",
  foreignField: "userId",
});

const SkillSchema = new Schema<ISkill>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    application: { type: String, required: true },
  },
  { timestamps: true }
);

export const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
export const Skill = mongoose.models.Skill || mongoose.model<ISkill>("Skill", SkillSchema);
