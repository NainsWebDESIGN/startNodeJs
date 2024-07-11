const usersModel = require("../../models/usersModel");

exports.form = (status, data) => {
    return {
        success: status,
        data: data
    }
}

exports.verify = req => {
    const status = usersModel.Profile(req);

    switch (status) {
        case "未登入":
            return this.form(false, { message: "未登入" });
        case "驗證錯誤":
            return this.form(false, { message: "驗證錯誤" });
        default:
            return this.form(true, { message: "成功", status });
    }
}