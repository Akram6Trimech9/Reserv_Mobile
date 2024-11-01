
export const formatDate = (rawDate)=>{ 
    let date = new Date(rawDate)
    let year = date.getFullYear();
    let month = date.getMonth()+1;
    let day= date.getDay()
    return `${year}-${month}-${day}`
}