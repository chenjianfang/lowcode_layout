import {useEffect} from 'react';

let level = 1;

function getAligned(targetId, targetRect) {
  let nodes = document.querySelector('.positionBox').childNodes;
  
  const nodeRect = {};

  while(nodes.length) {
    const temp = [...nodes];
    nodes = [];
    temp.forEach((node) => {
      if (node.nodeType === 1 && node.id !== targetId) {
        const {left, right, top, bottom} = node.getBoundingClientRect();
        if (node.id) {
          nodeRect[node.id] = {
            top,
            bottom,
            left,
            right,
          };
        }
       
        if (node.childNodes?.length) {
          nodes = [
            ...nodes,
            ...node.childNodes,
          ]
        }
      }
    });
  }

  const targetNode =  document.querySelector(`#${targetId}`);
  let hasMove = false;

  // 上下移动
  function moveUpDown() {
    const crossXMap = {};
    let containId;
    Object.entries(nodeRect).forEach(([id, rect]) => {
      if (targetNode.parentNode.dataset.level && document.querySelector(`#${id}`).parentNode.dataset.level === targetNode.parentNode.dataset.level) {
        return;
      }

      const topCross = targetRect.top < rect.top && targetRect.bottom > rect.top;
      const bottomCross = targetRect.top < rect.bottom && targetRect.bottom > rect.bottom;

      const targetContain = targetRect.top < rect.top && targetRect.bottom > rect.bottom;
      const nodeContain = targetRect.top > rect.top && targetRect.bottom < rect.bottom;

      if (targetContain || nodeContain) {
        containId = id;
      }
      if (topCross || bottomCross) {
        let distance;
        if (topCross) {
          distance = targetRect.bottom - rect.top;
        } else {
          distance = rect.bottom - targetRect.top;
        }

        crossXMap[id] = distance;
      }
    });

    if (!Object.keys(crossXMap).length && !containId) {
      // 没有交叉
      return;
    }
    hasMove = true;
    console.log('crossXMap: ', containId, crossXMap);

    function combinedTogether(id) {
      console.log('id: ', id);
      // x轴方向元素有交叉
      // 创建一个元素包含交叉的两个元素
      const boxEle = document.createElement('div');
      boxEle.dataset.level = level;
      level += 1;

      const crossEle = document.querySelector(`#${id}`);
      const crossEleParent = crossEle.parentNode;
      crossEleParent.removeChild(crossEle);
      boxEle.appendChild(crossEle);

      const targetEle = document.querySelector(`#${targetId}`);
      targetEle.parentNode.removeChild(targetEle);
      boxEle.appendChild(targetEle);

      crossEleParent.appendChild(boxEle);
    }

    if (containId) {
      combinedTogether(containId);
      return;
    }

    // 找出相交最大的id
    let maxId;
    let maxDistance = 0;
    Object.entries(crossXMap).forEach(([id, distance]) => {
      if (distance > maxDistance) {
        maxId = id;
        maxDistance = distance;
      }
    });
    combinedTogether(maxId);
  }

  moveUpDown();

  // 左右移动
  function moveLeftRight() {
    if (!targetNode.parentNode.dataset.level) {
      return;
    }
    // drag节点
    const list = [{
      left: targetRect.left,
      node: targetNode,
    }];
    // 获取所有节点的的clientX
    const parentNode = targetNode.parentNode;
    parentNode.childNodes.forEach((node) => {
      if (node === targetNode) {
        return;
      }
      const {left} = node.getBoundingClientRect();
      list.push({
        left,
        node
      });
    });
    // 升序
    list.sort((a, b) => a.left - b.left);
    // 插入
    parentNode.innerHTML = '';
    list.forEach(({node}) => {
      parentNode.appendChild(node);
    })
  }

  if (!hasMove) {
    moveLeftRight();
  }
}

export default function Rect() {
  let offset = {
    x: 0,
    y: 0,
  }

  // 拖动开始触发
  const onDragStart = (e) => {
    const {x, y} = e.target.getBoundingClientRect();
    offset.x = e.clientX - x;
    offset.y = e.clientY - y;

    e.target.style.opacity = 0.5;
  }
  // 拖动结束触发
  const onDragEnd = (e) => {
    const rect = {
      left: e.clientX - offset.x,
      top: e.clientY - offset.y,
      right: e.clientX - offset.x + e.target.offsetWidth,
      bottom: e.clientY - offset.y + e.target.offsetHeight,
    }
    getAligned(e.target.id, rect);
  }

  return (
    <div
      className="positionBox App"
      id="position"
    >
      上下左右定位
      <div
        draggable="true"
        onDragEnd={onDragEnd}
        onDragStart={onDragStart}
        className="box"
        id="positionChild1"
      ></div>
      <div
        draggable="true"
        onDragEnd={onDragEnd}
        onDragStart={onDragStart}
        className="item item1"
        id="positionChild2"
      ></div>
      <div
        draggable="true"
        onDragEnd={onDragEnd}
        onDragStart={onDragStart}
        className="item item2"
        id="positionChild3"
      ></div>
      <div
        draggable="true"
        onDragEnd={onDragEnd}
        onDragStart={onDragStart}
        className="item item3"
        id="positionChild4"
      ></div>
      <div
        draggable="true"
        onDragEnd={onDragEnd}
        onDragStart={onDragStart}
        className="item item4"
        id="positionChild5"
      ></div>
    </div>
  );
}

