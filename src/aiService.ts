import * as vscode from 'vscode';
import fetch from 'node-fetch';

export async function generateCommitMessage(diff: string): Promise<string> {
  const config = vscode.workspace.getConfiguration('aiCommitgen');
  const apiKey = config.get<string>('openaiApiKey');

  if (!apiKey) {
    throw new Error('❌ OpenAI API key is missing. Set it in VS Code settings (aiCommitgen.openaiApiKey).');
  }

  const prompt = `Summarize the following git diff into a meaningful commit message:\n\n${diff}`;

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
    }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(`❌ OpenAI API error: ${res.status} ${error.error?.message || 'Unknown error'}`);
  }

  const data = await res.json();
  return data.choices?.[0]?.message?.content.trim() || 'No suggestion';
}
