//JoyUI imports
import SearchIcon from '@mui/icons-material/Search';
import Input from '@mui/joy/Input'; 

export default function SearchCombonent() {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
            }}
        >
            <Input 
                variant="soft"
                placeholder={"Search phone"}
                sx={{
                    borderWidth: "0",
                    height: "80%",
                    width: "100%",
                    borderRadius: "25px"
                }}
                endDecorator={<SearchIcon />}
            />
        </div>
    )
}