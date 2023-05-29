import axios from "axios";
import { useEffect, useState } from "react";

function ISO6391(props: { str?: string }) {
  const str = props.str;

  const split = str?.split("-");
  const lang = split?.[0] ?? "";
  const extra = split?.[1] ?? "";
  const [state, setState] = useState("");

  useEffect(() => {
    init();
  }, []);

  async function init() {
    const res = await axios.get("/iso6391.json");

    if (res.status == 200 && str) {
      const data: { [key: string]: string } = res.data;
      if (data[extra]) {
        setState(() => data[extra].toLowerCase());
      } else if (data[str]) {
        setState(() => data[lang].toLowerCase());
      }
    }
  }

  if (!lang) return <></>;

  return (
    <>
      <span className={`fi fi-${state}`}></span>
    </>
  );
}

export default ISO6391;
