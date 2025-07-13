import * as vscode from 'vscode';
import fetch from 'node-fetch';

export async function generateCommitMessage(diff: string): Promise<string> {
  const config = vscode.workspace.getConfiguration('aiCommitgen');
  const apiKey = config.get<string>('openrouterApiKey');
  const model = config.get<string>('model') || "meta-llama/llama-3-8b-instruct"; //"openai/gpt-3.5-turbo"; // || "meta-llama/llama-3-8b-instruct" || "mistralai/mixtral-8x7b-instruct" || "anthropic/claude-3-haiku";

  if (!apiKey) {
    throw new Error('❌ OpenAI API key is missing. Set it in VS Code settings (aiCommitgen.openrouterApiKey).');
  }

  const prompt = `Summarize the following git diff into a meaningful commit message within 100 character:\n\n${diff}`;

  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://github.com/swarupgit/ai-commitgen", // optional for tracking
      "X-Title": "ai-commitgen" // optional
    },
    body: JSON.stringify({
      model,
      messages: [
        {
          role: "system",
          content: "You are an expert developer that writes concise and meaningful git commit messages based on code diffs."
        },
        {
          role: "user",
          content: prompt
        }
      ]
    })
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(`❌ OpenAI API error: ${res.status} ${error.error?.message || 'Unknown error'}`);
  }

  const data = await res.json();
  return data.choices?.[0]?.message?.content.trim() || 'No suggestion';
}
