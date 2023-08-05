export const checkPhoneNumber = (garbageValue, value) => {

    // Sử dụng biểu thức chính quy để kiểm tra định dạng số điện thoại
    const phoneRegex = /^[0-9]{10}$/;

    if (!phoneRegex.test(value)) {
        // Trả về Promise bị từ chối nếu không hợp lệ
        return Promise.reject('Vui Lòng Nhập Số Điện Thoại 10 Số');
    }

    return Promise.resolve();
}