import axios from "axios";

export async function getUnresolvedIncidents (){
    console.log("here")
    const response = await axios.get("/api/incidents?resolved=false");
    if(response.status != 200)
    {
        // handle error
        console.log("rmvmkadvcm")
    }
    console.log("unresoleved", response.data)
    return response.data.unresolvedIncidents
}