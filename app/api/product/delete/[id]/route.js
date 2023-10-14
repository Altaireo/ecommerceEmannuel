
import Prompt from "@models/product";
import { connectToDB } from "@utils/database";
export const DELETE = async (request, { params }) => {
    console.log(params.id);
    try {
        await connectToDB();
console.log('yep');
        // Find the prompt by ID and remove it
        await Prompt.findByIdAndRemove(params.id);

        return new Response("Prompt deleted successfully", { status: 200 });
    } catch (error) {
        return new Response("Error deleting prompt", { status: 500 });
    }
};