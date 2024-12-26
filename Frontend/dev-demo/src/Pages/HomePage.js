//React imports
import {
    useState,
    useRef
} from "react";

//Joy ui imports
import Typography from '@mui/joy/Typography';
import HeaderComponent from "../StyleComponents/HeaderComponent";
import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SavingsIcon from '@mui/icons-material/Savings';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';


//Local imports
import ThemeAPI from '../API/ThemeAPI';
import { useEffect } from 'react';
import Phone from "../Enteties/Phone";
import Asset from "../Enteties/Asset";
import AssetCardComponent from '../StyleComponents/AssetCardComponent';
import FooterComponent from "../StyleComponents/FooterComponent";
import RequestAPI from "../API/RequestAPI";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
    const [assetList, setAssetList] = useState(new Array());
    const navigate = useNavigate();

    useEffect(()=>{
        //Initialize three js component
        //ThreeJsApi.init('shader_div');
        loadAssetList();
    },[]);
    

    async function loadAssetList () {
        let assets = await RequestAPI.getAssets();
        console.log(assets);
        setAssetList(assets);
    }

    return (
        <div style={{
            height: "100%",
            backgroundColor: ThemeAPI.theme.PAGE.background_color
        }}>
            <HeaderComponent/>
            <div
                style={{
                    flex: 1,
                    width: "100%",
                    height: "60%",
                    display: "flex",
                }}
            >
                <div style={{
                    width: "40%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "start",
                    flexDirection: "column",
                    padding: "10%"
                }}>
                    <Typography level="h2" sx={{fontSize: "3em"}}>Ringmaster</Typography>
                    <Typography level="h1" sx={{fontSize: "5em", color: "#F42D2D"}}>New and Used Phones</Typography>
                    <Button
                        sx={{
                            backgroundColor:ThemeAPI.theme.COLOR.danger, 
                            color: "#FFFFFF",
                            height: "5vh",
                            borderRadius: "0.7vw",
                        }}
                        color="danger"
                        onClick={function(){}}
                        variant="soft"
                    >
                        
                        <Typography 
                            onClick={() => navigate("/shop_all")}
                            level="title-lg" 
                            sx={{
                                color: "#FFFFFF"
                            }}>Shop All!</Typography>
                    </Button>
                </div>
                <div 
                    id='shader_div'
                    style={{
                        alignItems: "center",
                        justifyContent: "center",
                        width: "60%",
                        height: "100%"
                }}/>
            </div>
            <div style={{
                height: "40%",
                display: "flex",
                paddingInline: "5%",
                flexDirection: "column"
            }}>
                <div style={{
                    display: "flex",
                    gap: "1vw",
                    flexWrap: "wrap"
                }}>
                {
                    assetList.slice(0, 4).map(asset =>  {
                        return(
                            <AssetCardComponent
                                key={asset.id}
                                asset_param={asset}
                            />
                        )
                    })
                }
                </div>
            </div>

            {/* Quote section */}
            <div style={{
                height: "30vh",
                marginBottom: "10vh"
            }}>
                <div style={{
                    display: "flex",
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    marginBottom: "10vh"
                }}>
                   
                        <div style={{
                            width: "20px",
                            height: "5vh",
                            backgroundColor: "red",
                            borderRadius: "1vh",
                            marginBottom: "2vh"
                        }}>
                        </div>
                        <Typography>About us</Typography>
                </div>
                <div style={{
                    display: "flex",
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center"
                }}>
                    <Typography 
                        level="h4" 
                        sx={{
                            color: "#D62828"
                            }}>
                        Sell your used phones in minutes<br/>
                        Buy from thousands of verified sellers<br/>
                        Satisfaction guaranteed
                    </Typography>
                </div>
            </div>

            {/* Why chose us section */}
            <div style={{
                height: "30vh",
            }}>
                <div style={{
                    display: "flex",
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    marginBottom: "10vh"
                }}>
                   
                        <div style={{
                            width: "20px",
                            height: "5vh",
                            backgroundColor: "red",
                            borderRadius: "1vh",
                            marginBottom: "2vh"
                        }}>
                        </div>
                        <Typography>Why chose us</Typography>
                </div>
                <div style={{
                    display: "flex",
                    width: "100%",
                    alignItems: "center",
                    textAlign: "center",
                    justifyContent: "space-evenly",
                    marginBottom: "10vh"
                }}>
                   
                   {/* Fast delivery section*/}
                   <div style={{
                    width: "15vw"
                   }}>
                        <LocalShippingIcon
                            style={{
                                fontSize: "3em"
                            }}
                        />
                        <Typography level="title-lg">Fast delivery</Typography>
                        <Typography level="body-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Typography>
                   </div>

                   {/* Cheap price delivery section*/}
                   <div style={{
                    width: "15vw"
                   }}>
                        <SavingsIcon
                            style={{
                                fontSize: "3em"
                            }}
                        />
                        <Typography level="title-lg">Cheap price</Typography>
                        <Typography level="body-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Typography>
                   </div>

                   {/*  delivery section*/}
                   <div style={{
                    width: "15vw"
                   }}>
                        <WorkspacePremiumIcon
                            style={{
                                fontSize: "3em"
                            }}
                        />
                        <Typography level="title-lg">Guaranteed quality</Typography>
                        <Typography level="body-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Typography>
                   </div>
                </div>
                
                <FooterComponent/>
            </div>
        </div>
    )
}