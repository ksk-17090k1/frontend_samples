import { visit } from "unist-util-visit";
import type { Root, Blockquote, Node } from "mdast";

// 型ガード関数
function isTextNode(node: Node): node is Node & { value: string } {
  return node.type === "text" && "value" in node;
}

function isParagraphNode(node: Node): node is Node & { children: Node[] } {
  return node.type === "paragraph" && "children" in node;
}

function hasChildren(node: Node): node is Node & { children: Node[] } {
  return (
    "children" in node &&
    Array.isArray((node as { children?: unknown }).children)
  );
}

// HTMLエスケープ関数
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// ノードからテキストコンテンツを抽出する関数
function extractTextContent(node: Node): string {
  if (isTextNode(node)) {
    return escapeHtml(node.value);
  }

  if (node.type === "strong" && hasChildren(node)) {
    const strongText = node.children.map(extractTextContent).join("");
    return `<strong>${strongText}</strong>`;
  }

  if (node.type === "emphasis" && hasChildren(node)) {
    const emText = node.children.map(extractTextContent).join("");
    return `<em>${emText}</em>`;
  }

  return "";
}

// GitHubアラート記法を処理するremark plugin
export function remarkGitHubAlerts() {
  return (tree: Root) => {
    visit(tree, "blockquote", (node: Blockquote) => {
      // blockquoteの最初の子要素がparagraphで、GitHubアラート記法を含むかチェック
      if (node.children && node.children.length > 0) {
        const firstChild = node.children[0];
        if (isParagraphNode(firstChild) && firstChild.children.length > 0) {
          const firstText = firstChild.children[0];

          // [!TYPE] 形式のテキストをチェック
          if (isTextNode(firstText)) {
            const alertMatch = firstText.value.match(
              /^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]/i,
            );
            if (alertMatch) {
              const alertType = alertMatch[1].toLowerCase();

              // [!TYPE] 部分を除いた残りのテキストを処理
              const remainingText = firstText.value.replace(
                /^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]\s*/i,
                "",
              );

              // 残りのテキストを更新するか、空なら削除
              if (remainingText.trim()) {
                firstText.value = remainingText;
              } else {
                firstChild.children.shift();
                if (firstChild.children.length === 0) {
                  node.children.shift();
                }
              }

              // アラート用のHTMLを直接生成
              const titleText =
                alertType.charAt(0).toUpperCase() + alertType.slice(1);

              // 内容を手動で処理してHTMLを生成
              let contentHtml = "";

              for (const child of node.children) {
                if (isParagraphNode(child)) {
                  const textContent = child.children
                    .map(extractTextContent)
                    .join("");

                  if (textContent.trim()) {
                    contentHtml += `<p>${textContent}</p>`;
                  }
                }
              }

              // blockquoteをHTMLノードに変換
              const htmlNode = node as unknown as {
                type: "html";
                value: string;
                children?: undefined;
              };

              htmlNode.type = "html";
              htmlNode.value = `<div class="markdown-alert markdown-alert-${alertType}">
  <p class="markdown-alert-title">${escapeHtml(titleText)}</p>
  ${contentHtml}
</div>`;

              // 子要素をクリア（HTMLとして扱うため）
              delete htmlNode.children;
            }
          }
        }
      }
    });
  };
}
