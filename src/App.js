import {useEffect, useState} from "react";
import axios from "axios";
import data from "./data/export_full.xml";
import XMLParser from "react-xml-parser/xmlParser";
import Preloader from "./components/Preloader";

function App() {
  const [state, setState] = useState([]);
  const [loader, setLoader] = useState(false)

  useEffect(
    () => axios
      .get(data, {"Content-Type": "application/xml; charset=utf-8"})
      .then((res) => {
        const jsonDataFromXml = new XMLParser().parseFromString(res.data);
        setState(jsonDataFromXml.getElementsByTagName('item'));
        setLoader(true)
      }),
    []
  );

  return (
    <div className='App'>
      {
        loader
          ?
          (
            <>
              <h1>Total: {state.length}</h1>
              <ul className="collection with-header">
                {state.slice(0, 50).map(e => {
                  return <li className="collection-item" key={e.attributes.code}>
                    <div>{e.attributes.name}
                      <div href="#!" className="secondary-content">
                        <div>{e.attributes.czk} CZK</div>
                      </div>
                    </div>
                  </li>
                })}
              </ul>
            </>
          )
          :
          (
            <>
              <h1>Loading...</h1>
              <Preloader/>
            </>
          )
      }
    </div>
  );
}

export default App;
