const birthDateSplit = (date) => {
    if(date) {
        return date.slice(0,10).split('-').join('.');
    } else {
        return ''
    }
    
}
export default birthDateSplit;