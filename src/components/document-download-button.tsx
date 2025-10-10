"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface DocumentDownloadButtonProps {
  documentId: number;
  downloadUrl: string;
  fileName: string;
  buttonText: string;
}

export function DocumentDownloadButton({ 
  documentId, 
  downloadUrl, 
  fileName,
  buttonText 
}: DocumentDownloadButtonProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      // Use the direct download URL from the API
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = fileName;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading document:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <Button 
      size="sm" 
      variant="outline" 
      className="text-xs"
      onClick={handleDownload}
      disabled={isDownloading}
    >
      <Download className="h-3 w-3 mr-1" />
      {isDownloading ? '...' : buttonText}
    </Button>
  );
}

