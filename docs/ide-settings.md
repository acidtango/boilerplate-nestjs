# IDE settings

- [Visual Code](#visual-code)

## Visual Code

### settings.json

- typescript.tsdk: Could select plugin or workspace SDK. Could be useful to avoid version mismatch while developing.

```json
{
  "typescript.preferences.importModuleSpecifier": "relative",
  "typescript.tsdk": "node_modules/typescript/lib"
}
```

### launch.json

```json
{
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Jest",
      "program": "${workspaceFolder}/node_modules/jest/bin/jest",
      "args": ["--inspect-brk", "--coverage=false", "--watch", "${relativeFile}"],
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen"
    },
    {
      "type": "node",
      "request": "launch",
      "name": "Jest - Coverage",
      "program": "${workspaceFolder}/node_modules/jest/bin/jest",
      "args": ["--inspect-brk", "--coverage", "--watch", "${relativeFile}"],
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen"
    },
    {
      "type": "node",
      "request": "launch",
      "name": "Jest all",
      "program": "${workspaceFolder}/node_modules/jest/bin/jest",
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen"
    }
  ],
  "compounds": []
}
```
