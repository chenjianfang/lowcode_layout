
let dragged;
let offset = {
  x: 0,
  y: 0,
}

export default function Nested() {
  // 拖动开始触发
  const onDragStart = (e) => {
    const {x, y} = e.target.getBoundingClientRect();
    offset.x = e.clientX - x;
    offset.y = e.clientY - y;

    dragged = e.target;
    e.target.style.opacity = 0.5;
  }
  // 拖动结束触发
  const onDragEnd = (e) => {
    e.target.style.opacity = "";
    e.target.style.position = "absolute";
    
    const {left, top} = document.querySelector('#absolute').getBoundingClientRect();
    const x = e.clientX - offset.x - left;
    const y = e.clientY - offset.y - top;
    debugger;
    e.target.style.left = `${x}px`;
    e.target.style.top = `${y}px`;
  }
  // 当元素或者选择的文本被拖拽到一个有效的放置目标上时
  const onDragOver = (e) => {
    e.preventDefault();
  }

  return (
    <div
      className="App"
      id="absolute"
      style={{
        height: '700px',
        position: 'relative'
      }}
    >
      绝对定位
      <div
        draggable="true"
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
        onDragStart={onDragStart}
        className="box"
      ></div>
      <div
        draggable="true"
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
        onDragStart={onDragStart}
        className="item item1"
      ></div>
      <div
        draggable="true"
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
        onDragStart={onDragStart}
        className="item item2"
      ></div>
    </div>
  );
}
