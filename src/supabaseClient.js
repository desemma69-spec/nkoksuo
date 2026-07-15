import { createClient } from "@supabase/supabase-js";

// You can replace these credentials later if you switch databases
const SUPABASE_URL = "https://hmhbszjbyvopyxngjuzs.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhtaGJzempieXZvcHl4bmdqdXpzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQxMjQwNjAsImV4cCI6MjA5OTcwMDA2MH0.UCNfvrmJATkRH-CQen3QHKC89P-Y6_0nUN4lXMfTp_w";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
