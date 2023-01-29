
export default function HandleResponse({res, status, data, message}: any){
    return res.status(status).json({
        message,
        ...data
    })
}