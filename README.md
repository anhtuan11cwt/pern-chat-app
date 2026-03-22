# Ứng Dụng Chat Thời Gian Thực (PERN Stack)

Ứng dụng chat thời gian thực full-stack được xây dựng với PERN stack (PostgreSQL, Express, React, Node.js), bao gồm nhắn tin thời gian thực qua Socket.IO, xác thực người dùng, quản lý hồ sơ với ảnh đại diện lưu trên cloud, và giao diện glassmorphism hiện đại.

## Công Nghệ Sử Dụng

### Backend
- **Runtime:** Node.js + TypeScript
- **Framework:** Express 5
- **Cơ sở dữ liệu:** PostgreSQL (qua Prisma ORM)
- **Xác thực:** Better Auth (email/mật khẩu)
- **Thời gian thực:** Socket.IO
- **Tải tệp:** Cloudinary + Multer
- **Chất lượng mã:** ESLint + Biome

### Frontend
- **Framework:** React 19 + TypeScript
- **Công cụ build:** Vite
- **CSS:** Tailwind CSS 4
- **Quản lý trạng thái:** Zustand
- **Điều hướng:** React Router DOM v7
- **Client thời gian thực:** Socket.IO Client
- **HTTP Client:** Axios
- **Thông báo:** React Hot Toast
- **Biểu tượng:** React Icons

## Tính Năng

- **Xác thực** - Đăng ký/Đăng nhập bằng email và mật khẩu, xác thực dựa trên session qua Better Auth
- **Nhắn tin thời gian thực** - Gửi nhận tin nhắn tức thì bằng Socket.IO với kênh trò chuyện theo phòng
- **Trạng thái trực tuyến** - Theo dõi người dùng trực tuyến theo thời gian thực, phát sóng đến tất cả client đã kết nối
- **Tìm kiếm người dùng** - Tìm kiếm người dùng theo tên hoặc email để bắt đầu cuộc trò chuyện mới
- **Quản lý hồ sơ** - Chỉnh sửa tên, tiểu sử và ảnh đại diện với lưu trữ đám mây Cloudinary
- **Bảo vệ tuyến đường** - Trang chat chỉ truy cập được khi đã đăng nhập
- **Thiết kế đáp ứng** - Bố cục lưới thích ứng cho sidebar, cửa sổ chat và bảng thông tin người dùng

## Cấu Trúc Dự Án

```
chat-app/
├── backend/
│   ├── prisma/
│   │   └── schema.prisma          # Schema cơ sở dữ liệu (User, Session, Account, Conversation, Message)
│   └── src/
│       ├── controllers/           # Xử lý tuyến đường (conversation, message, profile, user)
│       ├── lib/                   # Auth, Prisma client, cấu hình Cloudinary
│       ├── middleware/             # Middleware tải tệp Multer
│       ├── routes/                # Định nghĩa tuyến đường API
│       ├── services/              # Tải/xóa Cloudinary, lấy session
│       ├── sockets/               # Khởi tạo Socket.IO & xử lý sự kiện
│       └── server.ts              # Điểm khởi chạy ứng dụng Express
│
├── frontend/
│   └── src/
│       ├── components/
│       │   ├── chat/              # Giao diện chat (container, header, input, cửa sổ, sidebars)
│       │   ├── layout/            # Bọc tuyến đường được bảo vệ
│       │   ├── modals/            # Modal chỉnh sửa hồ sơ
│       │   └── ui/                # Tải ảnh đại diện, màn hình tải
│       ├── customHooks/           # Kết nối socket, người dùng trực tuyến, lấy danh sách người dùng
│       ├── lib/                   # Axios instance, auth client, hằng số, kiểu dữ liệu
│       ├── pages/                 # Trang Đăng nhập, Đăng ký, Chat
│       ├── store/                 # Zustand stores (chat, socket, chỉnh sửa hồ sơ)
│       └── App.tsx                # Component gốc với điều hướng
```

