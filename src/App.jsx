import { Provider } from "jotai";
import LanguageSelector from "./components/LanguageSelector";
import TranslationInput from "./components/TranslationIO/TranslationInput";
import TranslationOutput from "./components/TranslationIO/TranslationOutput";
import VoiceInput from "./components/VoiceInput";

function App() {
  return (
    <>
      <Provider>
        <div className="container mx-auto p-4 max-w-xl min-w-[320px]">
          <div className="flex flex-col gap-6 mt-6">
            <TranslationInput />
            <div className="divider m-0" />
            <TranslationOutput />
          </div>

          <div className="flex flex-col mt-12 bg-base-100 border border-base-300 p-4 rounded-box">
            <LanguageSelector />
            <VoiceInput />
          </div>
        </div>
      </Provider>
    </>
  );
}

export default App;
