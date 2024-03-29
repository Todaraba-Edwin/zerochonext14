import React from "react";
import SearchForm from "../_component/SearchForm";
import Trend from "../_component/Trend";
import style from './explore.module.css';

export default function page() {
  return (
    <main className={style.main}>
      <div className={style.formZone}>
        <SearchForm />
      </div>
      <div className={style.trend}>
        <h3>나를 위한 트렌드</h3>
        {Array.from({length:10}).map((_,idx) => <Trend key={idx}/>)}
      </div>
    </main>
  );
}
