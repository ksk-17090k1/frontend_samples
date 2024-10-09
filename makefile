# --- Prettier ---
# ESLintの設定ファイルに追加設定が必要！詳しくは以下かメモを参照。
# https://github.com/prettier/eslint-config-prettier
# first
up_prettier: .prettierrc .prettierignore
	npm install --save-dev --save-exact prettier
	npm i -D eslint-config-prettier
	@echo "❗ESLintの設定ファイルに【prettier】の追加設定を行ってください❗"
	@echo "詳細は https://github.com/prettier/eslint-config-prettier を参照してください"

.prettierrc:
	node --eval "fs.writeFileSync('.prettierrc','{}\n')"

.prettierignore:
	touch .prettierignore

clean_prettier:
	rm -rf .prettierrc .prettierignore 
	npm uninstall -D prettier eslint-config-prettier
	make re-i

# TODO: prettier-plugin-tailwindcss の設定も足す。