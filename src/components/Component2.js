import React, { useRef, useState, useEffect } from "react";
import "./Component2.css";
import CaretRight from "./CaretRight.png";

function Component2({
  Location,
  setSelectionShow,
  handleFrontShow,
  handleDelete,
  setCheckedList,
  checkedList,
  stateWiseSelected,
  setFrontShow,
}) {
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState([]);
  const [showUp, setShowUp] = useState(false);
  const selectAllRef = useRef(null);

  const currentSelectChecked = checkedList.filter((values) =>
    selectedDistrict.find((item) => item.DistrictName === values)
  );

  useEffect(() => {
    if (selectAllRef.current) {
      selectAllRef.current.indeterminate =
        currentSelectChecked.length > 0 &&
        currentSelectChecked.length < selectedDistrict.length;
    }
  }, [currentSelectChecked.length, selectedDistrict.length]);

  const handleSelectDistrict = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;
    if (isChecked) {
      setCheckedList((prev) => [...prev, value]);
    } else {
      setCheckedList((prev) => prev.filter((item) => item !== value));
    }
  };

  const getStateStatus = (state) => {
  let count = 0;
  state.Districts.forEach((d) => {
    if (checkedList.includes(d.DistrictName)) {
      count++;
    }
  });
  return {
    checked: count === state.Districts.length,
    indeterminate: count > 0 && count < state.Districts.length,
  };
};


  const handleSelectState = (e) => {
    const stateName = e.target.value;
    setSelectedState(stateName);

    const getState = Location.find((item) => item.StateName === stateName);
    setSelectedDistrict(getState ? getState.Districts : []);
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setCheckedList((prev) => {
        const newOnes = selectedDistrict
          .map((item) => item.DistrictName)
          .filter((value) => !prev.includes(value));

        return [...prev, ...newOnes];
      });
    } else {
      setCheckedList((prev) =>
        prev.filter(
          (value) =>
            !selectedDistrict.find((item) => item.DistrictName === value)
        )
      );
    }
  };

  const handleShow = () => {
    setShowUp(true);
  };
  const handleHide = () => {
    setShowUp(false);
  };

  const handleClose = () => {
    setSelectionShow(false);
  };

  return (
    <div className="whole-container">
      <div className="header-box1">
        <p>Select State and District</p>
      </div>
      <div className="header-box">
        <div className="header-item">
          {stateWiseSelected.length} States / {checkedList.length} Districts
        </div>
        <div>
          <button onClick={handleShow} className="show-btn">
            Show
          </button>
        </div>
      </div>
      {showUp && (
        <div className="first-box">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div className="header-item">
              {stateWiseSelected.length} States / {checkedList.length} Districts
            </div>
            <div>
              <buttton onClick={handleHide} className="hide-btn">
                Hide
              </buttton>
            </div>
          </div>
          <div className="header-shows">
            {stateWiseSelected.map((item) => (
              <div key={item.stateName} className="header-content">
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
        </div>
      )}

      <div className="main-content">
        <div className="container">
          <div className="statebox">States({stateWiseSelected.length})</div>
         {Location.map((item) => {
  const stateStatus = getStateStatus(item);
  return (
    <div key={item.StateName} className="state-items">
      <input
        type="checkbox"
        className="greenCheckbox"
        value={item.StateName}
        checked={stateStatus.checked}
        ref={(el) => {
          if (el) {
            el.indeterminate = stateStatus.indeterminate;
          }
        }}
        onChange={handleSelectState}
      />
      <label className="state-label">{item.StateName}</label>
      <div className="state-list">
        {
          item.Districts.filter((item) =>
            checkedList.includes(item.DistrictName)
          ).length
        }
        /{item.Districts.length}
      </div>

      <div className="state-last">
        <img src={CaretRight} alt="loading..." />
      </div>
    </div>
  );
})}

        </div>
        <div className="container-active">
          <div className="content">
            <div style={{ display: "flex", gap: "24px" }}>
              {selectedDistrict.length > 0 && (
                <div className="header_content" key={selectedState}>
                  <div className="district-box">
                    Districts({checkedList.length})
                  </div>
                  <div
                    style={{ display: "flex", gap: "16px", color: "#30333B" }}
                  >
                    <input
                      type="checkbox"
                      className="greenCheckbox"
                      ref={selectAllRef}
                      onChange={handleSelectAll}
                      checked={
                        currentSelectChecked.length === selectedDistrict.length
                      }
                    />
                    <label> Select All</label>
                  </div>
                </div>
              )}
            </div>

            <div className="items-box">
              {selectedDistrict.map((item) => (
                <div key={item.DistrictName} className="items">
                  <input
                    type="checkbox"
                    value={item.DistrictName}
                    className="greenCheckbox"
                    onChange={handleSelectDistrict}
                    checked={checkedList.includes(item.DistrictName)}
                  />
                  <label>{item.DistrictName}</label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="footer">
        <div className="footer-btn">
          <button className="apply-btn" onClick={handleFrontShow}>
            Apply
          </button>
          <button className="close-btn" onClick={handleClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default Component2;
