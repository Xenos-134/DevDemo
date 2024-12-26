//JoyUI elements
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import Divider from '@mui/joy/Divider';

//Local imports
import ThemeAPI from "../API/ThemeAPI";
import logo from '../phone.png';

import {
    useState, 
    useEffect,
} from "react";

export default function AssetCardComponent({asset_param}) {
    //UseState section
    const [asset, setAsset] = useState(null);


    //UseEffect section
    useEffect(()=>{
        if(asset_param) {
            setAsset(asset_param)
        };
    },[]); 


    if(!asset) return;
    return (
        <div 
            style={{
                minWidth: "200px",
            }}
            class="card">
    <div class="card-img">
        <div class="img">
            <AspectRatio 
                    ratio="1"
                    style={{
                        width: "11vw",
                        minWidth: "200px",
                        borderRadius: "5px"
                    }}
                    >
                    <img
                        src={`http://localhost:3001/${asset.image}`}
                        alt=""
                    />
                </AspectRatio>
        </div>
    </div>
    <Typography level="body-sm">{asset.phone.name}</Typography>
    <Divider />
    <div class="card-footer">
        <Typography level="body-xm">${asset.price}</Typography>
    </div>
</div>
    );
}