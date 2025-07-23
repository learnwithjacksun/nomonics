import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).toString();

interface ComicPreviewProps {
  fileUrl: string;
}

export default function PDFViewer({ fileUrl }: ComicPreviewProps) {
  const [numPages, setNumPages] = useState<number>();

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  return (
    <div className="flex flex-col items-center justify-center w-full gap-4">
      <Document
        file={fileUrl}
        onLoadSuccess={onDocumentLoadSuccess}
        onLoadError={(error) => console.error('Error loading PDF:', error)}
      >
        {Array.from(new Array(numPages), (_, index) => (
          <Page key={index + 1} pageNumber={index + 1} />
        ))}
      </Document>
    </div>
  );
}
