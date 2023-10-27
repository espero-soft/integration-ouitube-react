import { Ouitube } from "ouitube";

const ouitube: any = new  Ouitube(
    process.env.REACT_APP_CLIENTID || "",
    process.env.REACT_APP_CLIENTSECRET || "",
)

export const getVideos = async (page=1, limit=5) =>{
    try {
        
        const data = await ouitube.request({
            url: "/video",
            method: "GET",
            query: [
                {
                    name: "pageNumber",
                    value: page
                  },
                  {
                    name: "pageLimit",
                    value: limit
                  }
            ]
        })

        return data
        
    } catch (error) {
        return {
            isSuccess: false,
            error
        }
    }
}
export const addVideos = async (formData: FormData) =>{
    try {
        const response = await ouitube.request({
            method: "POST",
            data: formData,
            callback: (progress: any) =>{ console.log({progress});}
          })
       

          return await response.json()
        
    } catch (error) {
        // Gérez les erreurs réseau ici
        console.log('Network error.');
        return {
            isSuccess: false,
            error
        }
    }
}
export const updateVideos = async (uniqueCode: string,formData: any) =>{
    try {
        const response = await ouitube.request({
            url: "/video/"+uniqueCode,
            method: "PUT",
            data: formData,
            callback: (progress: any) =>{ console.log({progress});}
          })
       

          return await response.json()
        
    } catch (error) {
        // Gérez les erreurs réseau ici
        console.log('Network error.');
        return {
            isSuccess: false,
            error
        }
    }
}
export const deleteVideo = async (uniqueCode: string) =>{
    try {
        const response = await ouitube.request({
            url: "/video/"+uniqueCode,
            method: "DELETE"
        })
       

          return await response.json()
        
    } catch (error) {
        // Gérez les erreurs réseau ici
        console.log('Network error.');
        return {
            isSuccess: false,
            error
        }
    }
}