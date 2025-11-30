import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, Play, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  caption?: string;
}

interface DemoVideo {
  id: string;
  title: string;
  url: string;
  caption?: string;
  thumbnail?: string;
}

interface Dataset {
  id: string;
  name: string;
  description: string;
  size: string;
  format: string;
  downloadUrl: string;
}

interface ProjectGalleryProps {
  images: GalleryImage[];
  demoVideo?: DemoVideo;
  datasets: Dataset[];
}

export default function ProjectGallery({
  images,
  demoVideo,
  datasets,
}: ProjectGalleryProps) {
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);
  const [showVideoModal, setShowVideoModal] = useState(false);

  const selectedImage = images.find((img) => img.id === selectedImageId);

  const handleDownloadDataset = (dataset: Dataset) => {
    // Simulate dataset download
    const element = document.createElement("a");
    const fileContent = `Sample ${dataset.format} Dataset: ${dataset.name}\n\nThis is a mock dataset for demonstration purposes.\nFormat: ${dataset.format}\nSize: ${dataset.size}\n\nIn a production environment, this would contain the actual ${dataset.name} data.`;
    const file = new Blob([fileContent], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `${dataset.id}-sample.${dataset.format.toLowerCase()}`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="space-y-8">
      {/* Image Gallery with Lazy Loading */}
      {images.length > 0 && (
        <div>
          <h3 className="text-2xl font-heading font-bold mb-4 flex items-center gap-2">
            📸 Project Gallery
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {images.map((image) => (
              <button
                key={image.id}
                onClick={() => setSelectedImageId(image.id)}
                className="group relative overflow-hidden rounded-lg border border-border hover:border-primary transition-all cursor-pointer h-48"
                data-testid={`button-gallery-image-${image.id}`}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {image.caption && (
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <p className="text-white text-sm font-medium">{image.caption}</p>
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Image Modal */}
          <Dialog open={!!selectedImageId} onOpenChange={() => setSelectedImageId(null)}>
            <DialogContent className="max-w-4xl" data-testid="modal-gallery-image">
              {selectedImage && (
                <div>
                  <img
                    src={selectedImage.src}
                    alt={selectedImage.alt}
                    className="w-full rounded-lg"
                    loading="lazy"
                  />
                  {selectedImage.caption && (
                    <p className="mt-4 text-muted-foreground text-sm">
                      {selectedImage.caption}
                    </p>
                  )}
                </div>
              )}
            </DialogContent>
          </Dialog>
        </div>
      )}

      {/* Demo Video Section */}
      {demoVideo && (
        <div>
          <h3 className="text-2xl font-heading font-bold mb-4 flex items-center gap-2">
            🎬 Demo Video
          </h3>
          <div className="relative rounded-lg overflow-hidden border border-border group cursor-pointer h-80 md:h-96 bg-black flex items-center justify-center">
            <img
              src={demoVideo.thumbnail}
              alt={demoVideo.title}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-all" />
            <button
              onClick={() => setShowVideoModal(true)}
              className="relative z-10 flex items-center justify-center w-16 h-16 rounded-full bg-primary hover:bg-primary/90 transition-all shadow-lg group-hover:scale-110"
              title="Play demo video"
              data-testid="button-play-demo-video"
            >
              <Play size={24} className="text-primary-foreground ml-1" />
            </button>
          </div>

          {/* Video Modal with Autoplay */}
          <Dialog open={showVideoModal} onOpenChange={setShowVideoModal}>
            <DialogContent className="max-w-4xl p-0" data-testid="modal-demo-video">
              <button
                onClick={() => setShowVideoModal(false)}
                className="absolute right-4 top-4 z-50 p-2 bg-black/50 hover:bg-black/70 rounded-full transition-all"
              >
                <X size={20} className="text-white" />
              </button>
              <div className="relative w-full pt-[56.25%] bg-black">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={`${demoVideo.url}?autoplay=1&controls=1`}
                  title={demoVideo.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  data-testid="iframe-demo-video"
                />
              </div>
              {demoVideo.caption && (
                <div className="p-4 border-t">
                  <p className="text-sm text-muted-foreground">{demoVideo.caption}</p>
                </div>
              )}
            </DialogContent>
          </Dialog>

          <p className="text-sm text-muted-foreground mt-2">
            Click the play button to watch an interactive demo with captions.
          </p>
        </div>
      )}

      {/* Sample Datasets */}
      {datasets.length > 0 && (
        <div>
          <h3 className="text-2xl font-heading font-bold mb-4 flex items-center gap-2">
            📊 Sample Datasets
          </h3>
          <div className="space-y-3">
            {datasets.map((dataset) => (
              <div
                key={dataset.id}
                className="flex flex-col md:flex-row md:items-center md:justify-between p-4 rounded-lg border border-border hover:border-primary/50 transition-all bg-muted/50 hover:bg-muted/80"
                data-testid={`card-dataset-${dataset.id}`}
              >
                <div className="flex-1 mb-3 md:mb-0">
                  <h4 className="font-semibold text-foreground">{dataset.name}</h4>
                  <p className="text-sm text-muted-foreground">{dataset.description}</p>
                  <div className="flex gap-2 mt-2">
                    <Badge variant="outline" className="text-xs">
                      {dataset.format}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {dataset.size}
                    </Badge>
                  </div>
                </div>
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => handleDownloadDataset(dataset)}
                  className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground"
                  data-testid={`button-download-dataset-${dataset.id}`}
                >
                  <Download size={16} />
                  Download
                </Button>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            💡 Tip: These are sample datasets for demonstration. Download them to explore the data structure and format used in this project.
          </p>
        </div>
      )}
    </div>
  );
}
