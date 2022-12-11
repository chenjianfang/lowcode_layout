import { useEffect } from "react";
import Moveable from "moveable";

export default function Size() {
  // 拖动开始触发
  const onDragStart = (e) => {
    e.target.style.opacity = 0.5;
  }
  // 拖动结束触发
  const onDragEnd = (e) => {
    e.target.style.opacity = "";
  }
  // 当元素或者选择的文本被拖拽到一个有效的放置目标上时
  const onDragOver = (e) => {
    e.preventDefault();
  }

  useEffect(() => {
    const moveable = new Moveable(document.body, {
      target: document.querySelector("#sizes"),
      // If the container is null, the position is fixed. (default: parentElement(document.body))
      container: document.body,
      draggable: true,
      resizable: true,
      scalable: true,
      rotatable: false,
      warpable: false,
      // Enabling pinchable lets you use events that
      // can be used in draggable, resizable, scalable, and rotateable.
      pinchable: false, // ["resizable", "scalable", "rotatable"]
      origin: false,
      keepRatio: false,
      // Resize, Scale Events at edges.
      edge: false,
      throttleDrag: 0,
      throttleResize: 0,
      throttleScale: 0,
      throttleRotate: 0,
    });

    /* resizable */
    moveable.on("resizeStart", ({ target, clientX, clientY }) => {
      console.log("onResizeStart", target);
    }).on("resize", ({ target, width, height, dist, delta, clientX, clientY }) => {
      console.log("onResize", target);
      delta[0] && (target.style.width = `${width}px`);
      delta[1] && (target.style.height = `${height}px`);
    }).on("resizeEnd", ({ target, isDrag, clientX, clientY }) => {
      console.log("onResizeEnd", target, isDrag);
    });
  }, []);

  return (
    <div
      className="App"
    >
      调整尺寸
      <div
        draggable="true"
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
        onDragStart={onDragStart}
        className="item item1"
        id="sizes"
      ></div>
    </div>
  );
}
