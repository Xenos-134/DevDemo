//React import
import {
  useState,
  useEffect,
} from "react";

//Local Components
import HeaderComponent from "../StyleComponents/HeaderComponent";
import AssetCardComponent from "../StyleComponents/AssetCardComponent";
import ThemeAPI from "../API/ThemeAPI";
import SidebarComponent from "../StyleComponents/SidebarComponent";

//Local Imports
import Phone from "../Enteties/Phone";
import Asset from "../Enteties/Asset";
import Brand from "../Enteties/Brand";
import Model from "../Enteties/Model";

//Joy UI Components
import Typography from '@mui/joy/Typography';
import FooterComponent from "../StyleComponents/FooterComponent";
import RequestAPI from "../API/RequestAPI";


export default function ShopAllPage() {  
    //UseState section
    const [assetList, setAssetList] = useState(new Array());
    const [displayedAssetList, setDisplayedAssetList] = useState(new Array());
    const [searchCondition, setSearchCondition] = useState({});

    //UseEffect Section
    useEffect(()=>{
      loadAssetList();
    },[]);

    async function loadAssetList () {
      let assets = await RequestAPI.getAssets();
      console.log(assets);
      setDisplayedAssetList(assets);
      setAssetList(assets);
    }

    /**
     * Filter doisplyed assets.
     * @param {field} String - Filter property (price, brand, model ...)
     * @param {filterCondition} function - Function that receives asset object an return true or false.
     * @returns {void}
     */
    function filterPhones(field, filterCondtion) {
      let assetListCopy =  new Array();
      let filteredData = {};
      let searchConditionCopy = {...searchCondition};
      searchConditionCopy[field] = filterCondtion;

      Object.keys(searchConditionCopy).forEach(key => {
        if(searchConditionCopy[key]) filteredData[key.split("_")[0]] = new Array();
      });


      for (const [key, fc] of Object.entries(searchConditionCopy)) {
        if(fc) filteredData[key.split("_")[0]].push(...assetList.filter(asset => fc(asset))); 
        else delete searchConditionCopy[key];
      }

      if(Object.keys(searchConditionCopy).length == 0) assetListCopy = [...assetList];
      else assetListCopy = Object.values(filteredData).reduce((a, b) => b.filter(Set.prototype.has, new Set(a)));

      setSearchCondition(searchConditionCopy);
      setDisplayedAssetList([...new Set(assetListCopy)]);
    }

    return (
      <div style={{
        height: "100%", 
        width: "100%",
        backgroundColor: ThemeAPI.theme.PAGE.background_color
        }}>

        {/* Header*/}
        <div style={{ 
          height: "7%",
          }} >
          <HeaderComponent/>
        </div>

        {/* Body*/}
        <div style={{
          height: "80%",
          }}>
          <div
            style={{paddingTop: "5vh", paddingLeft: "5vw"}}
          >
            <Typography level="h2">
                Shop All Products
            </Typography>
          </div>
          {/* Sidebard */}
          <div style={{
            display: "flex"
          }}>
            <div style={{
              width: "15%"
            }}>
              <SidebarComponent 
                filterFunction={filterPhones}
              />
            </div>
            {/* Main Body */}
            <div style={{
              width: "100%"
              }}>
              {/* Images */}
              <div style={{
                flex: 1,
                rowGap: "10px",
                columnGap: "5%",
                display: "flex", 
                flexWrap: "wrap"
                }}>
                {
                  displayedAssetList.map((asset)=>
                    <AssetCardComponent
                      key={asset.id}
                      asset_param={asset}
                    />
                  )
                }
              </div>
            </div>
          </div>
        </div>

        <FooterComponent/>
      </div>
    );
  }