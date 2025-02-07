import TextPanel from "../TextPanel";
import { useAtomValue } from "jotai";
import { targetTextAtom } from "../../atoms/translation";

const TranslationOutput = () => {
  const targetText = useAtomValue(targetTextAtom);

  return (
    <TextPanel
      value={targetText}
      onChange={() => {
        console.log("Translation output is read-only");
      }}
      isReadOnly={true}
    />
  );
};

export default TranslationOutput;
