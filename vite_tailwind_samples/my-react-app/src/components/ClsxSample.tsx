import { clsx } from "clsx";

const ClsxSample = ({ intent }: { intent: string }) => {
  return (
    <button
      className={clsx(" text-white", {
        "bg-blue-400": intent === "primary",
        "bg-red-400": intent === "danger",
      })}
    >
      Button
    </button>
  );
};

export default ClsxSample;
