
class Validation {
    static emailCheck(email) {
        return email.match(/^[a-z0-9\.]{1,}@[a-z0-9]{1,}\.[a-z0-9]{2,10}$/);
    }
}

export default Validation;