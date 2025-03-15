import Link from "next/link"

function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 text-center">
      <h1 className="text-6xl font-extrabold text-red-500">404</h1>
      <p className="mt-4 text-2xl text-gray-700">
        Xin lỗi, trang bạn tìm kiếm không tồn tại.
      </p>
      <Link href="/">
        <a className="mt-6 text-xl text-blue-600 hover:text-blue-800">
          Quay lại trang chủ
        </a>
      </Link>
    </div>
  )
}

export default NotFoundPage
