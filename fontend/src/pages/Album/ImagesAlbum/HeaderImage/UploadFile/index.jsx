import { useRef, useState } from 'react';
import { Upload } from 'lucide-react';
import { addImageToAlbum, sendNotification } from '~/api/api';
import { useAlbumContext } from '~/context/albumContext';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import Loading from '~/components/Loading';

export default function UploadFile({ album }) {
  const fileInputRef = useRef(null);
  const { setAlbums } = useAlbumContext();
  const userlove = JSON.parse(localStorage.getItem('userLove')) || {};
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [uploadCount, setUploadCount] = useState(0);

  const handleFileImageChange = async (e) => {
    const files = Array.from(e.target.files);
    setLoading(true);
    setUploadCount(0);

    // Kiểm tra định dạng file và kích thước
    const validFiles = files.filter((file, index) => {
      const allowedTypes = [
        'image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/webp', 'video/mp4'
      ];
      const isValidSize = file.size <= 100 * 1024 * 1024; // Giới hạn 100MB
      const isValidType = allowedTypes.includes(file.type);

      if (!isValidType) {
        toast.error(`File thứ ${index + 1} có định dạng không hợp lệ!`);
        return false;
      }
      if (!isValidSize) {
        toast.error(`File thứ ${index + 1} có kích thước quá lớn (tối đa 100MB)`);
        return false;
      }
      return true;
    });

    const newImages = [];

    try {
      await Promise.all(
        validFiles.map(async (file) => {
          try {
            const dt = await addImageToAlbum({ albumId: album._id, file });
            newImages.push(dt);
            setUploadCount((prev) => prev + 1);
          } catch (error) {
            toast.error(`Lỗi khi thêm file: ${file.name}`);
          }
        })
      );

      if (newImages.length > 0) {
        setAlbums((prevAlbums) => {
          const albumIndex = prevAlbums.findIndex(a => a._id === id);
          if (albumIndex === -1) return prevAlbums;

          const updatedAlbums = [...prevAlbums];
          updatedAlbums[albumIndex] = {
            ...updatedAlbums[albumIndex],
            images: [...newImages, ...updatedAlbums[albumIndex].images],
          };
          return updatedAlbums;
        });

        try {
          await sendNotification({
            type: 'add_image_album',
            title: `Đã thêm ${newImages.length} ảnh vào album ${album.name}`,
            phoneNumber: userlove.phoneNumber,
            albumId: album._id,
          });
          toast.success(`Thêm ${newImages.length} ảnh thành công!`);
        } catch (error) {
          toast.error('Lỗi khi gửi thông báo!');
        }
      }
    } catch (error) {
      toast.error('Lỗi khi tải lên tệp!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && (
        <div className="fixed z-[999] inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center">
          <Loading />
          <p className="text-white mt-4 text-lg font-semibold animate-pulse">
            Đang tải lên... {uploadCount}/{fileInputRef.current?.files?.length || 0}
          </p>
        </div>
      )}
      <div>
        <input
          type="file"
          multiple
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileImageChange}
          accept="image/*, video/*"
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded flex items-center transition duration-300"
        >
          <Upload className="mr-2" /> Thêm ảnh
        </button>
      </div>
    </>
  );
}
