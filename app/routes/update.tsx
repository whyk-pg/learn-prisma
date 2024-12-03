import { type ActionFunctionArgs, redirect } from "@remix-run/cloudflare";
import { hc } from "hono/client";
import type { AppType } from "../../server";

export const action = async ({ request }: ActionFunctionArgs) => {
  const bodyData = await request.formData();
  const client = hc<AppType>("http://localhost:5173");
  console.log({ bodyData, title: bodyData.get("title")?.toString() || "" });

  await client.api.movie[":id"].$patch({
    param: {
      id: "01JBSDNAE2HRRXWTY0M9GHETRX",
    },
    json: {
      title: bodyData.get("title")?.toString() || "",
    },
  });
  return redirect("/");
};
