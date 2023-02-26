import {Container, Divider, FormControl, Grid, List, OutlinedInput} from "@mui/material";
import Button from "react-bootstrap/Button";

const MessageTextField = () => {
    return (
        <div>
            <Container>
                <Divider/>
                <Grid container spacing={6} alignItems="center">
                    <Grid id="chat-window" xs={12} item>
                        <List id="chat-window-messages">
                        </List>
                    </Grid>
                    <Grid id="chat-window" xs={12} item>
                        <List id="chat-window-messages">
                        </List>
                    </Grid>
                    <Grid xs={9} item>
                        <FormControl fullWidth>
                            <OutlinedInput
                                id="message"
                                placeholder="Send a message"
                                inputProps={{
                                    'aria-label': 'message',
                                    'style': {color: 'var(--font-color)'}
                                }}
                                sx={{
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        border: 'none',
                                    },
                                    '&:hover .MuiOutlinedInput-notchedOutline': {
                                        border: 'none',
                                    },

                                    backgroundColor: 'var(--theme-fourth)',
                                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.2)'
                                }}
                            />
                        </FormControl>
                    </Grid>
                    <Grid xs={1} item>
                        <Button variant="contained"
                                style={{
                                    backgroundColor: 'var(--theme-primary)',
                                    color: 'var(--font-color)',
                                    padding: '1rem',
                                    width: '100px'
                                }}
                                size='large'
                        >
                            Send
                        </Button>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}


export default MessageTextField;
