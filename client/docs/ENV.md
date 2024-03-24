# [↤](../README.md) Environment

## [Environment settings](https://vitejs.dev/guide/env-and-mode.html)

All config variables are in one of the file

```
.env                # loaded in all cases
.env.local          # loaded in all cases, ignored by git
.env.[mode]         # only loaded in specified mode
.env.[mode].local   # only loaded in specified mode, ignored by git
```

Only variables prefixed with VITE\_ are exposed to your Vite-processed code. e.g. for the following env variables:

```
VITE_SOME_KEY=123
```
