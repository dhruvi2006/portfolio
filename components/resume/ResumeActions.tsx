"use client";

import { useCallback, useEffect, useState, type RefObject } from "react";
import {
  IoDownloadOutline,
} from "react-icons/io5";
import { toCanvas } from "html-to-image";
import jsPDF from "jspdf";

interface ResumeActionsProps {
  contentRef: RefObject<HTMLDivElement | null>;
}

export function ResumeActions({ contentRef }: ResumeActionsProps) {
  const [exporting, setExporting] = useState(false);
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
    if (!contentRef.current || exporting) return;

    setExporting(true);
    try {
      const element = contentRef.current;

      const page1El = element.querySelector<HTMLElement>("#page-1");
      const page2El = element.querySelector<HTMLElement>("#page-2");

      if (!page1El || !page2El) {
        throw new Error("Page elements not found");
      }

      // Capture each page independently using html-to-image
      const [canvas1, canvas2] = await Promise.all([
        toCanvas(page1El, {
          pixelRatio: 2,
          backgroundColor: "#ffffff",
        }),
        toCanvas(page2El, {
          pixelRatio: 2,
          backgroundColor: "#ffffff",
        }),
      ]);

      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = 210;

      // Page 1
      const imgData1 = canvas1.toDataURL("image/png");
      const pdfHeight1 = (canvas1.height * pdfWidth) / canvas1.width;
      pdf.addImage(imgData1, "PNG", 0, 0, pdfWidth, pdfHeight1);

      // Page 2
      pdf.addPage();
      const imgData2 = canvas2.toDataURL("image/png");
      const pdfHeight2 = (canvas2.height * pdfWidth) / canvas2.width;
      pdf.addImage(imgData2, "PNG", 0, 0, pdfWidth, pdfHeight2);

      pdf.save("Dhruvi_Mittal_Resume.pdf");
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
      console.error("PDF export failed:", err);
    } finally {
      setExporting(false);
    }
  }, [contentRef, exporting]);

  const btnBase =
    "inline-flex items-center gap-1.5 h-8 px-3 rounded-md text-sm font-medium transition-all duration-150 cursor-pointer";

  return (
    <div className="flex items-center gap-2">
      {/* Download count badge */}
      {downloadCount !== null && (
        <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-gray-50 border border-gray-200 text-[11px] text-gray-500 whitespace-nowrap">
          <span className="font-semibold text-gray-700">{downloadCount.toLocaleString()}</span>
          <span>downloads</span>
        </div>
      )}

      {/* Download PDF */}
      <button
        onClick={handleDownloadPDF}
        disabled={exporting}
        className={`${btnBase} bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        <IoDownloadOutline className="w-3.5 h-3.5" />
        <span>{exporting ? "Exporting…" : downloaded ? "Downloaded!" : "Download"}</span>
      </button>


    </div>
  );
}
