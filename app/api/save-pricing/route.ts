export const dynamic = 'force-dynamic';
import { createClient } from "@supabase/supabase-js";

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export async function POST(req: Request) {
  try {
    const { scenario_name, inputs, revenue } = await req.json();

    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("pricing_scenarios")
      .insert({ scenario_name, inputs, revenue })
      .select()
      .single();

    if (error) throw error;
    return Response.json(data);
  } catch (err) {
    console.error("save-pricing POST error:", err);
    return Response.json({ error: "Failed to save" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("pricing_scenarios")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(3);

    if (error) throw error;
    return Response.json(data ?? []);
  } catch (err) {
    console.error("save-pricing GET error:", err);
    return Response.json({ error: "Failed to load saved scenarios" }, { status: 500 });
  }
}
