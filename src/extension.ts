'use strict';
import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import {EOL} from 'os';

const fileBase = 'scratchpad';
const fileExtension = '.md'
let fullPath = '';

export function activate(context: vscode.ExtensionContext) {

    let globalCommand = vscode.commands.registerCommand('extension.openGlobalScratchpad', () => {
        fullPath = path.join(context.extensionPath, fileBase + '_global' + fileExtension);
        openFile(fullPath); 
    });
    let localCommand = vscode.commands.registerCommand('extension.openLocalScratchpad', () => {
        const { rootPath } = vscode.workspace;
        fullPath = path.join(rootPath, ".vscode",  fileBase + '_local' + fileExtension);
        openFile(fullPath);
    });

    context.subscriptions.push(localCommand);
    context.subscriptions.push(globalCommand);
}
export function openFile (fullPath: string) {
        if (!fs.existsSync(fullPath)) {
            fs.writeFileSync(fullPath, '');
        }

        vscode.workspace.openTextDocument(fullPath).then((doc) => {
            vscode.window.showTextDocument(doc).then(editor => {
                const length = doc.getText().length;
                const pos = editor.document.positionAt(length);
                editor.selection = new vscode.Selection(pos, pos);
                editor.edit(e => {
                    e.insert(pos, newLine(length === 0));
                });
            });
        });

}

export function deactivate() {
}

function newLine(firstLine = false) {
    const now = new Date();
    return (firstLine ? '' : EOL)
        + '# '
        + now.toJSON().slice(0, 10) + ' '
        + now.toLocaleTimeString('fullwise', {hour12: false})
        + EOL
        + EOL;
}