<br />

### Brunoman - Ứng dụng mở để khám phá và kiểm thử API

Brunoman là bản phân phối (fork) từ Bruno, bổ sung nhiều cải tiến về UX và tính năng xuất dữ liệu.

Liên kết nhanh
- Trang chủ Bruno: https://www.usebruno.com
- Kho mã gốc: https://github.com/usebruno/bruno

## Điểm mới trong Brunoman

- Phân biệt rõ Collection và Folder trên sidebar
  - Collection hiển thị biểu tượng “collection”, Folder hiển thị biểu tượng “folder”.

- Cải tiến Export (cho cả Collection và Folder)
  - Collection: Export ra Bruno Collection, Postman Collection, Postman Collection + Environment(s), hoặc chỉ Environment(s).
  - Folder: có hộp thoại Export riêng với các lựa chọn tương tự. Khi export Folder → Postman, tự động kèm environment của collection cha.
  - Thêm exporter Environment cho Postman, tạo file `.postman_environment.json` (1 hoặc nhiều file) có thể import trực tiếp vào Postman.

- Độ tương thích Export Postman
  - Xuất cả variables và scripts (pre-request/tests) ở 3 cấp: collection, folder, request.
  - Bỏ qua gRPC và WebSocket (không thuộc Postman Collection schema).

- Trải nghiệm nút gửi request
  - Thay icon mũi tên bằng nút “Send” có màu vàng chủ đạo, đồng bộ với phong cách Bruno.

- Cập nhật thương hiệu
  - Đổi tiêu đề ứng dụng thành “Brunoman”, cập nhật cửa sổ About và màn Welcome kèm logo mới. Icon dev đã cập nhật; icon installer (`.ico/.icns`) có thể cấu hình riêng khi build.

## Cài đặt & Chạy dev

Yêu cầu: Node.js 22.x (repo có `.nvmrc`), npm workspaces.

```bash
nvm use
npm i --legacy-peer-deps

# Thiết lập nhanh
npm run setup

# Chạy dev (web + electron)
npm run dev
```

## Ghi chú Export

- Postman Collection: dùng converter nội bộ (`@usebruno/converters`).
- Environment: xuất ra `.postman_environment.json` (import trực tiếp vào Postman). Nếu chọn nhiều env, sẽ tạo nhiều file.

## Build gói cài đặt & icon

Brunoman dùng `electron-builder`. Để đổi icon installer/taskbar:
- Windows: `resources/icons/win/icon.ico`
- macOS: `resources/icons/mac/icon.icns`
- Linux: `resources/icons/png/` (nhiều kích thước PNG)

Sau khi đặt icon, build theo nền tảng:

```bash
# Windows
npm run build:electron:win

# macOS
npm run build:electron:mac

# Linux
npm run build:electron:linux
```

