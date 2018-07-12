'use strict';
import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

const fileBase = 'scratchpad';
const fileExtension = '.md'
let fullPath = '';

export function activate(context: vscode.ExtensionContext) {

    let globalCommand = vscode.commands.registerCommand('extension.openGlobalScratchpad', () => {
        fullPath = path.join(context.extensionPath, "../..", fileBase + '_global' + fileExtension);

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

        vscode.workspace.openTextDocument(fullPath).then(doc => {
            vscode.window.showTextDocument(doc)
        }, (err) => console.error(err)
        );

}

export function deactivate() {
}
