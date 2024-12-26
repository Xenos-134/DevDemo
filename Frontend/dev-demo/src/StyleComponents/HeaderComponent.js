//React imports
import { useContext } from 'react';

//JoyUI components
import Typography from '@mui/joy/Typography';
import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';


//Local Imports
import SearchCombonent from './SearchComponent';
import logo from '../ringmaster.png';
import ThemeAPI from '../API/ThemeAPI';
import { NavigationContext, PAGES } from '../Context/NavigationContext';
import { useNavigate } from 'react-router-dom';

function HeaderBox({page, children, text, style, buttonAction}) {
    const navigationContext = useContext(NavigationContext)

    if(children) {
        return (
            <div style={{
                display: "flex",
                flex:"1",
                justifyContent: "center",
                alignItems:"center",
                ...style
            }}>
                <Typography 
                    style={{
                        color: page==navigationContext.currentPage?ThemeAPI.theme.COLOR.danger:ThemeAPI.theme.COLOR.primary
                    }}
                    level="title-md">{children}</Typography>
            </div>
        )
    }
    return (
        <div style={{
            display: "flex",
            flex:"1",
            justifyContent: "center",
            alignItems:"center",
            ...style
        }}>
            <Button 
                variant = {"plain"}
                color = "danger"
                    style={{
                        borderRadius: "1vw"
                    }}
                    onClick={()=> buttonAction(page)}
            >
                <Typography 
                    level="title-md"
                    style={{
                        color: page==navigationContext.currentPage?ThemeAPI.theme.COLOR.danger:ThemeAPI.theme.COLOR.primary
                    }}
                    >{text}</Typography>
            </Button>
        </div>
    )
}

export default function HeaderComponent() {
    const navigationContext = useContext(NavigationContext)
    const navigate = useNavigate();

    function navigateTo(destination) {
        navigationContext.currentPage = destination;

        switch(destination) {
        case PAGES.HOME_PAGE:
            navigate("/");
            return;
        case PAGES.SHOP_ALL_PAGE:
            navigate("/shop_all");
            return;
        case PAGES.ADD_NEW_PAGE:
            navigationContext.setModalOpenState(true);
            return;
        }
    }

    return (
        <div style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-evenly"
        }}>
            <HeaderBox 
                page={PAGES.HOME_PAGE} 
                text={"Home"} 
                buttonAction={navigateTo}/>
            <HeaderBox 
                page={PAGES.SHOP_ALL_PAGE} 
                text={"Shop All"}  
                buttonAction={navigateTo}/>
            <HeaderBox 
                page={PAGES.ADD_NEW_PAGE} 
                style={{
                    flex: "3",
                    padding: "10px",
                }}
                >
            <div style={{
                display: "flex",
                gap: "1vh",
                flex: "1",
                justifyContent: "center",
                alignItems:"center",
            }}>
                    <AspectRatio 
                        onDragStart={e => e.preventDefault()}
                        sx={{ 
                            width: "5vh",
                            userDrag: "none" 
                        }}
                        ratio="1"
                        >
                        <img
                            src={logo}
                            alt="Logo"
                        />
                    </AspectRatio>
                    <Typography level="title-lg">ringmaster</Typography>
                </div>
            </HeaderBox>
            <HeaderBox 
                page={PAGES.ADD_NEW_PAGE}
                buttonAction={navigateTo}
                text={"Add new"}
                />
            <HeaderBox
                style={{
                    flex: "2",
                }}
            >
                <SearchCombonent/>
            </HeaderBox>
        </div>
    )
}