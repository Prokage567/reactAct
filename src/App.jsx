import React, { useEffect, useState } from 'react'
import { Box, Button, OutlinedInput, Typography } from '@mui/material';
import "./index.css"
import "./App.css"


function App() {
  

const [idCount, setIdCount] = useState(4);
  const [Identity, setIdentity] = useState([
    {
      id: "1",
      name: "jello",
      age: "27"
    },
    {
      id: "2",
      name: "chalrs",
      age: "22"
    },
    {
      id: "3",
      name: "elahe",
      age: "21"
    },
  ]
)
  
  useEffect(() => {
    const i = localStorage.getItem("Identity")
    if (i) {
      setIdentity(JSON.parse(i))
    }
    console.log(i)
  }, [])

  const create = (e) => {
    e.preventDefault()
    setIdCount(idCount)
    const name = document.getElementById("NameInt").value
    const age = document.getElementById("AgeInt").value
    const tempIdentity = [...Identity, {
      id: +idCount,
      name,
      age
    }]
    setIdentity(tempIdentity);
    localStorage.setItem("Identity", JSON.stringify(tempIdentity));
    clear()
    console.log(tempIdentity)
    const i = tempIdentity.length+1
    setIdCount(i)
  }

  const clear = () => {
    document.getElementById("NameInt").value = ""
    document.getElementById("AgeInt").value = ""
  }
    


  return (
    <><Box sx={{ display: "flex", alignContent: "center", justifyContent: "center"}}>
      <Typography variant='h6' gutterBottom sx={{ fontFamily: "Bn", textAlign: "center", border: "1px solid black", borderRadius: "10px", boxShadow: "1px 1px 5px 1px", height: "100px", width: "100vw", lineHeight: "100px", fontSize: "90px", paddingTop: "5px" , background:"rgb(38,38,155,24)"}}>
        Identities
      </Typography>
    </Box>
      <Typography sx={{ fontFamily: "KO", textAlign: "center", paddingLeft: "" }}>
        Please input your details
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
        <Box sx={{ paddingRight: "25px"}}>
          <form   onSubmit={create}>
            <label>Name:</label>
            <OutlinedInput autoFocus required id="NameInt" sx={{ height: "25px", background:"rgb(14,119,221,50)" }}></OutlinedInput><br></br>
            <label style={{ paddingLeft: "11px" }}>Age:</label>
            <OutlinedInput required id="AgeInt" sx={{ height: "25px", background:"rgb(14,119,221,50)" }}></OutlinedInput>
            <input sx={{color:"white", background:"grey", height:"20px"}} type="submit"/>
          </form>
        </Box>
      </Box>
      <Box sx={{
        display: "flex", justifyContent: "center", alignContent: "center", gap: "5px", padding: "25px",
        flexWrap: "wrap"
      }}>
        {Identity.map(id => (
          <Box id={id.id} key={id.id} sx={{ border: "1px solid black", borderRadius: "10px", padding: "5px 25px 25px 2px", fontFamily: "KO", fontSize: "10px", background:"#2b2b93",width:"200px", height:"100px",textAlign:"center"}}>
       
            <Box sx={{ color: "grey"}}>
                Id: {id.id}
              </Box>
              <Box sx={{color:"white"}}>
                Name: {id.name}
              </Box>
              <Box sx={{color:"white"}}>
                Age: {id.age}
              </Box>
             
          </Box>)
        )}
      </Box>
    </>
  )
}

export default App