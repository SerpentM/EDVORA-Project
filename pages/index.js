/* eslint-disable */
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Product from "../Components/Product";
import { useState, useEffect } from "react";
export default function Home() {
  const [appData, setAppData] = useState([]);
  const [productList, setproductList] = useState([]);
  const [objectList, setObjectList] = useState([]);
  const [filteredObjectList, setFilteredObjectList] = useState([]);
  const [cityState, setCityState] = useState({ state: [], city: [] });
  const [filter, setFilter] = useState({ prod: "", state: "", city: "" });
  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    await fetch("https://assessment-edvora.herokuapp.com").then((res) => {
      res.json().then((data) => {
        setAppData(data);
        const prodArray = data.map((obj) => {
          return obj.product_name;
        });
        const prodObject = data.map((obj) => {
          return { productName: obj.product_name, address: obj.address };
        });
        const unique = [...new Set(prodArray)];
        // const unique2 = [...new Set(stateArray)];
        // const unique3 = [...new Set(cityArray)];
        setproductList(unique);
        setObjectList(prodObject);
        // setCityState({ state: unique2, city: unique3 });
      });
    });
  }
  function filterStatesChange(e) {
    const arr = objectList.filter((obj) => {
      if (e.target.value === obj.productName) {
        return obj;
      }
    });
    setFilteredObjectList(arr);
    const stateArray = arr.map((obj) => {
      return obj.address.state;
    });
    const uniqueState = [...new Set(stateArray)];
    setCityState({ state: uniqueState, city: [] });
  }
  function filterCitiesChange(e) {
    const arr = filteredObjectList.filter((obj) => {
      if (e.target.value === obj.address.state) {
        return obj;
      }
    });
    const cityArray = arr.map((obj) => {
      return obj.address.city;
    });
    const uniqueCity = [...new Set(cityArray)];
    setCityState({ ...cityState, city: uniqueCity });
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
                  value={filter.prod}
                  onChange={(e) => {
                    if (filter.city !== "" && filter.state !== "") {
                      setFilter({ ...filter, city: "", state: "" });
                    }
                    setFilter({ prod: e.target.value, state: "", city: "" });
                    filterStatesChange(e);
                    console.log(filter);
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
                  value={filter.state}
                  onChange={(e) => {
                    setFilter({ ...filter, state: e.target.value, city: "" });
                    filterCitiesChange(e);
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
                  value={filter.city}
                  onChange={(e) => {
                    setFilter({ ...filter, city: e.target.value });
                  }}
                >
                  <option selected>City</option>
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
