
let dragged;

export default function Nested() {
  // 元素拖动中触发
  const onDrag = (e) => {

  }
  // 拖动开始触发
  const onDragStart = (e) => {
    dragged = e.target;
    e.target.style.opacity = 0.5;
  }
  // 拖动结束触发
  const onDragEnd = (e) => {
    e.target.style.opacity = "";
    
    console.log(e);
  }
  // 拖动的元素进入有效的放置目标
  const onDragEnter = (e) => {
    e.target.style.background = "purple";
  }
  // 拖动的元素离开有效的放置目标
  const onDragLeave = (e) => {
    e.target.style.background = "";
  }
  // 当元素或者选择的文本被拖拽到一个有效的放置目标上时
  const onDragOver = (e) => {
    e.preventDefault();
  }
  // 放置在有效的目标上触发
  const onDrop = (e) => {
    e.preventDefault();

    e.target.style.background = "";

    let enableDrop = true;
    // 父节点或当前节点不允许移入当前节点。
    let prev = e.target;
    while(prev) {
      if (dragged === prev) {
        enableDrop = false;
        break;
      }
      prev = prev?.parentNode;
    }
    if (!enableDrop) {
      return;
    }

    dragged?.parentNode.removeChild(dragged);
    e.target.appendChild(dragged);
  }

  return (
    <div
      onDragOver={onDragOver}
      onDrop={onDrop}
      className="App"
    >
      嵌套
      <div
        draggable="true"
        onDrag={onDrag}
        onDragEnd={onDragEnd}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDragOver={onDragOver}
        onDragStart={onDragStart}
        onDrop={onDrop}
        className="box"
      ></div>
      <div
        draggable="true"
        onDrag={onDrag}
        onDragEnd={onDragEnd}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDragOver={onDragOver}
        onDragStart={onDragStart}
        className="item item1"
      ></div>
      <div
        draggable="true"
        onDrag={onDrag}
        onDragEnd={onDragEnd}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDragOver={onDragOver}
        onDragStart={onDragStart}
        className="item item2"
      ></div>
    </div>
  );
}
