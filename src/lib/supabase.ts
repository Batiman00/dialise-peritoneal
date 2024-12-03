import { createClient } from "@supabase/supabase-js";

// Substitua pelos seus valores do painel do Supabase
const supabaseUrl = "https://your-project-id.supabase.co";
const supabaseKey = "your-public-api-key";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;