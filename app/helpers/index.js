
module.exports = class Helper {
	time(){
		return Math.floor(new Date().getTime() / 1000)
	}
	currentTime(){
		const today = new Date()
		return today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()+' '+today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
	}
	fileName(type){
		const crypto = require('crypto');
		const shasum = crypto.createHash('sha1');
		shasum.update(`${crypto.randomBytes(10).toString('hex')}.${this.time()}`);
		return `${shasum.digest('hex')}.${type}`
	}
	async deleteFile(file){
		const fs = require('fs')
		await fs.unlink(file, function (err) {
			if(err){
				return false
			}else{
				return true
			}
		}); 
	}
}