import { useCallback, useState } from "react";

const useInput = (type: string) => {
  const [value, setValue] = useState<string>("");
  const [isValidating, setIsValidating] = useState<boolean>(false);

  const validateValue = useCallback(() => {
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const urlRegex = /^http(|s):\/\/.+/;

    if (
      (type === "required" && !!!value.trim()) ||
      (type === "url" && !urlRegex.test(value)) ||
      (type === "email" && !emailRegex.test(value)) ||
      (type === "password" && value.length < 6)
    ) {
      return false;
    } else {
      return true;
    }
  }, [type, value]);

  const isValid = validateValue();
  const messageMap: { [key: string]: string } = {
    required: "*入力が必須の項目です。",
    url: "*有効なURLを入力してください。",
    email: "*有効なメールアドレスを入力してください。",
    password: "*6文字以上のパスワードを入力してください。",
  };
  const message = messageMap[type];

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value);
      validateValue();
    },
    [validateValue]
  );

  const handleBlur = useCallback(() => {
    const isEntered = !!value.trim();
    isEntered && setIsValidating(true);
  }, [value]);

  const reset = useCallback(() => {
    setValue("");
    setIsValidating(false);
  }, []);

  return {
    value,
    isValidating,
    isValid,
    message,

    setValue,
    handleChange,
    handleBlur,
    reset,
  };
};

export default useInput;
