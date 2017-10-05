# Scratchpad MD

Simple Scratchpad for quick notes.

Notes are created as markdown files. Notes can either be created in the local project folder or the global extensions folder. 


# Usage
1. Install plugin
2. Press F1, search for "Scratchpad Markdown"
3. Add Keybindings

```
// Place your key bindings in this file to overwrite the defaults
[
    { "key": "ctrl+k ctrl+s",   "command": "extension.openGlobalScratchpad", "when": "editorTextFocus" },
    { "key": "ctrl+k s",        "command": "extension.openLocalScratchpad", "when": "editorTextFocus" }
]
```


This code is forked from https://github.com/awesomektvn/vscode-scratchpad 

# Changelog 

## v0.0.2
- Now the cursor & newline are placed at the top of the file

## v0.0.3
- Global now stored in ~/.vscode

# Publishing