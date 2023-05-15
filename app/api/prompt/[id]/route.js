import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

// this route handle three request together like for delete or edit the specific prompt we have to pass specific id of that prompt

// GET(read) //for get single prompt
export const GET = async (req, { params }) => {
  try {
    await connectToDB();

    const prompt = await Prompt.findById(params.id).populate("creator");

    if (!prompt) {
      return new Response("Sorry can not found!", { status: 404 });
    } else {
      return new Response(JSON.stringify(prompt), { status: 200 });
    }
  } catch (error) {
    return new Response("failed to fetch the post", {
      status: 500,
    });
  }
};

//EDIT(Prompt)
export const PATCH = async (req, { params }) => {
  const { prompt, tag } = await req.json();
  try {
    await connectToDB();
    const existingPrompt = await Prompt.findById(params.id);
    if (!existingPrompt) {
      return new Response("Sorry can not found!", { status: 404 });
    }
    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;

    await existingPrompt.save();

    return new Response("Successfully updated the Prompts", { status: 200 });
  } catch (error) {
    return new Response("failed to update!", { status: 500 });
  }
};

//DELET()Prompt

export const DELETE = async (req, { params }) => {
  try {
    await connectToDB();
    await Prompt.findByIdAndRemove(params.id);
    return new Response("Deleted Successfully!", { status: 200 });
  } catch (error) {
    return new Response("failed to delete the prompt!", { status: 500 });
  }
};