## Điểm Cuối API

| Phương thức | Điểm cuối | Mô tả |
|-------------|-----------|-------|
| ALL | `/api/auth/*` | Tuyến đường xác thực Better Auth |
| GET | `/api/users` | Lấy tất cả người dùng (hỗ trợ `?search=` để tìm kiếm) |
| POST | `/api/conversations/:userId` | Tạo hoặc lấy cuộc trò chuyện với một người dùng |
| GET | `/api/messages/:conversationId` | Lấy tin nhắn của một cuộc trò chuyện |
| POST | `/api/messages` | Gửi tin nhắn mới |
| GET | `/api/profile` | Lấy hồ sơ người dùng hiện tại |
| PUT | `/api/profile` | Cập nhật hồ sơ (tên, tiểu sử, ảnh đại diện) |

## Sự Kiện Socket

| Sự kiện | Chiều | Mô tả |
|---------|-------|-------|
| `onlineUsers` | Server -> Client | Phát sóng danh sách ID người dùng đang trực tuyến |
| `getOnlineUsers` | Client -> Server | Yêu cầu danh sách người dùng trực tuyến hiện tại |
| `conversation:join` | Client -> Server | Tham gia phòng trò chuyện |
| `conversation:leave` | Client -> Server | Rời phòng trò chuyện |
| `message:new` | Server -> Client | Tin nhắn mới trong cuộc trò chuyện |

## Schema Cơ Sở Dữ Liệu

- **User** - id, name, email, password (quản lý bởi Better Auth), avatar, bio, avatarPublicId
- **Session** - id, userId, token, expiresAt (quản lý bởi Better Auth)
- **Account** - id, userId, providerId, accessToken, refreshToken (quản lý bởi Better Auth)
- **Conversation** - id, participants (quan hệ nhiều-nhiều với User)
- **Message** - id, content, senderId, conversationId, createdAt

## Yêu Cầu Hệ Thống

- Node.js >= 18
- Cơ sở dữ liệu PostgreSQL
- Tài khoản Cloudinary (để tải ảnh đại diện)

## Bắt Đầu

### 1. Clone kho lưu trữ

```bash
git clone <repository-url>
cd chat-app
```

### 2. Cài đặt Backend

```bash
cd backend
npm install
```

Tạo tệp `.env` trong thư mục `backend/`:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?sslmode=require"
BETTER_AUTH_SECRET="your-secret-key"
BETTER_AUTH_URL="http://localhost:3000"
ORIGIN="http://localhost:5173"
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
```

Chạy migration cơ sở dữ liệu:

```bash
npx prisma migrate dev
```

### 3. Cài đặt Frontend

```bash
cd frontend
npm install
```

### 4. Chạy Máy Chủ Phát Triển

Từ thư mục `backend/` (chạy đồng thời cả backend và frontend):

```bash
npm run dev
```

- Backend: `http://localhost:3000`
- Frontend: `http://localhost:5173`

### 5. Build Cho Môi Trường Sản Xuất

```bash
cd backend
npm run build
npm start
```

## Các Lệnh NPM Có Sẵn

### Backend

| Lệnh | Mô tả |
|------|-------|
| `npm run dev` | Chạy đồng thời backend + frontend |
| `npm run dev-server` | Chỉ chạy backend (với nodemon) |
| `npm run build` | Sinh Prisma client, build frontend, biên dịch TypeScript |
| `npm start` | Chạy server đã biên dịch từ `dist/` |
| `npm run lint` | Chạy ESLint |
| `npm run check` | Chạy Biome check với tự động sửa |

### Frontend

| Lệnh | Mô tả |
|------|-------|
| `npm run dev` | Khởi động Vite dev server |
| `npm run build` | Kiểm tra kiểu và build cho sản xuất |
| `npm run preview` | Xem trước bản build sản xuất |
| `npm run lint` | Chạy ESLint |
