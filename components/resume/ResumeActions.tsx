"use client";

import { useCallback, useEffect, useState } from "react";
import {
  IoDownloadOutline,
} from "react-icons/io5";

export function ResumeActions() {
  const [downloaded, setDownloaded] = useState(false);
  const [downloadCount, setDownloadCount] = useState<number | null>(null);

  // Fetch current download count on mount
  useEffect(() => {
    fetch("/api/resume/downloads")
      .then((res) => res.json())
      .then((data) => setDownloadCount(data.count))
      .catch(() => console.warn("Failed to fetch download count"));
  }, []);

  const handleDownloadPDF = useCallback(async () => {
    try {
      // Download the PDF file from the public directory
      const link = document.createElement("a");
      link.href = "/Dhruvi%20mittal.pdf";
      link.download = "Dhruvi_Mittal_Resume.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setDownloaded(true);
      setTimeout(() => setDownloaded(false), 2000);

      // Increment download counter via API
      try {
        const res = await fetch("/api/resume/downloads", { method: "POST" });
        const data = await res.json();
        setDownloadCount(data.count);
      } catch {
        console.warn("Failed to increment download count");
      }
    } catch (err) {
      console.error("Download failed:", err);
    }
  }, []);

  const btnBase =
    "inline-flex items-center gap-1.5 h-8 px-3 rounded-md text-sm font-medium transition-all duration-150 cursor-pointer";

  return (
    <div className="flex items-center gap-2">
      {/* Download count badge */}
      {downloadCount !== null && (
        <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-gray-50 dark:bg-[#171717] border border-gray-200 dark:border-[#262626] text-[11px] text-gray-500 dark:text-[#a1a1aa] whitespace-nowrap">
          <span className="font-semibold text-gray-700 dark:text-[#fafafa]">{downloadCount.toLocaleString()}</span>
          <span>downloads</span>
        </div>
      )}

      {/* Download PDF */}
      <button
        onClick={handleDownloadPDF}
        className={`${btnBase} bg-blue-600 text-white hover:bg-blue-700`}
      >
        <IoDownloadOutline className="w-3.5 h-3.5" />
        <span>{downloaded ? "Downloaded!" : "Download"}</span>
      </button>
    </div>
  );
}
