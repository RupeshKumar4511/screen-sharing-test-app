import { useCallback, useEffect, useRef, useState } from "react";

export function useScreenShare() {
  const [status, setStatus] = useState("idle");
  const [metadata, setMetadata] = useState(null);
  const [stream, setStream] = useState(null); // state
  const streamRef = useRef(null);

  const cleanup = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => {
        track.onended = null;
        track.stop();
      });
      streamRef.current = null;
    }

    setStream(null);      // clear state
    setMetadata(null);
  }, []);

  const stop = useCallback(() => {
    cleanup();
    setStatus("stopped");
  }, [cleanup]);

  const start = useCallback(async () => {
    cleanup(); // Always fresh request

    if (!navigator.mediaDevices?.getDisplayMedia) {
      setStatus("unsupported");
      return;
    }

    setStatus("requesting");

    try {
      const newStream = await navigator.mediaDevices.getDisplayMedia({
        video: { frameRate: { ideal: 30 } },
        audio: false,
      });

      const track = newStream.getVideoTracks()[0];
      const settings = track.getSettings();

      streamRef.current = newStream;
      setStream(newStream); // triggers re-render

      setMetadata({
        width: settings.width,
        height: settings.height,
        displaySurface: settings.displaySurface,
      });

      track.onended = () => {
        cleanup();
        setStatus("stopped");
      };

      setStatus("granted");
    } catch (err) {
      if (err.name === "NotAllowedError") {
        setStatus("denied");
      } else if (err.name === "AbortError") {
        setStatus("cancelled");
      } else {
        setStatus("error");
      }
    }
  }, [cleanup]);

  useEffect(() => {
    return () => cleanup();
  }, [cleanup]);

  return {
    status,
    metadata,
    stream, 
    start,
    stop,
  };
}