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

function hideApplicantCount() {
  const nodes = document.querySelectorAll("span, div, p, a");

  nodes.forEach((el) => {
    const text = (el.textContent || "").trim();
    const m = text.match(/\b(\d+)\s+applicants?\b/i);
    if (!m) return;
    const count = parseInt(m[1], 10);
    if (Number.isFinite(count) && count > 10) {
      el.textContent = getRandomSentence();
    }
  });
}

// URL changes without reload
let lastUrl = location.href;
function tick() {
  if (location.href !== lastUrl) {
    lastUrl = location.href;
    setTimeout(hideApplicantCount, 300);
    setTimeout(hideApplicantCount, 1500);
  }
}

(function start() {
  hideApplicantCount();
  setTimeout(hideApplicantCount, 1500);
  const observer = new MutationObserver(() => hideApplicantCount());
  observer.observe(document.documentElement, { childList: true, subtree: true });
  setInterval(tick, 500);
})();