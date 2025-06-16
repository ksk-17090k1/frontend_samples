export type AlertType = "note" | "tip" | "important" | "warning" | "caution";

// GitHubアラート記法を検出するヘルパー関数
export const parseGitHubAlert = (text: string) => {
  const cleanText = text.replace(/^\s+/, "").replace(/\s+$/, "");

  // GitHubアラート記法のパターンマッチング
  let alertMatch = cleanText.match(
    /^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\][\s\n]+(.*)/is,
  );

  // より緩いパターンも試す
  if (!alertMatch) {
    alertMatch = cleanText.match(
      /^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]\s*(.*)/s,
    );
  }

  if (alertMatch) {
    const alertType = alertMatch[1].toLowerCase() as AlertType;
    const content = alertMatch[2].trim();

    return { type: alertType, content };
  }

  return null;
};
