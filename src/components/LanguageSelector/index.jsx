import languages from "../../data/languages.json";
import {
  sourceLanguageAtom,
  targetLanguageAtom,
} from "../../atoms/translation";
import { useAtom } from "jotai";
import LanguageDropdown from "./LanguageDropdown";
import SwapButton from "./SwapButton";
import { useMemo } from "react";

const LanguageSelector = () => {
  const [sourceLanguage, setSourceLanguage] = useAtom(sourceLanguageAtom);
  const [targetLanguage, setTargetLanguage] = useAtom(targetLanguageAtom);

  const availableSourceLanguages = useMemo(() => {
    return languages.filter((lang) => lang.code !== targetLanguage.code);
  }, [targetLanguage.code]);

  const availableTargetLanguages = useMemo(() => {
    return languages.filter((lang) => lang.code !== sourceLanguage.code);
  }, [sourceLanguage.code]);

  return (
    <div className="flex items-center justify-center gap-2 px-4 mb-4">
      <LanguageDropdown
        languages={availableSourceLanguages}
        selected={sourceLanguage}
        onSelect={setSourceLanguage}
        label="Select source language"
      />
      <SwapButton />
      <LanguageDropdown
        languages={availableTargetLanguages}
        selected={targetLanguage}
        onSelect={setTargetLanguage}
        label="Select target language"
      />
    </div>
  );
};

export default LanguageSelector;
