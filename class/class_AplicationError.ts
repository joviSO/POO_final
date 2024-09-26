
class AplicationError extends Error{
    constructor (message: string) {
        super(message);
    } 
}


class AppError extends AplicationError {
    constructor (message: string){
        super (message)
    }
}

export {AplicationError, AppError};