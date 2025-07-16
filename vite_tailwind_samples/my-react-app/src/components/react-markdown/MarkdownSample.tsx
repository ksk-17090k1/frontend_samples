import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import GitHubAlert from "./GitHubAlert";
import { parseGitHubAlert } from "./gitHubAlertUtils";
import { Mermaid } from "./Marmaid";

// 子要素からテキストを抽出するヘルパー関数
const extractAllText = (nodes: React.ReactNode[]): string => {
  return nodes
    .map((node) => {
      if (typeof node === "string") {
        return node;
      }
      if (React.isValidElement(node)) {
        const props = node.props as Record<string, unknown>;
        if ("children" in props) {
          const children = props.children;
          if (Array.isArray(children)) {
            return extractAllText(children);
          }
          return extractAllText([children as React.ReactNode]);
        }
      }
      return "";
    })
    .join("");
};

// blockquoteをレンダリングするヘルパー関数
const renderBlockquote = (children: React.ReactNode) => {
  const childrenArray = React.Children.toArray(children);
  const fullText = extractAllText(childrenArray);
  const alertData = parseGitHubAlert(fullText);

  if (alertData) {
    return <GitHubAlert type={alertData.type}>{alertData.content}</GitHubAlert>;
  }

  // 通常のblockquoteとして処理
  return (
    <blockquote className="border-l-4 border-gray-300 pl-4 italic mb-4 text-gray-600">
      {children}
    </blockquote>
  );
};

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

\`\`\`mermaid
sequenceDiagram
    participant Alice
    participant Bob
    Bob->>Alice: Hi Alice
    Alice->>Bob: Hi Bob
\`\`\`

> [!NOTE]
> これはNOTEアラートです。重要な情報を表示します。

> [!TIP]
> これはTIPアラートです。便利なヒントを表示します。

> [!IMPORTANT]
> これはIMPORTANTアラートです。重要な情報を強調します。

> [!WARNING]
> これはWARNINGアラートです。注意が必要な情報を表示します。

> [!CAUTION]
> これはCAUTIONアラートです。危険な操作に関する警告を表示します。
  `;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        React Markdown サンプル
      </h1>

      <div className="rounded-lg shadow-lg p-6 prose prose-lg max-w-none markdown-body">
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
            h3: ({ children }) => (
              <h3 className="text-xl font-semibold mb-2">{children}</h3>
            ),
            p: ({ children }) => (
              <p className="mb-4 text-gray-700">{children}</p>
            ),
            ul: ({ children }) => (
              <ul className="list-disc list-inside mb-4">{children}</ul>
            ),
            li: ({ children }) => <li className="mb-1">{children}</li>,
            code: ({ children, className }) => {
              // mermaidの場合(なお、この実装はSSRでは動かない模様)
              if (className === "language-mermaid") {
                return <Mermaid code={children as string} />;
              } else {
                // 通常のコードブロックの場合(Syntax Highlighterとかを入れたほうがいいらしい)
                return (
                  <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">
                    {children}
                  </code>
                );
              }
            },
            pre: ({ children }) => (
              <pre className="bg-gray-100 p-4 rounded mb-4 overflow-x-auto">
                {children}
              </pre>
            ),
            strong: ({ children }) => (
              <strong className="font-bold">{children}</strong>
            ),
            em: ({ children }) => <em className="italic">{children}</em>,
            blockquote: ({ children }) => {
              return renderBlockquote(children);
            },
          }}
          // 大体の場合、githubのマークダウンの記法や数式も使いたいので、remarkGfmやremarkMathを指定することが多い。
          remarkPlugins={[remarkGfm]}
        >
          {markdownContent}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default MarkdownSample;
