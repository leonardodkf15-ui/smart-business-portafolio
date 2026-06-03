import { createClient } from "@supabase/supabase-js";

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export async function POST(req: Request) {
  try {
    const { venture, output } = await req.json();
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("research_outputs")
      .insert({ venture, output })
      .select()
      .single();
    if (error) throw error;
    return Response.json(data);
  } catch (err) {
    console.error("save-research POST error:", err);
    return Response.json({ error: "Failed to save" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("research_outputs")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(3);
    if (error) throw error;
    return Response.json(data ?? []);
  } catch (err) {
    console.error("save-research GET error:", err);
    return Response.json({ error: "Failed to load" }, { status: 500 });
  }
}
