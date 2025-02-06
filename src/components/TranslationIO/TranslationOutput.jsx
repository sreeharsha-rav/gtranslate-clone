import TextPanel from "../TextPanel";
import { useAtomValue } from "jotai";
import { targetTextAtom, targetLanguageAtom } from "../../atoms/translation";

const TranslationOutput = () => {
  const targetText = useAtomValue(targetTextAtom);
  const targetLanguage = useAtomValue(targetLanguageAtom);

  return (
    <TextPanel
      value={targetText}
      onChange={() => {
        console.log("Translation output is read-only");
      }}
      language={targetLanguage}
      isReadOnly={true}
    />
  );
};

export default TranslationOutput;
