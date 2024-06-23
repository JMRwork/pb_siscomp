import { Button } from "@mui/material";

export default function ButtonComp(props) {
    return (
        <Button {...props}>{props.children}</Button>
    );
}