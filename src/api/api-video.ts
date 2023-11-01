import { Ouitube } from "ouitube";

const ouitube: any = new Ouitube(
    process.env.REACT_APP_CLIENTID || "",
    process.env.REACT_APP_CLIENTSECRET || "",
)

export const getVideos = async (page = 1, limit = 5) => {
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
export const searchVideos = async (tag:string, page = 1, limit = 5) => {
    if(!tag){
        return await getVideos(page,limit)
    }
    try {

        const data = await ouitube.request({
            url: "/video/search",
            method: "GET",
            query: [
                {
                    name: "name",
                    value: tag
                },
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
export const addVideos = async (formData: FormData, setProgress: (value: any) => void = (progress: any) => { console.log({ progress }); }) => {
    try {
        const response = await ouitube.request({
            method: "POST",
            data: formData,
            callback: setProgress
        })


        return response

    } catch (error) {
        // Gérez les erreurs réseau ici
        console.log('Network error.');
        console.log({ error });

        return {
            isSuccess: false,
            error
        }
    }
}
export const updateVideos = async (uniqueCode: string, formData: any, setProgress: (value: any) => void = (progress: any) => { console.log({ progress }); }) => {
    try {
        const response = await ouitube.request({
            url: "/video/" + uniqueCode,
            method: "PUT",
            data: formData,
            callback: setProgress
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
export const deleteVideo = async (uniqueCode: string) => {
    try {
        const response = await ouitube.request({
            url: "/video/" + uniqueCode,
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