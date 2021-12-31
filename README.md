# initialization

`[]` is optional.
Example: `npm init --yes` or `npm init`

1. `npm init [--yes]`
1. `npm i -D eslint prettier eslint-config-prettier`
1. Add `.prettierrc` and `.eslintrc` files to root directory:

#### .prettierrc

```
{}
```

#### .eslintrc

```
{
  "env": {
    "node": true
  },
  "extends": ["eslint:recommended", "prettier"],
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  }
}
```

1. `git init`
1. `git add .`
1. `git commit -m 'feat(*): initial commit'`
1. `git remote add origin` **`https://github.com/raylyanway/algo.git`**
1. `git pull [--allow-unrelated-histories]`
