
module.exports = class Helper {
	time(){
		return Math.floor(new Date().getTime() / 1000)
	}
	currentTime(){
		const today = new Date()
		return today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()+' '+today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
	}
	fileName(type){
		return `${String.fromCharCode(Math.floor(Math.random() * 1000000)) + new Date().getTime()}.${type}`
	}
}