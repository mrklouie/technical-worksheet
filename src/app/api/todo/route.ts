import { auth } from "@/auth";

export const GET = async (req: Request) => {
  const session = await auth();

  return Response.json({ session });
};
