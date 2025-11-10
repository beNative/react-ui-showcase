import React, { useState } from 'react';
import { LivePreview, TechnicalOverview } from './ShowcaseContainer';
import { CloseIcon } from './Icons';

const images = [
    { id: 1, src: 'https://picsum.photos/seed/img1/800/600', thumb: 'https://picsum.photos/seed/img1/200/150', alt: 'Abstract architecture' },
    { id: 2, src: 'https://picsum.photos/seed/img2/800/600', thumb: 'https://picsum.photos/seed/img2/200/150', alt: 'Mountain landscape' },
    { id: 3, src: 'https://picsum.photos/seed/img3/800/600', thumb: 'https://picsum.photos/seed/img3/200/150', alt: 'City skyline at night' },
    { id: 4, src: 'https://picsum.photos/seed/img4/800/600', thumb: 'https://picsum.photos/seed/img4/200/150', alt: 'Forest path' },
];

const ImageViewerModal: React.FC<{ src: string; alt: string; onClose: () => void }> = ({ src, alt, onClose }) => (
    <div
        className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
        onClick={onClose}
    >
        <button
            className="absolute top-4 right-4 text-white p-2 rounded-full bg-black/50 hover:bg-black/80 transition-colors"
            onClick={onClose}
        >
            <CloseIcon className="w-6 h-6" />
        </button>
        <img
            src={src}
            alt={alt}
            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
        />
    </div>
);

const ImageViewerDemo: React.FC = () => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const handleOpen = (src: string) => setSelectedImage(src);
    const handleClose = () => setSelectedImage(null);

    return (
        <div>
            <LivePreview>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {images.map((image) => (
                        <div key={image.id} className="cursor-pointer group" onClick={() => handleOpen(image.src)}>
                            <img
                                src={image.thumb}
                                alt={image.alt}
                                className="w-full h-auto object-cover rounded-lg transform group-hover:scale-105 transition-transform duration-200"
                            />
                        </div>
                    ))}
                </div>
            </LivePreview>

            {selectedImage && (
                <ImageViewerModal
                    src={selectedImage}
                    alt="Enlarged view"
                    onClose={handleClose}
                />
            )}
            
            <TechnicalOverview
                library="react-photo-view / FsLightbox-react"
                officialName="MinJieDon/react-photo-view"
                githubUrl="https://github.com/MinJieDon/react-photo-view"
                description="An image viewer or lightbox is a modal component used to display images and galleries in a focused, overlay view. It provides a better user experience for viewing high-resolution images."
                features={[
                    "Modal overlay to focus on the image",
                    "Keyboard navigation (next/previous, escape to close)",
                    "Zoom and pan functionality",
                    "Support for image galleries and captions"
                ]}
                installation="npm install react-photo-view"
                usage={`import { PhotoProvider, PhotoView } from 'react-photo-view';\n\n<PhotoProvider>\n  <PhotoView src="/path/to/image.jpg">\n    <img src="/path/to/thumb.jpg" />\n  </PhotoView>\n</PhotoProvider>`}
            />
        </div>
    );
};

export default ImageViewerDemo;