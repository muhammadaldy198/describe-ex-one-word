// Describe Your Ex in One Word — one-word verdict entry.
// The single-word entry is "Blacklisted": the ex is not merely dumped,
// they are banned — put on the list no one ever gets off.
// A verb-form verdict, not an adjective insult: the word itself is the
// ruling and the action at once, the way cancelling a subscription is.
// The field has already converged on that one administrative verb almost
// two hundred times over, so this entry escalates the same template one
// step further: cancelled is temporary, blacklisted is forever.
// Eleven letters, one word, nothing else attached.
import { chmodSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";

const WORD = "Blacklisted";

function countCodePoints(text: string): number {
  return [...text].length;
}

function isOneCleanWord(text: string): boolean {
  // Gate: entry.txt UTF-8, 1 to 111 characters, exactly one word.
  // No spaces, no padding, no punctuation tricks, no control characters:
  // the verdict must arrive with the word itself, without a caption.
  const length = countCodePoints(text);
  if (length < 1 || length > 111) return false;
  if (text.trim().length === 0) return false;
  if (/[\s\u0000-\u001f\u007f]/.test(text)) return false;
  if (/[^A-Za-z]/.test(text)) return false;
  return true;
}

if (!isOneCleanWord(WORD)) {
  throw new Error(`word fails the gate: ${JSON.stringify(WORD)}`);
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", WORD, "utf8");
chmodSync("/output/entry.txt", 0o644);

const back = readFileSync("/output/entry.txt", "utf8");
if (back !== WORD) {
  throw new Error("read-back mismatch: /output/entry.txt does not equal the word");
}

console.log(`Wrote ${countCodePoints(WORD)} chars to /output/entry.txt`);
