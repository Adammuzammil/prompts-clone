import { connectToDB } from "@/utils/db";
import Prompt from "@/models/promptModel";

export const POST = async (req) => {
  //extract the data sent in body
  const { prompt, userId, tag } = await req.json();

  try {
    connectToDB();

    const newPrompt = new Prompt({
      creator: userId,
      prompt,
      tag,
    });

    await newPrompt.save();

    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response("Failed to create a new prompt", { status: 500 });
  }
};
