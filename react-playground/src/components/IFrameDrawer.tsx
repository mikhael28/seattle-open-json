import React, { useState, useEffect } from "react";
import { X, ExternalLink } from "lucide-react";
import { Button } from "./ui/button";

interface IFrameDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  url: string;
  direction?: 'left' | 'right';
}

const IFrameDrawer: React.FC<IFrameDrawerProps> = ({ isOpen, onClose, title, url, direction = 'left' }) => {
  const [iframeError, setIframeError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Reset iframe state when URL changes
  useEffect(() => {
    setIframeError(false);
    setIsLoading(true);
  }, [url]);

  // Handle clicking outside the drawer
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Handle opening in new tab
  const handleOpenInNewTab = () => {
    window.open(url, "_blank", "noopener,noreferrer");
    onClose();
  };

  // Handle iframe error
  const handleIframeError = () => {
    setIframeError(true);
    setIsLoading(false);
  };

  // Handle iframe load
  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 transition-opacity duration-300"
      onClick={handleBackdropClick}
    >
      <div
        className={`fixed ${direction === 'left' ? 'left-0' : 'right-0'} top-0 h-full w-2/3 bg-background shadow-xl transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : (direction === 'left' ? "-translate-x-full" : "translate-x-full")
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border bg-card p-4">
          <h2 className="text-xl font-semibold text-foreground truncate pr-4">
            {title}
          </h2>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleOpenInNewTab}
              className="flex items-center gap-2"
            >
              <ExternalLink className="h-4 w-4" />
              Open in New Tab
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="flex-shrink-0"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="relative h-[calc(100%-4rem)]">
          {/* Loading State */}
          {isLoading && !iframeError && (
            <div className="absolute inset-0 flex items-center justify-center bg-background">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-muted-foreground">Loading content...</p>
              </div>
            </div>
          )}

          {/* Error State */}
          {iframeError ? (
            <div className="absolute inset-0 flex items-center justify-center bg-background">
              <div className="text-center max-w-md px-6">
                <div className="mb-4 text-4xl">😞</div>
                <h3 className="text-lg font-medium mb-2">Sorry, the iFrame isn't working</h3>
                <p className="text-muted-foreground mb-4">
                  This content cannot be displayed in an embedded frame.
                </p>
                <Button onClick={handleOpenInNewTab}>
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Open in New Tab Instead
                </Button>
              </div>
            </div>
          ) : (
            <iframe
              src={url}
              className="w-full h-full border-0"
              title={title}
              onError={handleIframeError}
              onLoad={handleIframeLoad}
              sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default IFrameDrawer;

