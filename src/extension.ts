import * as vscode from 'vscode';
import TOKENS from '@kong/design-tokens/tokens/js/tokens.json'

import { PROPERTY_TOKEN_MAP } from './token-map'

function serializeTokens() {
  const tokens = []
  for (const k in TOKENS) {
    const value = TOKENS[k as keyof typeof TOKENS]
    tokens.push(`$${k.replaceAll('_', '-')}: ${value}`)
  }
  return tokens
}

function prefixMatch(valuePrefixes: string[], prefix: string): string[] {
	const p = prefix.toLocaleLowerCase()
	return valuePrefixes.filter(valuePrefix => {
		return valuePrefix.startsWith(p)
	})
}

export function activate(context: vscode.ExtensionContext) {

	const tokens = serializeTokens()

	const provider1 = vscode.languages.registerCompletionItemProvider({
		language: 'vue',
		scheme: 'file',
	}, {
		provideCompletionItems(document, position, token, context) {
			const text = document.getText();
			const styleStart = text.indexOf('<style');
			const styleEnd = text.indexOf('</style>');
			const offset = document.offsetAt(position);

			if ((styleStart === -1 || styleEnd === -1) || (offset < styleStart || offset > styleEnd)) {
				return [];
			}

			const line = document.lineAt(position).text;
			const cssPropertyMatch = line.match(/([a-zA-Z-]+):\s*([^;]*)/);

			let cssProperty = ''

			if (cssPropertyMatch) {
				cssProperty = cssPropertyMatch[1];
			}

			if (!PROPERTY_TOKEN_MAP[cssProperty]) {
				return []
			}

			const availableTokens = PROPERTY_TOKEN_MAP[cssProperty]

			const matchedTokens = availableTokens.flatMap(prefix => {
				return prefixMatch(tokens, `$kui-${prefix}`)
			})

			return matchedTokens. map(token => {
				const [key] = token.split(':')
				const item = new vscode.CompletionItem(token, vscode.CompletionItemKind.Value)
				item.insertText = key
				return item
			})
		}
	}, ' ', ':', '$');

	context.subscriptions.push(provider1);
}


