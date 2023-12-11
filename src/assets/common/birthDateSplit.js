const birthDateSplit = (date) => {
    if(date) {
        return date.slice(0,10)
    } else {
        return ''
    }
    
}
export default birthDateSplit;