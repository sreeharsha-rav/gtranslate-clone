import { Repeat } from "lucide-react";
import { sourceLanguageAtom, targetLanguageAtom } from "../../atoms/index";
import { sourceTextAtom, targetTextAtom } from "../../atoms/translation";
import { useAtom } from "jotai";

export const SwapButton = () => {
  const [sourceLanguage, setSourceLanguage] = useAtom(sourceLanguageAtom);
  const [targetLanguage, setTargetLanguage] = useAtom(targetLanguageAtom);
  const [sourceText, setSourceText] = useAtom(sourceTextAtom);
  const [targetText, setTargetText] = useAtom(targetTextAtom);

  const handleSwap = () => {
    // swap languages
    const tempLanguage = sourceLanguage;
    setSourceLanguage(targetLanguage);
    setTargetLanguage(tempLanguage);

    // swap texts
    if (sourceText || targetText) {
      const tempText = sourceText;
      setSourceText(targetText);
      setTargetText(tempText);
    }
  };

  return (
    <button
      onClick={handleSwap}
      className="btn btn-circle btn-soft btn-xs"
      aria-label="Swap languages"
    >
      <Repeat size={16} />
    </button>
  );
};

export default SwapButton;
