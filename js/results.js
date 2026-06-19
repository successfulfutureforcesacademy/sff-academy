// ============================================================
// FILE: js/results.js
// PURPOSE: Fetch results from DB, compute rankings — no UI
// ============================================================

const Results = (() => {

  async function getMyResult(studentId) {
    const { data, error } = await supabase
      .from("results")
      .select("*")
      .eq("student_id", studentId)
      .single();

    if (error) return null;
    return data;
  }

  async function getLeaderboard() {
    const { data, error } = await supabase
      .from("results")
      .select("student_name, score, total, submitted_at, phone, student_id")
      .order("score", { ascending: false })
      .order("submitted_at", { ascending: true });

    if (error) throw error;

    let rank = 1;
    return data.map((row, i) => {
      if (i > 0 && row.score < data[i - 1].score) rank = i + 1;
      return { ...row, rank };
    });
  }

  return { getMyResult, getLeaderboard };
})();
