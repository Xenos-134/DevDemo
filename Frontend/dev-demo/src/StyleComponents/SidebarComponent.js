//React components
import {
    useState,
    ChangeEvent,
    useEffect
} from "react";

//Joy UI Components
import Typography from '@mui/joy/Typography';
import Divider from  '@mui/joy/Divider';
import Slider, { sliderClasses } from '@mui/joy/Slider';
import Checkbox from '@mui/joy/Checkbox';
import Accordion from '@mui/joy/Accordion';
import AccordionDetails from '@mui/joy/AccordionDetails';
import AccordionGroup from '@mui/joy/AccordionGroup';
import AccordionSummary from '@mui/joy/AccordionSummary';
import Close from '@mui/icons-material/Close';

//Local Imports
import Asset from "../Enteties/Asset";
import Brand from "../Enteties/Brand";
import Model from "../Enteties/Model";



const FILTER_STATE = {
    EMPTY: 1,
    SELECTED: 2,
    FILTERED: 3,
}

export default function SidebarComponent({filterFunction}) {
    const [value, setValue] = useState([0, 1000]);
    const [modelList, setModelList] = useState(new Array());
    const [brandList, setBrandList] = useState(new Array());

    //Test Section
    useEffect(() => {
        let bl = new Array();
        bl.push(new Brand(1, "Samsung"));
        bl.push(new Brand(2, "IPhone"));
        bl.push(new Brand(4, "Xiaomi"));
        bl.push(new Brand(3, "Nokia"));
        let bl1 = new Array();
        bl.forEach(e => bl1.push({
            ...e,
            checked: FILTER_STATE.EMPTY
        }));
        setBrandList(bl1);

        let ml = new Array();
        ml.push(new Model(1, "S22", 1));
        ml.push(new Model(2, "15", 2));
        ml.push(new Model(3, "5302", 3));
        let ml1 = new Array();
        ml.forEach(e => {
            ml1.push({
                ...e,
                checked: FILTER_STATE.EMPTY
            });
        });

        setModelList(ml1);
    }, []);


    function changePriceFilter(event, newValue) {
        filterFunction("price", e => {
            return e.price >= newValue[0] && e.price <= newValue[1];
        });
        setValue(newValue); 
      };

    function handleBrandChange(event, target) {
        let brand = brandList.find(brand => brand.id == target.id);
        let newBrandList = brandList.map(brand => {
            if(brand.id == target.id) {
                if(brand.checked == FILTER_STATE.EMPTY) {
                    brand.checked = FILTER_STATE.SELECTED;
                } else if (brand.checked == FILTER_STATE.SELECTED) {
                    brand.checked = FILTER_STATE.FILTERED;
                } else {
                    brand.checked = FILTER_STATE.EMPTY;
                }
            }
            return brand;
        });

        setBrandList(newBrandList);

        if(brand.checked == FILTER_STATE.SELECTED) {
            filterFunction(`brand_${target.name}`, e => {
                return e.phone.brand_id == target.id;
            });
        } else if (brand.checked == FILTER_STATE.FILTERED) {
            filterFunction(`brand_${target.name}`, e => {
                return e.phone.brand_id != target.id;
            });
        } else {
            filterFunction(`brand_${target.name}`, null);
        }
    }

    function handleModelChange(event, target) {
        let model = modelList.find(model => model.id == target.id);
        let newModelList = modelList.map(model => {
            if(model.id == target.id) {
                if(model.checked == FILTER_STATE.EMPTY) {
                    model.checked = FILTER_STATE.SELECTED;
                } else if (model.checked == FILTER_STATE.SELECTED) {
                    model.checked = FILTER_STATE.FILTERED;
                } else {
                    model.checked = FILTER_STATE.EMPTY;
                }
            }
            return model;
        });

        setModelList(newModelList);

        if(model.checked == FILTER_STATE.SELECTED) {
            filterFunction(`model_${target.name}`, e => {
                return e.phone.model_id == target.id;
            });
        } else if (model.checked == FILTER_STATE.FILTERED) {
            filterFunction(`model_${target.name}`, e => {
                return e.phone.model_id != target.id;
            });
        } else {
            filterFunction(`model_${target.name}`, null);
        }
    }

    return (
        <div
            style={{
                padding: "1vw"
            }}
        >
            <div
                style={{
                    display: "flex",
                    justifyContent:"center"
                }}
            >
                <Typography 
                        level="body-md" 
                        fontWeight="lg" 
                    >
                    Filter
                </Typography>
            </div>
            <Divider orientation="horizontal" />
            <div>
            <Typography 
                    level="body-md" 
                    fontWeight="lg" 
                >
                Price
            </Typography>
            {/* Phone Price Filter */}
            <Slider
                color="neutral" 
                variant="solid" 
                getAriaLabel={() => 'Phone price'}
                value={value}
                max={1000}
                onChange={changePriceFilter}
                valueLabelDisplay="auto"
                />
            </div>
            <Divider orientation="horizontal" />
            
            {/* Phone Brnad Filter */}
            <div style={{
                display: "flex",
                flexDirection: "column",
                gap: "1vh"
            }}>
                <Typography 
                        level="body-md" 
                        fontWeight="lg" 
                    >
                    Brand
                </Typography>

                {
                    brandList.slice(0, 2).map((brand => {
                        return (
                            <Checkbox
                                key={brand.id}
                                label={brand.name}
                                variant="soft" 
                                indeterminate={brand.checked == FILTER_STATE.FILTERED}
                                indeterminateIcon={<Close/>}
                                color="neutral"
                                checked={brand.checked == FILTER_STATE.SELECTED}
                                onChange={e => handleBrandChange(e, brand)}
                            />
                        )
                    }))
                }
                <AccordionGroup>
                    <Accordion>
                        <AccordionSummary>More</AccordionSummary>
                        <AccordionDetails>
                        {
                            brandList.slice(2, brandList.size).map(brand => {
                                return (
                                    <Checkbox
                                        label={brand.name}
                                        variant="soft" 
                                        color="neutral"
                                        indeterminate={brand.checked == FILTER_STATE.FILTERED}
                                        indeterminateIcon={<Close/>}
                                        checked={brand.checked == FILTER_STATE.SELECTED}
                                        onChange={e => handleBrandChange(e, brand)}
                                        sx={{paddingTop: "0.5vh"}}
                                    />
                                );
                            })
                        }
                        </AccordionDetails>
                    </Accordion>
                </AccordionGroup>
            </div>
            <Divider orientation="horizontal" />

            {/* Phone model filter */}
            <div style={{
                display: "flex",
                flexDirection: "column",
                gap: "1vh"
            }}>
                <Typography 
                        level="body-md" 
                        fontWeight="lg" 
                    >
                    Model
                </Typography>

                {
                    modelList.slice(0, 2).map(model => {
                        return (
                            <Checkbox
                                key={model.id}
                                label={model.name}
                                variant="soft" 
                                color="neutral"
                                indeterminate={model.checked == FILTER_STATE.FILTERED}
                                indeterminateIcon={<Close/>}
                                checked={model.checked == FILTER_STATE.SELECTED}
                                onChange={e=>handleModelChange(e, model)}
                        /> 
                        )
                    })
                }

                <AccordionGroup>
                    <Accordion>
                        <AccordionSummary>More</AccordionSummary>
                        <AccordionDetails>
                        {
                            modelList.slice(2, modelList.size).map(model => {
                                return (
                                    <Checkbox
                                        key={model.id}
                                        label={model.name}
                                        variant="soft" 
                                        color="neutral"
                                        indeterminate={model.checked == FILTER_STATE.FILTERED}
                                        indeterminateIcon={<Close/>}
                                        checked={model.checked == FILTER_STATE.SELECTED}
                                        onChange={e => handleModelChange(e, model)}
                                        sx={{paddingTop: "0.5vh"}}
                                /> 
                                )
                            })
                        }
                        </AccordionDetails>
                    </Accordion>
                </AccordionGroup>
            </div>
        </div>
    )
}