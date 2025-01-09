import { UploadOutlined } from "@ant-design/icons";
import { Button, Col, Row, Upload } from "antd";
import { useState } from "react";

const UploadImages = () => {
  const [images, setImages] = useState([]);

  const handleImageChange = (info) => {
    const files = info.fileList
      .map((file) => file.originFileObj)
      .filter(Boolean);

    const newImages = [];
    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        // Avoid adding duplicate images by checking if they already exist in the state
        setImages((prevImages) => {
          if (!prevImages.includes(reader.result)) {
            return [...prevImages, reader.result];
          }
          return prevImages;
        });
      };

      reader.onerror = () => {
        console.error("Failed to read the file.");
      };

      reader.readAsDataURL(file);
      console.log(images);
    });
  };

  const handleDeleteImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleDeleteAll = () => {
    setImages([]); // Clear all images
  };

  return (
    <div>
      {/* Upload Button */}
      <Row gutter={[16, 16]}>
        <Col xs={24} md={8}>
          <Upload
            accept="image/*"
            multiple
            onChange={handleImageChange}
            showUploadList={false} // Hide default upload list
          >
            <Button icon={<UploadOutlined />}>Upload Images</Button>
          </Upload>
        </Col>

        {/* Delete All Button */}
        {images.length > 0 && (
          <Col xs={24} md={8}>
            <Button
              type="primary"
              danger
              onClick={handleDeleteAll}
              style={{ marginTop: "16px" }}
            >
              Delete All Images
            </Button>
          </Col>
        )}
      </Row>

      {/* Display uploaded images */}
      <Row gutter={[16, 16]} style={{ marginTop: "16px" }}>
        {images.map((image, index) => (
          <Col xs={24} md={8} key={index} style={{ position: "relative" }}>
            <img
              src={image}
              alt={`Uploaded Preview ${index}`}
              style={{
                width: "100%",
                height: "auto",
                border: "1px solid #ccc",
                padding: "10px",
                marginBottom: "10px",
              }}
            />
            {/* Delete Button */}
            <Button
              type="primary"
              danger
              size="small"
              style={{ position: "absolute", top: 10, right: 10 }}
              onClick={() => handleDeleteImage(index)}
            >
              Delete
            </Button>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default UploadImages;
