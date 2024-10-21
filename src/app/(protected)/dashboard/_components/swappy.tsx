"use client";

import { useEffect } from "react";
import { createSwapy } from "swapy";

const DEFAULT = {
  "1": "a",
  "3": "c",
  "4": "d",
  "2": null,
};

function A() {
  return (
    <div className="item a" data-swapy-item="a">
      <div className="handle" data-swapy-handle></div>
      <div className="w-20 h-20 bg-red-500 p-6 m-4 flex">A</div>
    </div>
  );
}

function C() {
  return (
    <div className="item c" data-swapy-item="c">
      <div className="w-20 h-20 bg-blue-500 p-6 m-4 flex">C</div>
    </div>
  );
}

function D() {
  return (
    <div className="item d" data-swapy-item="d">
      <div className="w-20 h-20 bg-purple-500 p-6 m-4 flex">D</div>
    </div>
  );
}

function getItemById(itemId: "a" | "c" | "d" | null) {
  switch (itemId) {
    case "a":
      return <A />;
    case "c":
      return <C />;
    case "d":
      return <D />;
  }
}

export const Swappy = () => {
  const slotItems: Record<string, "a" | "c" | "d" | null> =
    localStorage.getItem("slotItem")
      ? JSON.parse(localStorage.getItem("slotItem")!)
      : DEFAULT;

  useEffect(() => {
    const container = document.querySelector(".container")!;
    const swapy = createSwapy(container, {
      swapMode: "hover",
    });
    swapy.onSwap(({ data }) => {
      console.log("swap", data);
      localStorage.setItem("slotItem", JSON.stringify(data.object));
    });

    swapy.onSwapEnd(({ data, hasChanged }) => {
      console.log(hasChanged);
      console.log("end", data);
    });

    swapy.onSwapStart(() => {
      console.log("start");
    });

    return () => {
      swapy.destroy();
    };
  }, []);

  return (
    <>
      <div className="container flex w-[70vw">
        <div className="slot a" data-swapy-slot="1">
          {getItemById(slotItems["1"])}
        </div>
        <div className="second-row">
          <div className="slot b" data-swapy-slot="2">
            {getItemById(slotItems["2"])}
          </div>
          <div className="slot c" data-swapy-slot="3">
            {getItemById(slotItems["3"])}
          </div>
        </div>
        <div className="slot d" data-swapy-slot="4">
          {getItemById(slotItems["4"])}
        </div>
      </div>
    </>
  );
};
