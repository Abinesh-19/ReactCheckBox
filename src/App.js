import Component1 from "./components/Component1"
// import Component2 from "./components/Component2"
const Location=[
    {StateName:"Maharashtra",
        Districts:[
            {DistrictName:"Vardha1"},
            {DistrictName:"Vardha2"},
            {DistrictName:"Vardha3"},
            {DistrictName:"Vardha4"},
            {DistrictName:"Vardha5"},
            {DistrictName:"Vardha6"},
            {DistrictName:"Vardha7"},
            {DistrictName:"Vardha8"},
            {DistrictName:"Vardha9"},
        ],
    },
      {StateName:"TamilNadu",
        Districts:[
            {DistrictName:"Chennai"},
            {DistrictName:"tiruvallur"},
            {DistrictName:"Kanchipuram"},
            {DistrictName:"Chengalpattu"},
            {DistrictName:"Karur"},
            {DistrictName:"Madurai"},
            {DistrictName:"Tirunelveli"},
            {DistrictName:"Theni"},
            {DistrictName:"Coimbatore"},
        ],
    },
      {StateName:"karnataka",
        Districts:[
            {DistrictName:"Bengaluru1"},
            {DistrictName:"Bengaluru2"},
            {DistrictName:"Bengaluru3"},
            {DistrictName:"Bengaluru4"},
            {DistrictName:"Bengaluru5"},
            {DistrictName:"Bengaluru6"},
            {DistrictName:"Bengaluru7"},
            {DistrictName:"Bengaluru8"},
            {DistrictName:"Bengaluru9"},
        ],
    },
]
function App() {
  return ( 
        <div>

          <Component1 Location={Location}/>
          {/* <Component2 Location={Location}/> */}
        </div>
  )
}

export default App