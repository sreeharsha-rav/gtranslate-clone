/* eslint-disable react-hooks/exhaustive-deps */
import TextPanel from "../TextPanel";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import {
  sourceTextAtom,
  canTranslateAtom,
  translateAtom,
} from "../../atoms/translation";
import { useEffect, useCallback } from "react";
import { debounce } from "lodash-es";

const TranslationInput = () => {
  const [sourceText, setSourceText] = useAtom(sourceTextAtom);
  const canTranslate = useAtomValue(canTranslateAtom);
  const translate = useSetAtom(translateAtom);

  const debouncedTranslate = useCallback(
    debounce(() => {
      console.log("Translating...");
      translate();
    }, 500),
    [translate]
  );

  useEffect(() => {
    if (!canTranslate) return;
    debouncedTranslate();

    return () => {
      debouncedTranslate.cancel();
    };
  }, [sourceText, canTranslate, debouncedTranslate]);

  return (
    <TextPanel
      value={sourceText}
      onChange={(e) => setSourceText(e.target.value)}
      isReadOnly={false}
    />
  );
};

export default TranslationInput;
