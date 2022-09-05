class CustomErrorHandler extends Error {
    constructor(status, msg) {
        super()
        this.msg = msg
        this.status = status
    }
    static alreadyExist(msg = 'already exist') {
        this.status = 409
        this.msg = msg
        return new CustomErrorHandler(this.status, this.msg)
    }
    static notFound(msg = 'not found') {
        this.status = 409
        this.msg = msg
        return new CustomErrorHandler(this.status, this.msg)
    }
    static unauthorized(msg = 'unauthorized !') {
        this.status = 401
        this.msg = msg
        return new CustomErrorHandler(this.status, this.msg)
    }
}
module.exports = CustomErrorHandler