import React from "react";
import ReactMarkdown from "react-markdown";

const MarkdownSample: React.FC = () => {
  const markdownContent = `
# メインヘッダー

これはreact-markdownのサンプルです。

## サブヘッダー

Markdownテキストが自動的にHTMLに変換されます。

### 小見出し

- リスト項目1
- リスト項目2
- リスト項目3

**太字のテキスト**と*斜体のテキスト*も使用できます。

\`\`\`javascript
console.log('コードブロックも表示できます');
\`\`\`
  `;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        React Markdown サンプル
      </h1>

      <div className="bg-white rounded-lg shadow-lg p-6 prose prose-lg max-w-none">
        <ReactMarkdown
          // componentsを指定しないとマークダウンから変換されたHTMLはスタイルが当たらない
          // もう少し厳密にいうと、tailwindcss使っているのでデフォルトだとスタイルがあたってないので。
          // スタイルを当てるには、componentsにタグごとに指定する。ここではJSXで指定しているが、コンポーネントでもOK
          // ただし、この運用は実装が複雑になって辛いらしい： https://blog.stin.ink/articles/replace-react-markdown-with-remark
          components={{
            h1: ({ children }) => (
              <h1 className="text-3xl font-bold mb-4">{children}</h1>
            ),
            h2: ({ children }) => (
              <h2 className="text-2xl font-semibold mb-3">{children}</h2>
            ),
            p: ({ children }) => (
              <p className="mb-4 text-gray-700">{children}</p>
            ),
            ul: ({ children }) => (
              <ul className="list-disc list-inside mb-4">{children}</ul>
            ),
            code: ({ children }) => (
              <code className="bg-gray-100 px-2 py-1 rounded">{children}</code>
            ),
          }}
          // 大体の場合、githubのマークダウンの記法も使いたいので、remarkGfmを指定することが多い。
          //   remarkPlugins={[remarkGfm]}
        >
          {markdownContent}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default MarkdownSample;
