import { useNavigate } from "react-router-dom";
import Button from "./Button";

export default function Home() {
  const navigate = useNavigate();
  const supported = !!navigator.mediaDevices?.getDisplayMedia;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 p-6 text-center">
      <h1 className="text-3xl font-bold">Screen Share Test App</h1>

      {!supported && (
        <p className="text-red-500">
          Your browser does not support screen sharing.
        </p>
      )}

      <Button
        disabled={!supported}
        onClick={() => navigate("/screen-test")}
      >
        Start Screen Test
      </Button>
    </div>
  );
}