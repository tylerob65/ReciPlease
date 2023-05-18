import { Box, Button, Container, Divider, Paper, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'

export default function EditRecipe() {

    const [instructionsList, setInstructionsList] = useState([""])

    // const addInstruction

    const showInstructionInputs = () => {

    }

    return (
        <Container>
            <br />
            <Box
                component="form"
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                }}
            >
                <Paper elevation={3} sx={{p:2}}>
                    <Typography variant="h4" mb={1}>Recipe Basics</Typography>
                    <TextField label="Recipe Title"
                        id="recipe-title"
                        fullWidth
                        required
                        sx={{
                            width: "md",
                            flexGrow: 1
                        }}
                    />
                    <br /><br />
                    
                    <TextField label="Image URL"
                        id="recipe-title"
                        required
                        fullWidth
                        sx={{
                            width: "md",
                            flexGrow: 1
                        }}
                    />

                    <Divider sx={{ my: 2 }} />
                    
                    <Typography variant="h4" mb={1}>Instructions</Typography>
                    
                    <Typography variant="h6" sx={{ mt: 1 }}>Step 1</Typography>
                    <TextField
                        label="Step 1 Instructions"
                        id="testmultiline1"
                        minRows={2}
                        multiline
                        fullWidth
                        sx={{my:1}}
                    />

                    <Typography variant="h6" sx={{mt:1}}>Step 2</Typography>
                    <TextField
                        label="Step 2 Instructions"
                        id="testmultiline2"
                        minRows={2}
                        multiline
                        fullWidth
                        sx={{ my: 1 }}
                    />
                    
                    <Typography variant="h6" sx={{ mt: 1 }}>Step 3</Typography>
                    <TextField
                        label="Step 3 Instructions"
                        id="testmultiline2"
                        minRows={2}
                        multiline
                        fullWidth
                        sx={{ my: 1 }}
                    />
                    <Box textAlign="center">
                    <Button>Add New Step</Button>
                    </Box>
                </Paper>
                

                <br />
                
                <br />

                <Typography>Instructions</Typography>
                <br />
                
                <br />
                <Typography>Step 2</Typography>
                <TextField
                    id="testmultiline2"
                    label="multiline"
                    minRows={2}
                    multiline
                />
                <br />
                <Typography>Step 3</Typography>
                <TextField
                    id="testmultiline3"
                    label="multiline"
                    minRows={2}
                    multiline
                />





                {/* </form> */}
            </Box>
        </Container>
    )
}
