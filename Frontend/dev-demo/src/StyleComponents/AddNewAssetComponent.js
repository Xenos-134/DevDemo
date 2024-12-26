//Joy UI imports
import Modal from '@mui/joy/Modal';
import Button from '@mui/joy/Button';
import ModalClose from '@mui/joy/ModalClose';
import ModalDialog from '@mui/joy/ModalDialog';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import Select from '@mui/joy/Select';
import Divider from '@mui/joy/Divider';
import Option from '@mui/joy/Option';
import Input from '@mui/joy/Input';
import { Textarea } from '@mui/joy';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { NumericFormat } from 'react-number-format';
import PropTypes from 'prop-types';


//React imports
import { useEffect, useState, forwardRef } from 'react';
import RequestAPI from '../API/RequestAPI';
import Asset from '../Enteties/Asset';
import Phone from '../Enteties/Phone';
import ThemeAPI from '../API/ThemeAPI';



export default function AddNewAssetComponent({open, setModalOpenState}) {
    const [assetList, setAssetList] = useState(new Array());
    const [modelList, setModelList] = useState(new Array());
    const [brandList, setBrandList] = useState(new Array());
    const [phoneList, setPhoneList] = useState(new Array());
    const [newAsset, setNewAsset] = useState(new Asset());
    
    useEffect(()=>{
        loadData();
        let assetCopy = newAsset;
        assetCopy.phone = new Phone();
        setNewAsset(assetCopy);
    },[]);

    async function loadData() {
        setBrandList(await RequestAPI.getBrands());
        setModelList(await RequestAPI.getModels());
        setPhoneList(await RequestAPI.getPhones());
        setAssetList(await RequestAPI.getAssets());
    }

    async function createNewAsset(params) {
        let response = await RequestAPI.postNewAsset(newAsset);
        setModalOpenState(false);
    }

    function modifyAsset(field, value) {
        console.log(field, value);
        let assetCopy = newAsset;

        switch (field) {
            case "price":
            case "image":
            case "description":
                assetCopy[field] = value; 
                break;
            default:
                assetCopy.phone[field] = value;
        }
        console.log(assetCopy);
        setNewAsset(assetCopy);
    }

    return (
        <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        onClose={() => setModalOpenState(false)}
        sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center' }}
      >
        <Sheet
          variant="outlined"
          sx={{ 
            maxWidth: 500, 
            borderRadius: 'md', 
            p: 3, 
            boxShadow: 'lg',
        }}
        >
          <ModalClose variant="plain" sx={{ m: 1 }} />
          <Typography
            component="h2"
            id="modal-title"
            level="h4"
            textColor="inherit"
            sx={{ fontWeight: 'lg', mb: 1 }}
          >
            Sell your Phone
          </Typography>
          {/* Brand selector */}
          <Typography id="modal-desc" textColor="text.tertiary">
            Brand:
          </Typography>
            <Select
                onChange={(e, newValue)=>modifyAsset("brand_id", newValue)}
                style={{
                    marginBottom: "2vh",
                }} 
                placeholder="Choose brand...">
                {
                    brandList.map( brand => {
                        return (
                            <Option value={brand.id}>{brand.name}</Option>
                        )
                    })
                }
            </Select>

          {/* Model selector */}
          <Typography id="modal-desc" textColor="text.tertiary">
            Model:
          </Typography>
          <Select
                onChange={(e, newValue)=>modifyAsset("model_id", newValue)}
                style={{
                    marginBottom: "2vh",
                }} 
                placeholder="Choose model...">
                {
                    modelList.map( model => {
                        return (
                            <Option value={model.id}>{model.name}</Option>
                        )
                    })
                }
            </Select>

          {/* Phone selector */}
          <Typography id="modal-desc" textColor="text.tertiary">
            Version:
          </Typography>
          <Select
                onChange={(e, newValue)=>modifyAsset("id", newValue)}
                style={{
                    marginBottom: "2vh",
                }} 
                placeholder="Choose version...">
                {
                    phoneList.map( phone => {
                        return (
                            <Option value={phone.id}>{phone.name}</Option>
                        )
                    })
                }
            </Select>

            {/* Price selector */}
            <Typography id="modal-desc" textColor="text.tertiary">
                        Price:
            </Typography>
            <Input
                style={{
                    marginBottom: "2vh"
                }}
                onChange={(e)=>modifyAsset("price", e.target.value)}
                placeholder="Choose price..."
                slotProps={{
                input: {
                    component: NumericFormatAdapter,
                },
                }}
            />
        <Typography id="modal-desc" textColor="text.tertiary">
            Description:
        </Typography>
        <Textarea
            style={{
                marginBottom: "2vh"
            }}
            onChange={(e)=>modifyAsset("description", e.target.value)}
            minRows={2} />
          <div>
     <label onChange={e=>modifyAsset("image", e.target.files[0])} htmlFor="formId">
         <input name="" type="file" id="formId" hidden />
         <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "4vh",
            gap: "1vw",
            backgroundColor: ThemeAPI.theme.COLOR.secondary,
            color: "white",
            cursor : 'pointer',
            borderRadius: "2vw",
            marginBottom: "2vh"
         }}>
                <CloudUploadIcon/>
                <p>Upload image</p>
                </div>
            </label>
        </div>
        <Divider orientation="horizontal" style={{marginBottom: "2vh"}}/>
        <Button 
            onClick={createNewAsset}
            style={{
                width: "100%",
                borderRadius: "2vw",
                height: "2vh"
        }}>
            Post
         </Button>
        </Sheet>
      </Modal>
    )
}



const NumericFormatAdapter = forwardRef(
    function NumericFormatAdapter(props, ref) {
      const { onChange, ...other } = props;
  
      return (
        <NumericFormat
          {...other}
          getInputRef={ref}
          onValueChange={(values) => {
            onChange({
              target: {
                name: props.name,
                value: values.value,
              },
            });
          }}
          thousandSeparator
          valueIsNumericString
          prefix="€"
        />
      );
    },
  );

  NumericFormatAdapter.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  };