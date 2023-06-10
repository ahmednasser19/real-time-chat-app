import { authOptions } from "@/lib/auth";
import { addFriendValidator } from "@/lib/validations/add-freind";
import { getServerSession } from "next-auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email: emailToAdd } = addFriendValidator.parse(body.email);

    const RESTResponse = await fetch(
      `${process.env.UPSTASH_REDIS_REST_URL}/get/user:email${emailToAdd}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`,
        },
        cache: "no-store",
      }
    );

    const data = (await RESTResponse.json()) as { result: string | null };

    const idToAdd = data.result;

    const session = await getServerSession(authOptions);

    if (!idToAdd) {
      return new Response("User not found", { status: 400 });
    }

    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    if (idToAdd === session.user.id) {
      return new Response("You can't add yourself", { status: 400 });
    }

    console.log("data", data);
  } catch (error) {}
}
