export default function getCurrentTime() {
    const today = new Date();
    var hours = today.getHours(); 
    var minutes = today.getMinutes();
    var apm;

    if (hours >= 12) {
        apm = 'PM';
        hours -= 12;
    }
    else
        apm = 'AM';    
    
    return (hours + ':' + minutes + ' ' + apm);
}