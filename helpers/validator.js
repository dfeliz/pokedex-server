

exports.validateUser = (data) => {
    if (data.user_name && data.user_lastname && data.user_birthdate && data.user_city && data.user_email && data.user_username && data.user_password) {
        return true;
    }
    return false;
}