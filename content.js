const sentences = [
  "CEO dreaming about your resume.",
  "CEO just liked your selfie.",
  "HR already made a PowerPoint about you.",
  "Company paused hiring until you apply.",
  "You are always the best option",
  "You are always chosen",
];

window.addEventListener('load', () => {
  function hideApplicantCount() {
    const randomSentence = sentences[Math.floor(Math.random() * sentences.length)];
    const elements = document.querySelectorAll('.tvm__text.tvm__text--low-emphasis');
    elements.forEach(element => {
      const text = element.textContent.trim();
      // Extract numbers from text (e.g., "Over 100 applicants")
      const match = text.match(/(\d+)/);
      if (match) {
        const count = parseInt(match[1], 10);
        if (count > 10) {
          element.textContent = randomSentence;
        }
      }
    });
  }

  hideApplicantCount();
  setTimeout(hideApplicantCount, 2000);
  const observer = new MutationObserver(hideApplicantCount);
  observer.observe(document.body, { childList: true, subtree: true });
});
