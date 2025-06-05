import React, { useState, useEffect, useRef } from "react";

const JsonEditor: React.FC = () => {
  const [text, setText] = useState<string>("{}");
  const [lines, setLines] = useState<number[]>([1]);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const lineNumbersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLines(Array.from({ length: text.split("\n").length }, (_, i) => i + 1));
  }, [text]);

  const handleScroll = () => {
    if (textAreaRef.current && lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = textAreaRef.current.scrollTop;
    }
  };

  const highlightErrors = (input: string) => {
    return input.replace(
      /(\b[a-zA-Z_]+\b)(?=\s*:)/g,
      '<span class="error">$1</span>'
    );
  };

  return (
    <div style={styles.editorContainer}>
      {/* Line Numbers */}
      <div ref={lineNumbersRef} style={styles.lineNumbers}>
        {lines.map((line) => (
          <div key={line}>{line}</div>
        ))}
      </div>

      {/* Textarea with Error Highlighting */}
      <div style={styles.editorWrapper}>
        <textarea
          ref={textAreaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onScroll={handleScroll}
          style={styles.textarea}
        />
        <div
          style={styles.highlight}
          dangerouslySetInnerHTML={{ __html: highlightErrors(text) }}
        />
      </div>
    </div>
  );
};

// Styles
const styles: { [key: string]: React.CSSProperties } = {
  editorContainer: {
    display: "flex",
    border: "1px solid #444",
    borderRadius: "5px",
    overflow: "hidden",
    width: "500px",
    height: "300px",
    background: "#1e1e1e",
    color: "white",
  },
  lineNumbers: {
    padding: "10px",
    textAlign: "right",
    background: "#2b2b2b",
    color: "gray",
    userSelect: "none",
    overflow: "hidden",
    minWidth: "30px",
  },
  editorWrapper: {
    position: "relative",
    width: "100%",
    height: "100%",
  },
  textarea: {
    width: "100%",
    height: "100%",
    background: "transparent",
    color: "white",
    border: "none",
    outline: "none",
    resize: "none",
    fontSize: "14px",
    padding: "10px",
    fontFamily: "monospace",
    whiteSpace: "pre",
    caretColor: "white",
    position: "absolute",
  },
  highlight: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    padding: "10px",
    fontFamily: "monospace",
    fontSize: "14px",
    whiteSpace: "pre",
    color: "transparent",
    background: "transparent",
    pointerEvents: "none",
  },
};

export default JsonEditor;
