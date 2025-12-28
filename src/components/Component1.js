import "./Component1.css";
import React, { useState } from 'react'
import Component2 from "./Component2";
import info from"./info.png"
function Component1({Location}) {
const [selectionShow,setSelectionShow] = useState(false);
  const [frontShow,setFrontShow] = useState(false);
    const [checkedList, setCheckedList] = useState([]);
    const [isChecked, setIsChecked] = useState(false);
const handleSelection = (e) => {
  const checked = e.target.checked;
  setIsChecked(checked);

  if (!checked) {
    setSelectionShow(false);
    setFrontShow(false);
    setCheckedList([]);
  }
};
     const handleFrontShow=()=>{
      if(checkedList.length===0){
        setFrontShow(false);
        setSelectionShow(false);
      }
      else{
        setFrontShow(true);
        setSelectionShow(false);
      }
  }
    const handleDelete = (districtName) => {    
        setCheckedList((prev) => prev.filter((item) => item !== districtName));

  };
    const stateWiseSelected = Location.map((state) => {
    const selected = state.Districts.map((d) => d.DistrictName).filter((d) =>
      checkedList.includes(d)
    );
    return {
      stateName: state.StateName,
      districts: selected,
    };
  }).filter((item) => item.districts.length > 0);

  const handleModify=()=>{
      setSelectionShow(true);
  }
 const handleButtonSelection = () => {
  if (!isChecked) return; 
  setSelectionShow(true); 
};


  return (
    
    <>
    <div className="first-box1">
     <div className="header">
        <div className="header-content1">   
       <input type="checkbox" className="greenCheckbox"  checked={isChecked} onChange={handleSelection} />
       <label className="header-label">Geographical</label>
        </div>
     </div>
     <div className="body-box">
      <div className="body-text">Inclusion</div>
      {frontShow ?( <div className="first-box2">
          <div style={{ display: "flex",gap:"8px",alignItems:"center" }}>
              <button className="modify-btn" onClick={handleModify}>Modify Selection</button>
            <div className="header-item">
              {stateWiseSelected.length} States / {checkedList.length} Districts
            </div>
          </div>
          <div className="header-shows">
            {stateWiseSelected.map((item) => (
              <div key={item.stateName} className="header-container">
                <h3 className="top-box1">{item.stateName}</h3>
                {item.districts.map((d) => (
                  <div key={d} className="top-box">
                    <div className="top-box-inner1">{d}</div>
                    <div className="top-box-btn">
                      <button className="btn" onClick={() => handleDelete(d)}>
                        x
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div style={{display:"flex",gap:"10px"}}>
            <img src={info} alt="loading" className="info"/>
            <div className="frontbox-text">Loans in the pool from the above States and Districts chosen will be shortlisted
</div> 
          </div>
        </div>):( 
          <div className="body-content">
      <div className="body-btn"><button
  className={isChecked ? "Selection-btn1" : "Selection-btn2"}
  onClick={handleButtonSelection}
    disabled={!isChecked}
>
  Selected states
</button>
      </div>
      <div className="content-text">All are selected unless specified</div>
     </div>
          
    )}
     </div>
    </div>
    {selectionShow && (
  <>
    <div className="bg-overlay" />
    <Component2
      Location={Location}
      setSelectionShow={setSelectionShow}
      handleFrontShow={handleFrontShow}
      handleDelete={handleDelete}
      checkedList={checkedList}
      setCheckedList={setCheckedList}
      stateWiseSelected={stateWiseSelected}
      setFrontShow={setFrontShow}
    />
  </>
)}
    </>
  ) 
}

export default Component1