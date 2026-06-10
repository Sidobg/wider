"use client";

import React, { useEffect, useRef } from "react";

interface PoemAnimationProps {
  poemHTML: string;
  backgroundImageUrl?: string;
  boyImageUrl?: string;
  /** Quante volte ripetere il testo per uno scroll continuo */
  repeat?: number;
}

/**
 * Renders the 3D scrolling-text cube animation (background decorativo).
 */
export const PoemAnimation: React.FC<PoemAnimationProps> = ({
  poemHTML,
  backgroundImageUrl = "",
  boyImageUrl = "",
  repeat = 24,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);

  // Scaling responsivo del contenitore animazione
  useEffect(() => {
    function adjustContentSize() {
      if (contentRef.current) {
        const viewportWidth = window.innerWidth;
        const baseWidth = 1000;
        const scaleFactor =
          viewportWidth < baseWidth ? (viewportWidth / baseWidth) * 0.9 : 1;
        contentRef.current.style.transform = `scale(${scaleFactor})`;
      }
    }
    adjustContentSize();
    window.addEventListener("resize", adjustContentSize);
    return () => window.removeEventListener("resize", adjustContentSize);
  }, []);

  const longText = poemHTML.repeat(repeat);

  return (
    <header className="hero-section">
      <div className="container">
        <div
          ref={contentRef}
          className="content"
          style={{ display: "block", width: "1000px", height: "562px" }}
        >
          <div className="container-full">
            <div className="animated hue"></div>
            {backgroundImageUrl && (
              <img
                className="backgroundImage"
                src={backgroundImageUrl}
                alt=""
                onError={(e) => ((e.target as HTMLImageElement).style.display = "none")}
              />
            )}
            {boyImageUrl && (
              <img
                className="boyImage"
                src={boyImageUrl}
                alt=""
                onError={(e) => ((e.target as HTMLImageElement).style.display = "none")}
              />
            )}

            <div className="container">
              <div className="cube">
                <div className="face top"></div>
                <div className="face bottom"></div>
                <div className="face left text" dangerouslySetInnerHTML={{ __html: longText }}></div>
                <div className="face right text" dangerouslySetInnerHTML={{ __html: longText }}></div>
                <div className="face front"></div>
                <div className="face back text" dangerouslySetInnerHTML={{ __html: longText }}></div>
              </div>
            </div>

            <div className="container-reflect">
              <div className="cube">
                <div className="face top"></div>
                <div className="face bottom"></div>
                <div className="face left text" dangerouslySetInnerHTML={{ __html: longText }}></div>
                <div className="face right text" dangerouslySetInnerHTML={{ __html: longText }}></div>
                <div className="face front"></div>
                <div className="face back text" dangerouslySetInnerHTML={{ __html: longText }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
