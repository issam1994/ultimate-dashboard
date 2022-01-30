import { useEffect, useRef, useState } from "react";

export default function StickyScrollbar({ overflowedTarget }) {
  if(!overflowedTarget) return null;
  // vars 
  const scrollbarRef = useRef(null);
  const [showScrollbar, setShowScrollbar] = useState(false);
  const scrollbarWidth = overflowedTarget?.offsetWidth || 0;
  const contentWidth = overflowedTarget?.scrollWidth || 0;
  // styles
  const scrollbarStyles = {
    overflowX: "auto",
    position: "fixed",
    visibility: showScrollbar ? "visible" : "hidden",
    width: scrollbarWidth,
    left: overflowedTarget?.offsetLeft,
    bottom: 0,
  };
  const contentStyles = { height: "1px", width: contentWidth };
  // handlers
  const handleVisibility = () => {
    // vars
    const windowY = window.scrollY;
    const windowHeight = window.innerHeight;
    const windowBottomY = windowY + windowHeight;
    const targetTopY = overflowedTarget.offsetTop;
    const targetHeight = overflowedTarget.offsetHeight;
    const targetBottomY = targetTopY + targetHeight;
    // conditions
    const targetIsWithinView = windowBottomY > targetTopY;
    const targetBottomIsVisible = windowBottomY > targetBottomY;
    const targetIsNotVisible =
      windowY > targetBottomY || windowBottomY < targetTopY;
    //
    if (targetIsWithinView && !targetBottomIsVisible) {
      setShowScrollbar(true);
    } else if (targetIsNotVisible || targetBottomIsVisible) {
      setShowScrollbar(false);
    }
    // console.log("window scrolled", {windowY, targetTopY,targetHeight, targetBottomY});
  };
  const handleOverflowedTargetScrolled = (e) => {
    scrollbarRef.current.scrollLeft = e.target.scrollLeft;
  };
  const handleScrollbarScrolled = (e) => {
    overflowedTarget.scrollLeft = e.target.scrollLeft;
  };
  const attachListners = () => {
    window?.addEventListener("scroll", handleVisibility);
    overflowedTarget?.addEventListener(
      "scroll",
      handleOverflowedTargetScrolled
    );
    scrollbarRef?.current.addEventListener("scroll", handleScrollbarScrolled);
  };
  const removeListeners = () => {
    window?.removeEventListener("scroll", handleVisibility);
    overflowedTarget?.removeEventListener(
      "scroll",
      handleOverflowedTargetScrolled
    );
    scrollbarRef?.current.removeEventListener(
      "scroll",
      handleScrollbarScrolled
    );
  };
  // on mounted
  useEffect(() => {
    if (overflowedTarget) {
      attachListners();
    }
    handleVisibility();
    return removeListeners;
  }, [overflowedTarget]);
  return (
    <div ref={(ref) => (scrollbarRef.current = ref)} style={scrollbarStyles}>
      {/* content  */}
      <div style={contentStyles}></div>
    </div>
  );
}
