console.log("✅ HideApplicants running:", location.href);

const sentences = [
  "CEO dreaming about your resume.",
  "CEO just liked your selfie.",
  "HR already made a PowerPoint about you.",
  "Company paused hiring until you apply.",
  "You are always the best option",
  "You are always chosen",
  "Recruiter refreshed the page waiting for you.",
  "The hiring manager bookmarked your profile.",
  "They’re practicing your name for onboarding.",
  "Your offer letter is already drafted.",
  "They paused interviews hoping you apply.",
  "HR said 'let’s just wait for this legend.'",
  "Your resume is trending internally.",
  "They built the team around you.",
  "The CEO whispered: 'That’s the one.'",
  "Payroll is preparing your direct deposit.",
  "They skipped 200 applicants for you.",
  "Your LinkedIn profile caused a meeting.",
  "They extended the deadline for you.",
  "Your name came up in the strategy call.",
  "They’re saving a desk with your name.",
  "The recruiter smiled at your experience.",
  "Your GitHub scared the competition.",
  "They said 'finally, a real engineer.'",
  "Your resume triggered a celebration.",
  "They already imagined you in the team photo.",
  "Interview questions are being simplified for you.",
  "They’re negotiating your salary in advance.",
  "The team Slack is ready for you.",
  "They stopped searching after seeing you.",
  "You are the final boss applicant.",
];

function getRandomSentence() {
  return sentences[Math.floor(Math.random() * sentences.length)];
}

function shouldReplace(raw) {
  const t = (raw || "").trim();
  if (!t) return false;

  const s = t.replace(/\s+/g, " ");

  return (
    /\b\d+\s+applicants?\b/i.test(s) ||
    /\bover\s+\d+\s+applicants?\b/i.test(s) ||
    /\b(over\s+)?\d+\s+people\s+clicked\s+apply\b/i.test(s) ||
    /\b(over\s+)?\d+\s+people\s+applied\b/i.test(s) ||
    /\bbe an early applicant\b/i.test(s) ||
    /\b(?:over\s+)?\d+\s+people\s+clicked\s+apply\b/i.test(s) || 
    /\b(?:over\s+)?\d+\s+people\s+applied\b/i.test(s) ||
    /\b\d+\s+applicants?\b/i.test(s) ||
    /\bover\s+\d+\s+applicants?\b/i.test(s) ||
    /\b\d+\s+applicants?\s+in\s+the\s+past\s+(day|week|month)\b/i.test(s)
  );
}

function applyOnce() {
  const spans = document.getElementsByTagName("span");
  for (const el of spans) {
    if (el.dataset.hideApplicants === "1") continue;
    const raw = (el.textContent || "").trim();
    if (!shouldReplace(raw)) continue;
    if (raw.length > 120) continue;
    el.textContent = getRandomSentence();
    el.dataset.hideApplicants = "1";
  }
}

let queued = false;
function scheduleApply() {
  if (queued) return;
  queued = true;

  requestAnimationFrame(() => {
    queued = false;
    try {
      applyOnce();
    } catch (e) {
      console.log("HideApplicants error:", e);
    }
  });
}

scheduleApply();
setTimeout(scheduleApply, 500);
setTimeout(scheduleApply, 1500);
setTimeout(scheduleApply, 3000);

new MutationObserver(scheduleApply).observe(document.documentElement, {
  childList: true,
  subtree: true,
});

let lastUrl = location.href;
setInterval(() => {
  if (location.href !== lastUrl) {
    lastUrl = location.href;
    scheduleApply();
    setTimeout(scheduleApply, 1200);
  }
}, 400);