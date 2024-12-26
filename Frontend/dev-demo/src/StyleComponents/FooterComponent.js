//Joy ui imports
import Typography from '@mui/joy/Typography';
import AspectRatio from '@mui/joy/AspectRatio';
import Link from '@mui/joy/Link';


//Local imports
import ThemeAPI from '../API/ThemeAPI';
import logo from '../ringmaster.png';

export default function FooterComponent() {

    return (
        <div style={{
            width: "100%",
            height: "15vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
            backgroundColor: ThemeAPI.theme.PAGE.footer_background_color
        }}>
            <div style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: "10vw"
            }}>
                <AspectRatio 
                    onDragStart={e => e.preventDefault()}
                    sx={{ width: "2vw", height: "2vw" }}
                    ratio="1"
                    >
                    <img
                        src={logo}
                        alt="Logo"
                    />
                </AspectRatio>
                <Typography level="body-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Typography>
            </div>


            <div style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: "10vw"
            }}>
                <Typography level="body-md">Contact us</Typography>
                <Typography level="body-sm">E: test@mail.com <br/>P: +351 960000000 <br/>A: Almada</Typography>
            </div>

            <div style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: "10vw"
            }}>
                <Link color="neutral" underline="always">
                    <Typography level="body-md">Usefull links</Typography>
                </Link>
                <Link color="neutral" underline="always" href={"/"}>
                    <Typography level="body-sm">Home</Typography>
                </Link>
                <Link color="neutral" underline="always" href={"/shop_all"}>
                    <Typography level="body-sm">Shop all</Typography>
                </Link>
            </div>
        </div>
    )
}