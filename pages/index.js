import { useEffect, useState } from "react";
import useInterval from "use-interval";
const zoom = 15;
const areaWidth = 40;
const areaHeight = 40;

export default function Home() {
  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  const [apple, setApple] = useState({
    top: getRandomInt(areaHeight - 1),
    left: getRandomInt(areaWidth - 1),
  });
  const [count, setCount] = useState(-1);
  const [body, setbody] = useState([
    { top: 3, left: 11 },
    { top: 3, left: 10 },
    { top: 3, left: 9 },
  ]);

  const [direction, setDirection] = useState("right");
  useEffect((e) => {
    eatApple();
    window.addEventListener(`keydown`, (e) => {
      setDirection((prevDirection) => {
        switch (e.code) {
          case "ArrowLeft":
            if (prevDirection !== `right`) {
              return "left";
            }
            break;
          case "ArrowRight":
            if (prevDirection !== `left`) {
              return "right";
            }
            break;
          case "ArrowUp":
            if (prevDirection !== `down`) {
              return `up`;
            }
            break;
          case "ArrowDown":
            if (prevDirection !== `up`) {
              return `down`;
            }
            break;
        }
        return prevDirection;
      });
    });
  }, []);
  function eatApple() {
    const top = getRandomInt(areaHeight - 1);
    const left = getRandomInt(areaWidth - 1);
    for (let i = 0; i < body.length; i++) {
      if (top !== body[i].top && left !== body[i].left) {
        setApple({ top, left });
        setCount(count + 1);
      }
    }
  }

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

    if (body[0].top === apple.top && body[0].left === apple.left) {
      eatApple();
      setbody([...body, body[1]]);
    }
    for (let i = 1; i < body.length; i++) {
      if (body[i].top === body[0].top && body[i].left === body[0].left) {
        alert("game over");
        window.location.reload();
      }
    }
  }, 1000 / body.length);
  return (
    <main className={`flex min-h-screen flex-col items-center  p-24`}>
      <div>score {count}</div>
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

        <div
          className="absolute rounded bg-slate-900"
          style={{
            top: apple.top * zoom,
            left: apple.left * zoom,
            width: zoom,
            height: zoom,
            background: "red",
          }}
        ></div>
      </div>
    </main>
  );
}
