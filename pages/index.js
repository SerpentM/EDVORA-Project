/* eslint-disable */
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Product from "../Components/Product";
import { useState, useEffect } from "react";
export default function Home() {
  const [appData, setAppData] = useState([]);
  const [productList, setproductList] = useState([]);
  const [cityState, setCityState] = useState({ state: [], city: [] });
  const [filter, setFilter] = useState({ prod: "", state: "", city: "" });
  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    await fetch("https://assessment-edvora.herokuapp.com").then((res) => {
      res.json().then((data) => {
        setAppData(data);
        console.log(data);
        const prodArray = data.map((obj) => {
          return obj.product_name;
        });
        const stateArray = data.map((obj) => {
          return obj.address.state;
        });
        const cityArray = data.map((obj) => {
          return obj.address.city;
        });
        const unique = [...new Set(prodArray)];
        const unique2 = [...new Set(stateArray)];
        const unique3 = [...new Set(cityArray)];
        setproductList(unique);
        setCityState({ state: unique2, city: unique3 });
      });
    });
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>Edvora React Project</title>
        <meta name="description" content="Created By Prashant Mishra" />
      </Head>
      <main className={styles.main}>
        <div className="gridContainer">
          <div className="menuContainer">
            <div className="filters">
              <div style={{ marginBottom: "40px" }}>
                <p style={{ opacity: "0.5", marginBottom: "0px" }}>Filters</p>
                <hr></hr>
              </div>
              <div>
                <select
                  className="dropDown"
                  id="productFilter"
                  onChange={(e) => {
                    setFilter({ ...filter, prod: e.target.value });
                  }}
                >
                  <option value="" selected>
                    Product
                  </option>
                  {productList.map((obj) => {
                    return <option>{obj}</option>;
                  })}
                </select>
                <select
                  className="dropDown"
                  id="stateFilter"
                  onChange={(e) => {
                    setFilter({ ...filter, state: e.target.value });
                  }}
                >
                  <option value="" selected>
                    State
                  </option>
                  {cityState.state.map((obj) => {
                    return <option>{obj}</option>;
                  })}
                </select>
                <select
                  className="dropDown"
                  id="cityFilter"
                  disabled
                  onChange={(e) => {
                    setFilter({ ...filter, city: e.target.value });
                  }}
                >
                  <option disabled selected>
                    City
                  </option>
                  {cityState.city.map((obj) => {
                    return <option>{obj}</option>;
                  })}
                </select>
              </div>
            </div>
          </div>
          <div
            className="prodContainer"
            style={{ marginTop: "0px", paddingTop: "0px" }}
          >
            <h1 style={{ marginTop: "0px" }}>Edvora</h1>
            <h3 style={{ opacity: "0.5" }}>Products</h3>
            {productList
              .filter((obj) => {
                if (obj === filter.prod) {
                  return obj;
                }
                if (filter.prod === "") {
                  return obj;
                }
              })
              .map((obj) => {
                const productData = appData.filter((item) => {
                  if (item.product_name === obj) {
                    return item;
                  }
                });
                return (
                  <Product
                    productName={obj}
                    productData={productData}
                    filter={filter}
                  ></Product>
                );
              })}
          </div>
        </div>
      </main>
    </div>
  );
}
