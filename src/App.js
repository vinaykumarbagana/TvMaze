import './App.css';
import React, { useState } from 'react';
import Movie from './components/Movie';

function App() {
  const [data, setData] = useState([]);
  const [searchData, setSearchData] = useState("");

    // Actor API: https://api.tvmaze.com/search/people?q=akon
  // Shows API: https://api.tvmaze.com/search/shows?q=friends

  const Actor = async () => {
    let url = "https://api.tvmaze.com/search/people?q=akon";
    let resp = await fetch(url);
    setData(await resp.json())
    let input = document.getElementById("inp");
    input.value = "";
  }

  const Show = async () => {
    let url = "https://api.tvmaze.com/search/shows?q=friends";
    let resp = await fetch(url);
    setData(await resp.json())
    let input = document.getElementById("inp");
    input.value = "";
  }

  function serch(e) {
    setSearchData(e.target.value);
  }

  return (
    <div className="App">
      <div className='top'>
        <div className='top-content'>
          <div className='container'>
            <div className='row text-white p-5'>
              <div className='col-md-12'>
                <h1>TvMaze</h1>
              </div>
              <div className='col-md-12'>
                <h2 id='h2'>Search your favourite show</h2>
              </div>

              <div className='col-md-12 col-sm-12 d-flex mt-xl-5 mt-lg-3 mt-md-2'>
                <div className='form-check'>
                  <input onClick={Actor} type="radio" className='form-check-input' id='flexboxRadioDefault1' name='flexboxRadioDefault' />
                  <label className='form-check-label ms-1' for="flexboxRadioDefault1">Actor</label>
                </div>
                <div className='form-check ms-4'>
                  <input onClick={Show} type="radio" className='form-check-input' id='flexboxRadioDefault2' name='flexboxRadioDefault' />
                  <label className='form-check-label ms-1' for="flexboxRadioDefault2">Show</label>
                </div>
              </div>

              <div className="col-md-12 col-sm-12 mt-2">
                <input onChange={serch} id='inp' className="form-control form-control-sm " type="text" placeholder="eg: Friends..." />
                <div id="error" className='text-warning'></div>
              </div>

            </div>
          </div>

        </div>

      </div>



      {
        searchData.length >= 1 ?
        data.map((ele, index)=>{
          
          let val = "";
          if (ele.person === undefined) {
            val = String(ele.show.name);
          }
          if (ele.show === undefined) {
            val = String(ele.person.name);
          }
          
          val = val.toLowerCase();
          if (searchData === val.substring(0, searchData.length)) {
            return <Movie val={ele} key={index} />;
          }
        }):null
      }
    </div>
  );
}

export default App;
