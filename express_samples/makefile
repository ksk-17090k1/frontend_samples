# --- Node.js ---

package.json:
	npm init --yes

# --- Setup TypeScript ---
# first
up-ts: package.json 
	npm install -D typescript @types/node
	make tsconfig.json

tsconfig.json: 
	npx tsc --init
	@echo "❗tsconfig.jsonの設定を行ってください❗"
	@echo "以下をtrueにすることをオススメします。"
	@echo "noUncheckedIndexedAccess, exactOptionalPropertyTypes, noImplicitReturns"
	@echo "noFallthroughCasesInSwitch, noImplicitOverride"

clean-ts:
	rm -rf node_modules package-lock.json  package.json tsconfig.json

# --- Jest ---

up_jest:
	npm install -D jest
	npm install -D ts-jest @types/jest
# jestのconfigファイルを作成
	npx ts-jest config:init
	@echo "❗package.json のscriptsに 'test': 'jest' を設定してください❗"


# --- Eslint ---
# 質問への回答はこれを参照のこと：
# https://dev.to/devdammak/setting-up-eslint-in-your-javascript-project-with-vs-code-2amf
# NOTE: React使うなら Where does your code run? は Browser を選ぶ
# first
up_eslint: package.json 
	npm init @eslint/config@latest
	@echo "eslint-plugin-react-hooks がeslintの9系に対応していないため、8系をインストール"
	npm install eslint@8.56.0
	make _up_eslint_react

_up_eslint_react:
	npm i -D eslint-plugin-react 
	npm i -D eslint-plugin-react-hooks 
# eslintのinit時の質問にreactを使うと答えると以下の設定が自動で追加される模様なのでコメントアウト
# @echo "❗ESLintの設定ファイルに【eslint-plugin-react】の追加設定を行ってください❗"
# @echo "詳細は https://github.com/jsx-eslint/eslint-plugin-react を参照してください"
	@echo "❗ESLintの設定ファイルに【eslint-plugin-react-hooks】の追加設定を行ってください❗"
	@echo "設定内容の詳細は以下を参考にしてください"
	@echo 'import pluginReactHooks from "eslint-plugin-react-hooks";'
	@echo '{'
	@echo '  files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],'
	@echo '  plugins: {'
	@echo '    "react-hooks": pluginReactHooks,'
	@echo '  },'
	@echo '  rules: {'
	@echo '    ...pluginReactHooks.configs.recommended.rules,'
	@echo '  },'
	@echo '},'

_clean_eslint: 
	rm -rf *eslint.config*
	npm uninstall eslint @eslint/js eslint-plugin-react typescript-eslint globals

_clean_eslint_react: 
	npm uninstall eslint-plugin-react eslint-plugin-react-hooks

clean_eslint_and_react:
	make _clean_eslint
	make _clean_eslint_react
	npm i

# --- Prettier ---
# first
up_prettier: .prettierrc .prettierignore
	npm install --save-dev --save-exact prettier
	npm i -D eslint-config-prettier
	@echo "❗EsLintの設定ファイルに【prettier】の追加設定を行ってください❗"
	@echo "詳細は https://github.com/prettier/eslint-config-prettier を参照してください"
	@echo "追記: Eslintとprettierは分離が進んでいるのでeslint-config-prettierを入れなくてもそこまで致命的なバグは置きにくそう"

.prettierrc:
	node --eval "fs.writeFileSync('.prettierrc','{}\n')"

.prettierignore:
	touch .prettierignore

clean_prettier:
	rm -rf .prettierrc .prettierignore 
	npm uninstall -D prettier eslint-config-prettier
	make re-i

# TODO: prettier-plugin-tailwindcss の設定も足す。

# --- stylelint ---

sl-init:
	npm init stylelint
	npm i -D stylelint-config-recess-order
	npm i -D stylelint-declaration-block-no-ignored-properties
	@echo "❗stylelintの設定ファイルに以下を記述してください❗"
	@echo "refs: https://e-joint.jp/blog/2127#su-toc-item-2"
	@echo '{'
	@echo '  "extends": ["stylelint-config-standard", "stylelint-config-recess-order"],'
	@echo '  "plugins": ["stylelint-declaration-block-no-ignored-properties"],'
	@echo '  "rules": {'
	@echo '    "plugin/declaration-block-no-ignored-properties": true,'
	@echo '    "selector-class-pattern": "^[a-z][a-zA-Z0-9-]+$",'
	@echo '    "no-descending-specificity": null'
	@echo '  }'
	@echo '}'
	@echo "NOTE: selector-class-pattern の追加ルールはCSS Moduleを想定してCamel Caseを許可するための設定!"
	@echo "NOTE: no-descending-specificityの追加ルールは:hoverなどを使った際にうまく動作しないので設定!"

sl-clean:
	rm .stylelintrc.json
	npm uninstall -D stylelint stylelint-config-standard 
	npm uninstall -D stylelint-config-recess-order stylelint-declaration-block-no-ignored-properties


# --- Vite ---
# viteのinitでeslintは自動で入るが、prettierは入らない
# first
up-vite: vite-env.d.ts .env.local
	npm create vite@latest my-react-app -- --template react-ts

vite-env.d.ts:
	touch vite-env.d.ts
	@echo "❗vite-env.d.tsの設定を行ってください❗"
	@echo "以下の内容を参照してください。"
	@echo "https://ja.vitejs.dev/guide/env-and-mode.html"

.env.local: 
	touch .env.local

# --- node_modules ---
re-i:
	rm -r node_modules
	npm i

# --- Clasp ---
clasp-install:
	npm i @google/clasp -g
	clasp login

clasp-clone:
	@echo "clone prod"
	cd ${LLM_EXAM_GAS_DIR}/prod && clasp clone ${LLM_EXAM_GAS_ID_PROD}

clasp-clone-dev:
	@echo "clone dev"
	cd ${LLM_EXAM_GAS_DIR}/dev && clasp clone ${LLM_EXAM_GAS_ID_DEV}

clasp-create:
	mkdir app
	cd app \
	&& clasp create --title "ClaspApp" --type standalone \
	&& touch main.ts \
	&& code main.ts

# --- AWS CDK ---

account = 737276082677
region = ap-northeast-1
cdk-project = cdk

# NOTE: npmとTypeScriptは勝手に入る
up_cdk:
	npm install -g aws-cdk
	mkdir ${cdk-project}
	cd ${cdk-project} \
	&& cdk init app --language typescript
	make _setup_ts_lambda

cdk_bs:
	cdk bootstrap aws://${account}/${region}

# NodejsFunctionでTypeScriptをコンパイルする場合はesbuildのインストールが推奨
_setup_ts_lambda:
	cd ${cdk-project} \
	&& npm install --save-dev esbuild@0