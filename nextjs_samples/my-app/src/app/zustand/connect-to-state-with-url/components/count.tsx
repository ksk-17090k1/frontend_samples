"use client";

import * as React from "react";
import { useStore } from "../store";

export const Count = () => {
  const count = useStore((state) => state.count);
  return <div>{count}</div>;
};
