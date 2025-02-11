"use server";

import { auth } from "@clerk/nextjs/server";
import { connectDB } from "@/lib/db";
import { User, Skill } from "@/models/Schema";

// Fetch users from MongoDB
export async function fetchUsers() {
  await connectDB();
  return await User.find({});
}

// Add a new user to MongoDB with Clerk userId
export async function addUser(formData: FormData) {
  await connectDB();
  
  // Get Clerk User ID
  const { userId } = await auth();
  if (!userId) {
    throw new Error("User not authenticated");
  }

  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  
  // Save user with Clerk userId
  const newUser = new User({ name, email, clerkId: userId });
  await newUser.save();
}

export async function addSkill(formData: FormData) {
    await connectDB();
  
    // Get Clerk User ID
    const { userId: clerkId } = await auth();
    if (!clerkId) {
      throw new Error("User not authenticated");
    }
  
    // Find the user by Clerk ID
    const user = await User.findOne({ clerkId });
    if (!user) {
      throw new Error("User not found in database");
    }
  
    // Get skill details from form
    const name = formData.get("name") as string;
    const application = formData.get("application") as string;
  
    // Save new skill linked to user
    const newSkill = new Skill({ userId: user._id, name, application });
    await newSkill.save();
  }

  export async function fetchUserWithSkills() {
    await connectDB();
  
    const { userId: clerkId } = await auth();
    if (!clerkId) {
      throw new Error("User not authenticated");
    }
  
    // Find user and populate their skills
    return await User.findOne({ clerkId }).populate("skills");
  }