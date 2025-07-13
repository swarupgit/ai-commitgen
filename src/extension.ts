import * as vscode from 'vscode';
import { getGitDiff } from './gitUtils';
import { generateCommitMessage } from './aiService';

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand('ai-commitgen.generateMessage', async () => {
    vscode.window.withProgress({
      location: vscode.ProgressLocation.Notification,
      title: "Generating commit message...",
      cancellable: false
    }, async () => {
      try {
        const diff = await getGitDiff();
        if (!diff) {
          vscode.window.showWarningMessage('No staged changes found.');
          return;
        }

        const message = await generateCommitMessage(diff);
        vscode.window.showInformationMessage('AI Commit Message: ' + message);

        // Copy to clipboard or pre-fill Git input
        await vscode.env.clipboard.writeText(message);
        vscode.window.showInformationMessage('Commit message copied to clipboard.');
      } catch (err: any) {
        vscode.window.showErrorMessage(err.message || String(err));
      }
    });
  });

  context.subscriptions.push(disposable);
}
