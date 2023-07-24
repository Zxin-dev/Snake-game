import { useEffect, useState } from "react";
import useInterval from "use-interval";
const zoom = 10;
const areaWidth = 30;
const areaHeight = 30;
export default function Home() {
  const [body, setbody] = useState([
    { top: 3, left: 5 },
    { top: 3, left: 4 },
    { top: 3, left: 3 },
  ]);
  const [direction, setDirection] = useState("right");
  useEffect(() => {
    window.addEventListener(`keydown`, (e) => {
      switch (e.code) {
        case "ArrowLeft":
          setDirection("left");
          break;
        case "ArrowRight":
          setDirection("right");
          break;
        case "ArrowUp":
          setDirection("up");
          break;
        case "ArrowDown":
          setDirection("down");
          break;
      }
    });
  });
  function goRight() {
    const newbody = [...body];
    newbody.pop();
    let newLeft = newbody[0].left + 1;
    if (newLeft > areaWidth - 1) {
      newLeft = 0;
    }
    newbody.unshift({ ...newbody[0], left: newLeft });
    setbody(newbody);
  }

  function goDown() {
    const newbody = [...body];
    newbody.pop();
    let newTop = newbody[0].top + 1;
    if (newTop > areaHeight - 1) {
      newTop = 0;
    }
    newbody.unshift({ ...newbody[0], top: newTop });
    setbody(newbody);
  }

  function goLeft() {
    const newbody = [...body];
    newbody.pop();
    let newRight = newbody[0].left - 1;

    if (newRight < 0) {
      newRight = areaWidth - 1;
      console.log(newRight);
    }
    newbody.unshift({ ...newbody[0], left: newRight });
    setbody(newbody);
  }
  function goUp() {
    const newbody = [...body];
    newbody.pop();
    let newBottom = newbody[0].top - 1;
    if (newBottom < 0) {
      newBottom = areaHeight - 1;
    }
    newbody.unshift({ ...newbody[0], top: newBottom });
    setbody(newbody);
  }

  // function goDown() {
  //   const newbody = [...body];
  //   for (let i = 0; i < newbody.length; i++) {
  //     let newTop = newbody[i].top + 1;
  //     if (newTop > areaHeight - 1) {
  //       newTop = 0;
  //     }
  //     newbody[i] = { ...newbody[i], top: newTop };
  //   }
  //   setbody(newbody);
  // }
  useInterval(() => {
    switch (direction) {
      case "right":
        goRight();
        break;
      case "down":
        goDown();
        break;
      case "left":
        goLeft();
        break;
      case "up":
        goUp();
        break;
    }
  }, 100);
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24`}
    >
      <div
        className="relative bg-slate-300"
        style={{ width: areaWidth * zoom, height: areaHeight * zoom }}
      >
        {body.map((segment) => (
          <div
            className="absolute rounded bg-slate-900"
            style={{
              top: segment.top * zoom,
              left: segment.left * zoom,
              width: zoom,
              height: zoom,
            }}
          ></div>
        ))}
      </div>
    </main>
  );
}
