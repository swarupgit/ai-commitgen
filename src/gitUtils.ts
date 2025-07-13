import { exec } from 'child_process';
import * as vscode from 'vscode';

export function getGitDiff(): Promise<string> {
  return new Promise((resolve, reject) => {
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (!workspaceFolders || workspaceFolders.length === 0) {
      const msg = "❌ No workspace folder open.";
      vscode.window.showErrorMessage(msg);
      console.error(msg);
      return reject(msg);
    }

    const cwd = workspaceFolders[0].uri.fsPath;
    console.log('📂 [AI CommitGen] Running git diff in:', cwd);

    exec('git diff --cached', { cwd }, (err, stdout, stderr) => {
      if (err) {
        const fullError = `❌ Git diff failed:\n${err.message}\n${stderr}`;
        console.error(fullError);
        vscode.window.showErrorMessage(fullError);
        return reject(fullError);
      }

      if (!stdout.trim()) {
        const msg = "⚠️ No staged changes found.";
        console.warn(msg);
        vscode.window.showWarningMessage(msg);
        return reject(msg);
      }

      console.log('✅ Git diff output (truncated):', stdout.slice(0, 300));
      resolve(stdout);
    });
  });
}
