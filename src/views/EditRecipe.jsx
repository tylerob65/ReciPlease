import { Box, Container, TextField, Typography } from '@mui/material'
import React, {useState} from 'react'

export default function EditRecipe() {

    const [instructionsList,setInstructionsList] = useState([""])

    // const addInstruction

    const showInstructionInputs = () => {
        
    }

    return (
        <Container>
            <br/>
            <Box
            component="form"            
            sx = {{
                display:"flex",
                flexDirection:"column",
                justifyContent:"center",
            }}
            >
            {/* <form style={{display:"flex",flexDirection:"column",justifyContent:"center"}}> */}
                <TextField
                    label="Recipe Title"
                    id="recipe-title"
                    required
                    sx={{
                        width:"md",
                        flexGrow:1
                    }}
                />

            <br/>
                <TextField
                    label="Image URL"
                    id="recipe-title"
                    required
                    sx={{
                        width: "md",
                        flexGrow: 1
                    }}
                />
            <br />

            <Typography>Instructions</Typography>
            <br />
            <Typography>Step 1</Typography>
            <TextField
            id="testmultiline"
            label="multiline"
            minRows={2}
            multiline
            />





            {/* </form> */}
            </Box>
        </Container>
    )
}
