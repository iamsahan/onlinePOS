import React, { useState } from 'react';
import Swal from 'sweetalert2';

const useUploadPopup = () => {
  const [uploading, setUploading] = useState(false);

  const showUploadPopup = () => {
    setUploading(true);
    Swal.fire({
      title: 'Uploading...',
      allowOutsideClick: false,
      onBeforeOpen: () => {
        Swal.showLoading();
      },
    });
  };

  const hideUploadPopup = () => {
    setUploading(false);
    Swal.close();
  };

  return { uploading, showUploadPopup, hideUploadPopup };
};

const AddSupplier = () => {
  const { uploading, showUploadPopup, hideUploadPopup } = useUploadPopup();

  const handlePhotoUpload = async () => {
    showUploadPopup();

    // Perform upload logic here

    // After upload is complete
    hideUploadPopup();
  };

  return (
    <div className="dashboard">
      {/* Other content */}
      <input type="file" onChange={handlePhotoUpload} />
    </div>
  );
};

export default AddSupplier;
