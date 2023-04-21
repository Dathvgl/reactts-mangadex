import { useState } from "react";
import {
  AiOutlineBorder,
  AiOutlineCheck,
  AiOutlineClose,
} from "react-icons/ai";

function SpanBox(props: { base?: boolean; onChange?: (str: string) => void }) {
  const { base, onChange } = props;

  const str = ["include", "exclude", "none"];
  const icons = [
    <AiOutlineCheck color="green" strokeWidth="2rem" />,
    <AiOutlineClose color="red" strokeWidth="2rem" />,
    <AiOutlineBorder color="transparent" strokeWidth="2rem" />,
  ];

  const [state, setState] = useState(base ? 0 : 2);

  function onClick() {
    const index = state + 1 == icons.length ? 0 : state + 1;
    setState(() => index);
    onChange?.(str[index]);
  }

  return (
    <>
      <button className="p-1 border border-black rounded" onClick={onClick}>
        {icons[state]}
      </button>
    </>
  );
}

export default SpanBox;
