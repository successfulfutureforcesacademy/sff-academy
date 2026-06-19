// ============================================================
// FILE: js/config.js
// PURPOSE: Supabase connection + test settings
// CHANGE HERE to update DB or test schedule — nothing else
// ============================================================

const SUPABASE_URL = "https://omabmywlqxgelafokdna.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9tYWJteXdscXhnZWxhZm9rZG5hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE3NjM0MDYsImV4cCI6MjA5NzMzOTQwNn0.9JlCl6F88q5hxQjNde5UtGQnL8-ypACqAxcxgg7f1dg";

// ── Test Schedule ────────────────────────────────────────────
// Set the exact time the test ends (24-hour format)
// Example: 17 = 5 PM, 14 = 2 PM, 9 = 9 AM
const TEST_END_TIME = {
  hour: 17,      // 5 PM  ← CHANGE THIS to your test end hour
  minute: 30,    // :30   ← CHANGE THIS to your test end minute
};

// ── Supabase Client ──────────────────────────────────────────
const supabase = window.supabase.createClient("https://omabmywlqxgelafokdna.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9tYWJteXdscXhnZWxhZm9rZG5hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE3NjM0MDYsImV4cCI6MjA5NzMzOTQwNn0.9JlCl6F88q5hxQjNde5UtGQnL8-ypACqAxcxgg7f1dg");
