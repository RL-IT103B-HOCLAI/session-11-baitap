# README

Bảng so sánh Trade\-off

2\. Ví dụ về Hoisting

A\. Function Declaration

Có thể gọi hàm trước khi viết phần khai báo\.


sayHello\(\);

function sayHello\(\) \{
    console\.log\("Xin chào Smart Home"\);
\}

Kết quả Console:

Xin chào Smart Home

Giải thích: JavaScript đưa khai báo hàm lên đầu phạm vi xử lý, nên có thể gọi hàm trước vị trí khai báo\.

B\. Function Expression


sayHello\(\);

const sayHello = function\(\) \{
    console\.log\("Xin chào Smart Home"\);
\};

Kết quả: chương trình báo lỗi vì `sayHello` chưa được khởi tạo tại thời điểm gọi\.

C\. Arrow Function


sayHello\(\);

const sayHello = \(\) =\> \{
    console\.log\("Xin chào Smart Home"\);
\};

Kết quả: cũng báo lỗi vì biến `sayHello` khai báo bằng `const` chưa được khởi tạo\.

Lưu ý: Function Expression và Arrow Function không phải hoàn toàn không có hoisting\. Biến được khai báo vẫn có cơ chế hoisting, nhưng biến `const` không thể được sử dụng trước khi khởi tạo\.

3\. So sánh `this` và `arguments`

Ví dụ về `this`


const device = \{
    name: "Điều hòa",

    showName: function\(\) \{
        console\.log\(this\.name\);
    \}
\};

device\.showName\(\);

Kết quả:

Điều hòa

Nếu viết `showName` bằng Arrow Function, `this` sẽ kế thừa từ phạm vi bên ngoài, không tự trỏ đến đối tượng `device`\.

Ví dụ về `arguments`


function showValues\(\) \{
    console\.log\(arguments\[0\]\);
    console\.log\(arguments\[1\]\);
\}

showValues\("Điều hòa", 1500\);

Kết quả:

Điều hòa
1500

Arrow Function không có đối tượng `arguments` riêng\. Khi cần nhận nhiều tham số, có thể dùng cú pháp `...args`, nhưng với bài tập cơ bản, nên ưu tiên khai báo tham số rõ ràng\.

4\. Quy chuẩn viết hàm cho dự án Smart Home IoT

Đề xuất quy chuẩn chung:

Ưu tiên Arrow Function cho các hàm CRUD như `createDevice()`, `readDevicesByRoom()`, `updateDevice()` và `deleteDevice()`\.

Dùng `const` để khai báo các hàm Arrow Function nhằm tránh gán lại biến hàm ngoài ý muốn\.

Dùng tên hàm theo `camelCase`, ví dụ `createDevice`, `validateDevice`\.

Luôn kiểm tra dữ liệu đầu vào và ID trước khi cập nhật hoặc xóa thiết bị\.

Chỉ dùng Function Declaration khi dự án thực sự cần khả năng gọi hàm trước vị trí khai báo\.

Dùng Function Expression khi cần biểu thức hàm truyền thống, chẳng hạn cần `this` hoặc `arguments` theo cách hoạt động của hàm thường\.

Ví dụ theo quy chuẩn đề xuất:


const createDevice = \(devices, newDevice\) =\> \{
    if \(\!newDevice\.name \|\| \!newDevice\.room \|\| newDevice\.powerWatts \<= 0\) \{
        return false;
    \}

    devices\.push\(newDevice\);
    return true;
\};

const readDevicesByRoom = \(devices, roomName\) =\> \{
    return devices\.filter\(device =\> device\.room === roomName\);
\};



