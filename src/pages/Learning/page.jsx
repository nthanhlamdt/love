import React from 'react';

const StudyProgram = () => {
  return (
    <div className="container mx-auto p-8 bg-pink-50 rounded-lg shadow-lg">
      {/* Học Ngôn Ngữ Mới */}
      <section className="mb-12">
        <h1 className="text-4xl font-bold text-center mb-8 text-pink-700">Học Ngôn Ngữ Mới</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-pink-100 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-pink-800">Ngôn Ngữ 1</h2>
            <p className="text-pink-700 mb-4">Mô tả ngôn ngữ và lý do học.</p>
            <button className="bg-pink-500 text-white font-semibold py-2 px-4 rounded-full hover:bg-pink-600">
              Bắt Đầu Học
            </button>
          </div>
          {/* Thêm ngôn ngữ khác */}
        </div>
      </section>

      {/* Khám Phá Kiến Thức Mới */}
      <section>
        <h1 className="text-4xl font-bold text-center mb-8 text-pink-700">Khám Phá Kiến Thức Mới</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-pink-100 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-pink-800">Khóa Học 1</h2>
            <p className="text-pink-700 mb-4">Mô tả khóa học và lợi ích.</p>
            <button className="bg-pink-500 text-white font-semibold py-2 px-4 rounded-full hover:bg-pink-600">
              Xem Chi Tiết
            </button>
          </div>
          {/* Thêm khóa học khác */}
        </div>
      </section>
    </div>
  );
};

export default StudyProgram;
