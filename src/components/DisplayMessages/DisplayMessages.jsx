import { useEffect } from "react";

export function DisplayMessages({ writeGlobalState, readGlobalState }) {
  const { displayMessages, removedFromBoard } = readGlobalState;
  const { setDisplayMessages } = writeGlobalState;

  useEffect(() => {
    if (removedFromBoard.length === 12) {
      setDisplayMessages("Well done. All tiles matched!");
    }
  }, [removedFromBoard]);

  return (
    <div className="mt-9 text-3xl rotate-vert-center text-green-500">
      <h2 role="dialog">{displayMessages}</h2>
    </div>
  );
}
