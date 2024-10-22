import { connectToDB } from "../../../utils/database";
import Prompt from "../../../models/prompt";

export const GET = async (req, res) => {
  try {
    await connectToDB();

    const prompts = await Prompt.find({}).populate("creator");

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    console.log("errrrrrrrrrrr", error);
    return new Response(
      JSON.stringify(error.message || "failed to fetch all the posts"),
      {
        status: 500,
      }
    );
  }
};
