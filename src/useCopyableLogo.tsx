import { MutableRefObject, useEffect } from "react";

export const useCopyableLogo = ({
  containerRef,
}: {
  containerRef: MutableRefObject<HTMLElement | null>;
}) => {
  useEffect(() => {
    (containerRef.current as HTMLElement).addEventListener("copy", (e) => {
      const selection = document.getSelection();
      const range = selection?.getRangeAt(0);
      const contents = range?.cloneContents();
      let copiedText = "";

      const childNodes =
        contents?.childNodes.values() as IterableIterator<ChildNode>;
      for (const node of childNodes) {
        if (node.nodeType === Node.TEXT_NODE) {
          copiedText += node.textContent;
        } else if (
          node.nodeType === Node.ELEMENT_NODE &&
          node.nodeName === "SPAN"
        ) {
          const n: any = node;
          if (n.dataset.copyText) {
            copiedText += n.dataset.copyText;
            continue;
          }

          copiedText += node.textContent;
        }
      }

      e.clipboardData?.setData("text/plain", copiedText);
      e.preventDefault();
    });
  }, []);
};
