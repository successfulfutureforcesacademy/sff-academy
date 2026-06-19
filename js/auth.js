// ============================================================
// FILE: js/auth.js
// PURPOSE: All login / session logic — no UI code here
// ============================================================

const Auth = (() => {

  function saveSession(student) {
    sessionStorage.setItem("sff_student", JSON.stringify(student));
  }

  function getSession() {
    const raw = sessionStorage.getItem("sff_student");
    return raw ? JSON.parse(raw) : null;
  }

  function clearSession() {
    sessionStorage.removeItem("sff_student");
    sessionStorage.removeItem("sff_answers");
    sessionStorage.removeItem("sff_submitted");
  }

  async function verifyStudent(name, phone) {
    const cleanPhone = phone.replace(/\s+/g, "").trim();
    const cleanName  = name.trim();

    const { data, error } = await supabase
      .from("students")
      .select("*")
      .ilike("name", cleanName)
      .eq("phone", cleanPhone)
      .single();

    if (error || !data) return { success: false };
    return { success: true, student: data };
  }

  function requireAuth() {
    if (!getSession()) {
      window.location.href = "../index.html";
    }
  }

  return { saveSession, getSession, clearSession, verifyStudent, requireAuth };
})();
