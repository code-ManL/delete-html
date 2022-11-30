import * as vscode from 'vscode';
import { getDeleteHTMLNode } from './handlers';


export function activate(context: vscode.ExtensionContext) {
  vscode.commands.registerCommand('delete-html.helloWorld', () => {
    vscode.window.showInformationMessage('heihedaihei!');
  });

  const editor = vscode.window.activeTextEditor;

  if (!editor) {
    return;
  }

  const code = editor.document.getText();

  // 获取光标具体位置
  const line = editor.selection.active.line + 1;

  // 获取html标签的具体位置
  const domNode = getDeleteHTMLNode(code, line);

  if (!domNode) {
    return;
  }

  editor?.edit((editBuilder) => {
    editBuilder.delete(
      new vscode.Range(
        new vscode.Position(domNode.start.line - 1, domNode.start.column),
        new vscode.Position(domNode.end.line - 1, domNode.end.column))
    );
  });
}