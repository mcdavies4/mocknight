// What new users see: the bot's profile text (before tapping Start) and the welcome message (after).
import { FREE_DAILY_QUESTIONS, PREMIUM_DAILY_QUESTIONS, TRIAL_DAYS } from "./pricing";
import { TRACK_LIST } from "./tracks";

const EXAMS = TRACK_LIST.length;

/** "What can this bot do?" — shown in the empty chat before Start (max 512 chars). */
export const BOT_DESCRIPTION =
  `Practise for ${EXAMS} exams in one place: JAMB, WAEC, NECO, BECE, KCSE, NEET, JEE, UCAT, IELTS, OET, PLAB, NMC, NCLEX, ` +
  `citizenship tests, ACCA, PMP and more.\n\n📅 Daily questions\n⏱️ Timed CBT tests\n💡 Explanations for every answer\n🤖 AI tutor\n\n` +
  `${TRIAL_DAYS ? `Everything free for ${TRIAL_DAYS} days. ` : ""}Tap Start 👇`;

/** Shown on the bot's profile and in shared links (max 120 chars). */
export const BOT_SHORT_DESCRIPTION = `Exam practice for ${EXAMS} exams: daily questions, timed CBT tests, explanations and an AI tutor.`;

/** First message after /start for someone new. Markdown (v1). */
export function welcomeText() {
  return [
    "🌿 *Welcome to Mock Night*",
    "_Prepare smarter. Perform better._",
    "",
    `Exam practice for ${EXAMS} exams in one place: school and university entry, moving abroad, professional certifications and UK workplace tests.`,
    "",
    "*How it works*",
    "📅 A few questions arrive every day, at the time you choose",
    "⏱️ Timed CBT tests that feel like the real exam",
    "💡 Every answer comes with an explanation",
    "🔁 Questions you miss come back until you get them right",
    "🤖 Stuck? /explain gets the AI tutor to walk you through it",
    "📈 Track your progress with /stats",
    "⚔️ Challenge friends to quiz battles in group chats",
    "",
    "*What's free*",
    TRIAL_DAYS ? `🎁 Everything is unlocked for your first ${TRIAL_DAYS} days.` : "",
    `After that you keep ${FREE_DAILY_QUESTIONS} free questions a day. Premium gives you ${PREMIUM_DAILY_QUESTIONS} a day, unlimited timed tests and more AI help, priced for your country and payable by card, bank transfer or Telegram Stars.`,
    "",
    "Let's set you up. It takes 30 seconds 👇",
  ].filter((l, i, a) => l !== "" || a[i - 1] !== "").join("\n");
}
