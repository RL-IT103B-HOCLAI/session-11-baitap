# README

Giải thích lỗi

`if (updatedData.isActive)`: bỏ qua giá trị `false` vì `false` là Falsy\.

`if (updatedData.powerWatts)`: bỏ qua giá trị `0` vì `0` là Falsy\.

`updatedData.isActive !== undefined`: kiểm tra thuộc tính có được truyền giá trị hay không, nên `false` vẫn được chấp nhận\.

`updatedData.powerWatts !== undefined`: tương tự, giá trị `0` vẫn được cập nhật\.

Bảng Test Cases trong `README.md`

Bạn có thể chép bảng sau vào README:



