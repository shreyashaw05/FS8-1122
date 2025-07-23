import axios from "axios"

export async function handleResolving(id:string){
console.log(id)
const response = await axios.patch(`/api/incidents/${id}/resolve`);
console.log(response.data.updatedIncident)
}