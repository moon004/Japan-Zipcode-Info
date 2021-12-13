import { SetStateAction, useState } from "react";

export interface InputHook {
  value: any;
  setValue: React.Dispatch<SetStateAction<any>>;
  errText: string;
  setErrText: React.Dispatch<SetStateAction<string>>;
  bind: {
    value: any;
    onChange: (e: React.FormEvent<HTMLInputElement>) => void;
  };
}

export interface UseInput {
  initValue: any;
  regexp?: RegExp;
}

export const useInput: (useInput: UseInput) => InputHook = (
  useInput: UseInput
) => {
  const [value, setValue] = useState(useInput.initValue);
  const [errText, setErrText] = useState("");

  return {
    value,
    setValue,
    errText,
    setErrText,
    bind: {
      value,
      onChange: (e: React.FormEvent<HTMLInputElement>) => {
        if (useInput.regexp && useInput.regexp!.test(e.currentTarget.value)) {
          return;
        }
        setValue(e.currentTarget.value);
      },
    },
  };
};
