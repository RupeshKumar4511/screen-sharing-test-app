import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useScreenShare } from "../hooks/useScreenShare";
import Button from "./Button";

export default function ScreenTest() {
  const navigate = useNavigate();
  const { status, stream, metadata, start, stop } = useScreenShare();
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = stream || null;
    }
  }, [stream]);

  return (
    <div className="min-h-screen p-6 flex flex-col items-center gap-6 text-center">
      <h2 className="text-2xl font-semibold">Screen Test</h2>

      {status === "idle" && (
        <Button onClick={start}>Start Screen Sharing</Button>
      )}

      {status === "requesting" && (
        <p>Requesting permission...</p>
      )}

      {status === "granted" && stream && (
        <div className="flex flex-col gap-4 items-center">
          <p className="text-green-600 font-medium">
            Screen stream active
          </p>

          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="max-w-full border rounded-lg"
          />

          {metadata && (
            <div className="text-sm text-gray-600">
              <p>
                Resolution: {metadata.width} × {metadata.height}
              </p>
              <p>
                Display Type: {metadata.displaySurface || "Unknown"}
              </p>
            </div>
          )}

          {/* 👇 NEW STOP BUTTON */}
          <Button variant="secondary" onClick={stop}>
            Stop Sharing
          </Button>
        </div>
      )}

      {status === "stopped" && (
        <div className="flex flex-col gap-4">
          <p className="text-yellow-600 font-medium">
            Screen sharing stopped
          </p>

          <Button onClick={start}>
            Retry Screen Test
          </Button>
          <br/>
          <br/>
          <Button variant="secondary" onClick={() => navigate("/")}>
            Back to Home
          </Button>
        </div>
      )}
    </div>
  );
}