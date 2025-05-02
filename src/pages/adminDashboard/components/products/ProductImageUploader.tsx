import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, X, Image as ImageIcon } from "lucide-react";

interface ProductImageUploaderProps {
  imageUrl: string;
  onImageUpload: (url: string) => void;
}

/**
 * ProductImageUploader Component
 *
 * Handles image uploads for products with preview, drag-and-drop functionality,
 * and validation for file types and sizes.
 */
const ProductImageUploader = ({ imageUrl, onImageUpload }: ProductImageUploaderProps) => {
  // Reference to the file input element
  const fileInputRef = useRef<HTMLInputElement>(null);
  // State for drag and drop UI feedback
  const [isDragging, setIsDragging] = useState(false);
  // State for error messages
  const [error, setError] = useState<string | null>(null);

  /**
   * Process file upload from input or drag-and-drop
   * @param files - The files to process
   */
  const processFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    setError(null);
    const file = files[0];

    // Validate file type
    const validTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!validTypes.includes(file.type)) {
      setError("Please upload a valid image (JPG, PNG, WEBP)");
      return;
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSize) {
      setError("Image must be less than 5MB");
      return;
    }

    // In a production environment, you would upload the file to your server or CDN
    // and get back a URL. For this example, we'll create a local object URL.
    const localImageUrl = URL.createObjectURL(file);
    onImageUpload(localImageUrl);

    // Note: In production, you'd use something like:
    // const formData = new FormData();
    // formData.append('file', file);
    // const response = await uploadService.uploadImage(formData);
    // onImageUpload(response.imageUrl);
  };

  /**
   * Handle click on the upload area
   */
  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  /**
   * Handle file input change
   */
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    processFiles(e.target.files);
  };

  /**
   * Handle drag over event
   */
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  /**
   * Handle drag leave event
   */
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  /**
   * Handle drop event
   */
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    processFiles(e.dataTransfer.files);
  };

  /**
   * Remove the current image
   */
  const handleRemoveImage = () => {
    onImageUpload("");
    setError(null);

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-4">
      {/* Hidden file input */}
      <Input
        id="file-input"
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {imageUrl ? (
        // Image preview with remove button
        <div className="relative border rounded-md overflow-hidden">
          <img
            src={imageUrl}
            alt="Product Preview"
            className="w-full h-64 object-contain bg-gray-50"
          />
          <Button
            id="remove-image"
            type="button"
            size="icon"
            variant="destructive"
            className="absolute top-2 right-2 h-8 w-8 rounded-full"
            onClick={handleRemoveImage}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        // Drop zone for uploading images
        <div
          className={`
            border-2 border-dashed rounded-lg p-8
            flex flex-col items-center justify-center
            cursor-pointer transition-colors
            min-h-[200px]
            ${isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:bg-gray-50"}
          `}
          onClick={handleUploadClick}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <ImageIcon className="h-12 w-12 text-gray-400 mb-4" />
          <p className="text-sm text-gray-600 font-medium">Drag and drop your product image here</p>
          <p className="text-xs text-gray-500 mt-1">or click to browse files</p>
          <p className="text-xs text-gray-400 mt-4">Supports: JPG, PNG, WEBP (max 5MB)</p>
        </div>
      )}

      {/* Error message display */}
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}

      {/* Upload button for explicit file selection */}
      {!imageUrl && (
        <Button
          id="upload-button"
          type="button"
          variant="outline"
          className="w-full border-gray-300"
          onClick={handleUploadClick}
        >
          <Upload className="h-4 w-4 mr-2" />
          Select Image
        </Button>
      )}
    </div>
  );
};

export default ProductImageUploader;
