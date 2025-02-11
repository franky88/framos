import { WebhookEvent } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { User } from "@/models/Schema";

export async function POST(req: Request) {
  try {
    const payload: WebhookEvent = await req.json();

    if (payload.type === "user.created") {
      await connectDB();

      const { id, first_name, last_name, email_addresses } = payload.data;

      // Save user to MongoDB
      await User.create({
        clerkId: id,
        name: `${first_name} ${last_name}`,
        email: email_addresses[0].email_address,
      });

      console.log("User added to MongoDB:", id);
    }

    return NextResponse.json({ message: "User processed" }, { status: 200 });
  } catch (error) {
    console.error("Error saving user:", error);
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
}
