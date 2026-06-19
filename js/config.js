// ============================================================
// FILE: js/config.js
// PURPOSE: Supabase connection settings + test schedule
// ============================================================

const SUPABASE_URL     = "https://omabmywlqxgelafokdna.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9tYWJteXdscXhnZWxhZm9rZG5hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE3NjM0MDYsImV4cCI6MjA5NzMzOTQwNn0.9JlCl6F88q5hxQjNde5UtGQnL8-ypACqAxcxgg7f1dg";

// ── Test end time (24-hour format) ───────────────────────────
// 17 = 5 PM,  14 = 2 PM,  9 = 9 AM
const TEST_END_TIME = {
  hour:   17,   // ← CHANGE to your test end hour
  minute: 30,   // ← CHANGE to your test end minute
};

// NOTE: supabase client is created in each HTML page AFTER
// the CDN script loads. Do NOT create it here.
