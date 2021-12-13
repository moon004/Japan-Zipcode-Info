import { useState } from "react";
import "./App.css";
import { useAxios, ZipCodeRes } from "./api/hooks/useAxios";
import { useEffect } from "react";
import Table from "./components/table/Table";
import TextField from "./components/forms/TextField/TextField";
import { useInput } from "./components/forms/hooks/input";
import { REG_3_NUMBERS, REG_4_NUMBERS } from "src/commons/constant";
import { BounceLoader } from "react-spinners";
import { css } from "@emotion/react";

const loaderStyle = css`
  margin-left: 1rem;
`;

function App() {
  const [loading, setLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<ZipCodeRes>({} as ZipCodeRes);
  const [error, setError] = useState<string>("");
  const { fetchData } = useAxios({ setLoading, setResponse, setError });
  const firstZip = useInput({
    initValue: "",
    regexp: REG_3_NUMBERS,
  });
  const secondZip = useInput({
    initValue: "",
    regexp: REG_4_NUMBERS,
  });

  useEffect(() => {
    console.log("fetchData", firstZip.value, secondZip.value);
    const zipCode = "" + firstZip.value + secondZip.value;
    if (zipCode.length === 7) {
      (async () => {
        await fetchData(zipCode);
        if (response) {
          console.log("response ", response);
        }
        console.log("error ", error); // do error check then display
      })();
    }
  }, [firstZip.value, secondZip.value]);

  return (
    <div className="App">
      <div className="main__div">
        <div className="textField__div">
          <span style={{ color: "#D42020" }}>〒</span>
          <TextField
            type="number"
            placeholder="079"
            inputHook={firstZip}
            style={{ width: "4rem" }}
          />
          <span>—</span>
          <TextField type="number" placeholder="0177" inputHook={secondZip} />
          <BounceLoader
            loading={loading}
            size={25}
            css={loaderStyle}
            color="red"
            speedMultiplier={5}
          />
        </div>
        <div className="output__div">
          <span className="output__span--error">{"" + error}</span>
          <Table results={response.results} />
        </div>
      </div>
    </div>
  );
}

export default App;
