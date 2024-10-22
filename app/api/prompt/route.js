import { connectToDB } from "../../../utils/database";
import Prompt from "../../../models/prompt";
// This thing we only import because we get this error : MissingSchemaError: Schema hasn't been registered for model "User".
// The error MissingSchemaError: Schema hasn't been registered for model "User" occurs because Mongoose expects the "User" model to be registered before you attempt to use it in the populate function in your Prompt schema.
import User from "../../../models/user";

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
