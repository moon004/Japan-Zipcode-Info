import { Results } from "src/api/hooks/useAxios";
import styles from "./Table.module.css";

interface TableProps {
  results: Results[] | null;
}

const Table = (p: TableProps) => {
  let results;
  if (p.results) {
    results = p.results!.map((r) => (
      <tr className={styles.mainBodyRow}>
        <tr>
          <td>zipcode</td>
          <td>{r.zipcode}</td>
        </tr>
        <tr>
          <td>address1</td>
          <td>{r.address1}</td>
        </tr>
        <tr>
          <td>address2</td>
          <td>{r.address2}</td>
        </tr>
        <tr>
          <td>address3</td>
          <td>{r.address3}</td>
        </tr>
        <tr>
          <td>kana1</td>
          <td>{r.kana1}</td>
        </tr>
        <tr>
          <td>kana2</td>
          <td>{r.kana2}</td>
        </tr>
        <tr>
          <td>kana3</td>
          <td>{r.kana3}</td>
        </tr>
        <tr>
          <td>prefcode</td>
          <td>{r.prefcode}</td>
        </tr>
      </tr>
    ));
  }

  return (
    <table>
      {results ? <tbody>{results}</tbody> : "郵便番号を入れてください"}
    </table>
  );
};

export default Table;
