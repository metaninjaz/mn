import "./Showcase.css";
import "./ShowcaseRow.css";
import "./ShowcaseItem.css";
import { useEffect, useRef } from "react";
import { ShowcaseItem } from "./ShowcaseItem";

function getCoords(elem: HTMLElement) {
  // crossbrowser version
  const box = elem.getBoundingClientRect();

  const body = document.body;
  const docEl = document.documentElement;

  const scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
  const scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

  const clientTop = docEl.clientTop || body.clientTop || 0;
  const clientLeft = docEl.clientLeft || body.clientLeft || 0;

  const top = box.top + scrollTop - clientTop;
  const left = box.left + scrollLeft - clientLeft;

  return { top: Math.round(top), left: Math.round(left) };
}

export const Showcase = () => {
  const animationRef = useRef<{ animation: Animation; reverted: boolean }[]>(
    []
  );
  const showcaseRef = useRef<HTMLDivElement>(null);
  const showcaseOffsetRef = useRef<{ top: number | null }>({ top: null });

  const updateAnimationsCurrentTime = () => {
    if (!showcaseRef.current || !animationRef.current) {
      return;
    }

    const viewportWidth = Math.max(
      document.documentElement.clientWidth || 0,
      window.innerWidth || 0
    );
    const isMobileVersion = viewportWidth < 641;

    if (showcaseOffsetRef.current.top === null) {
      showcaseOffsetRef.current.top = getCoords(showcaseRef.current).top;
    }

    const scrollY = window.scrollY || window.pageYOffset;
    const posYAtWhichShowcaseGetsIntoViewport =
      showcaseOffsetRef.current.top + window.innerHeight;

    let currentTime =
      scrollY -
      posYAtWhichShowcaseGetsIntoViewport +
      (isMobileVersion ? 20000 : 13000);
    if (currentTime < 0) {
      currentTime = 0;
    }

    let currentTimeForReverted =
      scrollY - posYAtWhichShowcaseGetsIntoViewport + 12500;
    if (currentTimeForReverted < 0) {
      currentTimeForReverted = 0;
    }

    animationRef.current.forEach(({ animation, reverted }) => {
      animation.currentTime = reverted ? currentTimeForReverted : currentTime;
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", updateAnimationsCurrentTime, {
      passive: true,
    });
    window.addEventListener("touchmove", updateAnimationsCurrentTime, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", updateAnimationsCurrentTime);
      window.removeEventListener("touchmove", updateAnimationsCurrentTime);
    };
  }, []);

  return (
    <div ref={showcaseRef} className="showcase">
      {/* <ShowcaseRow animationDataRef={animationRef} i={1} /> */}
      <div className="showcase-row">
        <ShowcaseItem imgPath={"/754.png"} />
        <ShowcaseItem imgPath={"/368.png"} />
        <ShowcaseItem imgPath={"/61.png"} />
        <ShowcaseItem imgPath={"/946.png"} />
      </div>
    </div>
  );
};
