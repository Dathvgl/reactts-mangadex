import { useState } from "react";

function ItemFollow() {
  const [state, setState] = useState(false);

  function onFollow() {
    setState(() => !state);
  }

  return (
    <button
      className={`px-2 py-1 rounded-lg font-semibold ${
        state
          ? "bg-red-300  hover:bg-red-500"
          : "bg-green-300  hover:bg-green-500"
      } hover:bg-opacity-70`}
      onClick={onFollow}
    >
      {state ? "Followed" : "Follow"}
    </button>
  );
}

export default ItemFollow;
