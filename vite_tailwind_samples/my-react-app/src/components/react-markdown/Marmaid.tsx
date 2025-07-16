import mermaid from "mermaid";
import React from "react";

// refs: https://zenn.dev/mitate_gengaku/articles/zoom-move-able-react-mermaid

export const Mermaid = (props: { code: string }) => {
  const { code } = props;
  const outputRef = React.useRef<HTMLDivElement>(null);
  const id = React.useMemo(
    // ランダムなIDを生成
    () => `mermaid-${Math.random().toString(36).slice(2, 11)}`,
    [],
  );

  const render = React.useCallback(async () => {
    if (outputRef.current && code) {
      try {
        const { svg } = await mermaid.render(id, code);
        outputRef.current.innerHTML = svg;
      } catch (error) {
        outputRef.current.innerHTML = `<div class="text-red-500">Error rendering Mermaid diagram: ${error}</div>`;
      }
    }
  }, [code, id]);

  React.useEffect(() => {
    render();
  }, [render]);

  return code ? (
    <div>
      <div ref={outputRef} className="[&>svg]:h-56" />
    </div>
  ) : null;
};
