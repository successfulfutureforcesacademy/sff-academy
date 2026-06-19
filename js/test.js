// ============================================================
// FILE: js/test.js
// PURPOSE: All test logic — loading Qs, saving answers,
//          timer, anti-cheat, submission — no UI code here
// ============================================================

const Test = (() => {

  let questions     = [];
  let currentIndex  = 0;
  let answers       = {};
  let timerInterval = null;
  let onTimerTick   = null;
  let onTimeUp      = null;

  async function loadQuestions() {
    const { data, error } = await supabase
      .from("questions")
      .select("*")
      .order("id", { ascending: true });

    if (error) throw error;
    questions = data;

    const saved = sessionStorage.getItem("sff_answers");
    if (saved) answers = JSON.parse(saved);

    return questions;
  }

  function getQuestion(index) { return questions[index] || null; }
  function getTotal()         { return questions.length; }
  function getCurrent()       { return currentIndex; }

  function goTo(index) {
    if (index >= 0 && index < questions.length) currentIndex = index;
  }
  function next()     { goTo(currentIndex + 1); }
  function previous() { goTo(currentIndex - 1); }

  function saveAnswer(questionId, selectedOption) {
    answers[questionId] = selectedOption;
    sessionStorage.setItem("sff_answers", JSON.stringify(answers));
  }

  function getAnswer(questionId) { return answers[questionId] ?? null; }
  function getAnsweredCount()    { return Object.keys(answers).length; }

  function startTimer(tickCallback, timeUpCallback) {
    onTimerTick = tickCallback;
    onTimeUp    = timeUpCallback;

    timerInterval = setInterval(() => {
      const now = new Date();
      const end = new Date();
      end.setHours(TEST_END_TIME.hour, TEST_END_TIME.minute, 0, 0);

      const remaining = end - now;

      if (remaining <= 0) {
        clearInterval(timerInterval);
        if (onTimeUp) onTimeUp();
        return;
      }

      const h = Math.floor(remaining / 3600000);
      const m = Math.floor((remaining % 3600000) / 60000);
      const s = Math.floor((remaining % 60000) / 1000);
      if (onTimerTick) onTimerTick({ h, m, s, remaining });
    }, 1000);
  }

  function stopTimer() { clearInterval(timerInterval); }

  function enableAntiCheat(warningCallback) {
    document.addEventListener("visibilitychange", () => {
      if (document.hidden && warningCallback) warningCallback("tab_switch");
    });
    window.addEventListener("blur", () => {
      if (warningCallback) warningCallback("window_blur");
    });
    document.addEventListener("contextmenu", e => e.preventDefault());
    document.addEventListener("copy",  e => e.preventDefault());
    document.addEventListener("cut",   e => e.preventDefault());
    document.addEventListener("paste", e => e.preventDefault());
    document.addEventListener("keydown", e => {
      if (
        (e.ctrlKey && ["c","v","u","s","a","p"].includes(e.key.toLowerCase())) ||
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && ["i","j","c"].includes(e.key.toLowerCase()))
      ) {
        e.preventDefault();
        if (warningCallback) warningCallback("shortcut");
      }
    });
    document.documentElement.requestFullscreen?.().catch(() => {});
    document.addEventListener("fullscreenchange", () => {
      if (!document.fullscreenElement && warningCallback) warningCallback("fullscreen_exit");
    });
  }

  async function submitTest(student) {
    if (sessionStorage.getItem("sff_submitted") === "true") return { alreadySubmitted: true };

    let score = 0;
    questions.forEach(q => {
      if (answers[q.id] === q.correct_answer) score++;
    });

    const payload = {
      student_id:   student.id,
      student_name: student.name,
      phone:        student.phone,
      score,
      total:        questions.length,
      answers:      JSON.stringify(answers),
      submitted_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from("results")
      .upsert(payload, { onConflict: "student_id" })
      .select()
      .single();

    if (error) throw error;
    sessionStorage.setItem("sff_submitted", "true");
    return { alreadySubmitted: false, result: data, score, total: questions.length };
  }

  return {
    loadQuestions, getQuestion, getTotal, getCurrent,
    goTo, next, previous,
    saveAnswer, getAnswer, getAnsweredCount,
    startTimer, stopTimer,
    enableAntiCheat, submitTest,
  };
})();
