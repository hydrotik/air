import React, { useCallback, useEffect, useRef, useState } from 'react';
import { IconUpload, IconX } from '@tabler/icons-react';
import { Button } from '../Button';
import { Progress } from '../Progress';
import {
  uploaderRoot,
  dropzone,
  dropzoneActive,
  dropzoneDisabled,
  dropzoneContent,
  dropzoneIcon,
  dropzoneText,
  dropzoneSubtext,
  fileListContainer,
  fileListInner,
  fileCard,
  fileInfo,
  fileName,
  fileSize,
  filePreview,
} from './FileUploader.css';

const cx = (...classes: (string | false | undefined | null)[]) =>
  classes.filter(Boolean).join(' ');

export interface FileUploaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Current files */
  value?: File[];
  /** Called when files change */
  onValueChange?: (files: File[]) => void;
  /** Called to upload files */
  onUpload?: (files: File[]) => Promise<void>;
  /** Upload progress by filename */
  progresses?: Record<string, number>;
  /** Accepted MIME types (e.g. { "image/*": [] }) */
  accept?: Record<string, string[]>;
  /** Max file size in bytes (default: 2MB) */
  maxSize?: number;
  /** Max number of files (default: 1) */
  maxFiles?: number;
  /** Allow multiple files */
  multiple?: boolean;
  /** Disabled state */
  disabled?: boolean;
}

function formatBytes(bytes: number, decimals = 2): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(decimals))} ${sizes[i]}`;
}

/**
 * File uploader with drag-and-drop, previews, and progress.
 * Framework-agnostic — uses native File API (no react-dropzone dependency).
 */
export const FileUploader = React.forwardRef<HTMLDivElement, FileUploaderProps>(
  (
    {
      value: valueProp,
      onValueChange,
      onUpload,
      progresses,
      accept = { 'image/*': [] },
      maxSize = 1024 * 1024 * 2,
      maxFiles = 1,
      multiple = false,
      disabled = false,
      className,
      ...props
    },
    ref,
  ) => {
    const [files, setFiles] = useState<File[]>(valueProp || []);
    const [isDragActive, setIsDragActive] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    // Sync external value
    useEffect(() => {
      if (valueProp) setFiles(valueProp);
    }, [valueProp]);

    const updateFiles = useCallback(
      (newFiles: File[]) => {
        setFiles(newFiles);
        onValueChange?.(newFiles);
      },
      [onValueChange],
    );

    const isAccepted = useCallback(
      (file: File): boolean => {
        if (!accept || Object.keys(accept).length === 0) return true;
        return Object.keys(accept).some((mime) => {
          if (mime.endsWith('/*')) {
            return file.type.startsWith(mime.replace('/*', '/'));
          }
          return file.type === mime;
        });
      },
      [accept],
    );

    const handleFiles = useCallback(
      (incoming: FileList | File[]) => {
        const accepted = Array.from(incoming).filter(
          (f) => f.size <= maxSize && isAccepted(f),
        );
        const total = files.length + accepted.length;
        if (total > maxFiles) {
          const allowed = accepted.slice(0, maxFiles - files.length);
          updateFiles([...files, ...allowed]);
        } else {
          const updated = [...files, ...accepted];
          updateFiles(updated);
          if (onUpload && updated.length > 0) {
            onUpload(updated);
          }
        }
      },
      [files, maxFiles, maxSize, isAccepted, updateFiles, onUpload],
    );

    const onRemove = (index: number) => {
      updateFiles(files.filter((_, i) => i !== index));
    };

    const isDisabled = disabled || files.length >= maxFiles;

    return (
      <div ref={ref} className={cx(uploaderRoot, className)} {...props}>
        {/* Drop zone */}
        <div
          role="button"
          tabIndex={isDisabled ? -1 : 0}
          className={cx(
            dropzone,
            isDragActive && dropzoneActive,
            isDisabled && dropzoneDisabled,
          )}
          onClick={() => !isDisabled && inputRef.current?.click()}
          onKeyDown={(e) => {
            if ((e.key === 'Enter' || e.key === ' ') && !isDisabled) {
              inputRef.current?.click();
            }
          }}
          onDragOver={(e) => {
            e.preventDefault();
            if (!isDisabled) setIsDragActive(true);
          }}
          onDragLeave={() => setIsDragActive(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragActive(false);
            if (!isDisabled && e.dataTransfer.files.length > 0) {
              handleFiles(e.dataTransfer.files);
            }
          }}
        >
          <input
            ref={inputRef}
            type="file"
            multiple={maxFiles > 1 || multiple}
            accept={Object.keys(accept).join(',')}
            style={{ display: 'none' }}
            onChange={(e) => {
              if (e.target.files?.length) handleFiles(e.target.files);
              e.target.value = '';
            }}
          />
          <div className={dropzoneContent}>
            <div className={dropzoneIcon}>
              <IconUpload size={28} aria-hidden />
            </div>
            <div>
              <p className={dropzoneText}>
                {isDragActive ? 'Drop the files here' : "Drag 'n' drop files here, or click to select"}
              </p>
              <p className={dropzoneSubtext}>
                {maxFiles > 1
                  ? `Up to ${maxFiles === Infinity ? 'unlimited' : maxFiles} files (${formatBytes(maxSize)} each)`
                  : `Max ${formatBytes(maxSize)}`}
              </p>
            </div>
          </div>
        </div>

        {/* File list */}
        {files.length > 0 && (
          <div className={fileListContainer}>
            <div className={fileListInner}>
              {files.map((file, index) => (
                <div key={index} className={fileCard}>
                  {file.type.startsWith('image/') && (
                    <img
                      src={URL.createObjectURL(file)}
                      alt={file.name}
                      className={filePreview}
                    />
                  )}
                  <div className={fileInfo}>
                    <p className={fileName}>{file.name}</p>
                    <p className={fileSize}>{formatBytes(file.size)}</p>
                    {progresses?.[file.name] !== undefined && (
                      <Progress value={progresses[file.name]} />
                    )}
                  </div>
                  <Button
                    variant="outline"
                    size="icon-sm"
                    onClick={() => onRemove(index)}
                    aria-label={`Remove ${file.name}`}
                  >
                    <IconX size={14} />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  },
);
FileUploader.displayName = 'FileUploader';
