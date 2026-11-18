// "140+": exam count for marketing copy, rounded down so it stays true as exams are added.
import { TRACK_LIST } from "./tracks";

export const examCountLabel = () => `${Math.floor(TRACK_LIST.length / 10) * 10}+`;
