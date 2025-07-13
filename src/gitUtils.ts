import { exec } from "child_process";

export function getGitDiff(): Promise<string> {
  return new Promise((resolve, reject) => {
    exec("git diff --cached", { cwd: process.cwd() }, (err, stdout) => {
      if (err) {
        reject("Failed to get git diff");
      } else {
        resolve(stdout);
      }
    });
  });
}
