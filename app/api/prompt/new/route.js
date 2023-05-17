import { connectToDB } from "../../../../utils/database"
import Prompt from "../../../../models/prompt";

//Instead of we used to create express server create route for that and then check the request.body , here we directly create route here in api folder and making use here

//main Advantage of this is we only make connection to the database and front end when this request is gonna send.

//conncetDB function is the function who only called whenever the we want end make the connection with database

export const POST = async (req, res) => {
  const { userId, prompt, tag } = await req.json();
  try {
    await connectToDB();

    //create new prompt
    const newPrompt = new Prompt({ creator: userId, prompt, tag });

    await newPrompt.save();

    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    // console.log(error);
    return new Response("failed to create prompt", { status: 500 });
  }
};
