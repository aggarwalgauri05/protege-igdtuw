import { colors } from '../data/colors';

export default function BackgroundBlobs() {
  return (
    <div className="background-blobs">
      <div 
        className="blob blob-1"
        style={{ backgroundColor: colors.teal }}
      ></div>
      <div 
        className="blob blob-2"
        style={{ backgroundColor: colors.darkTeal }}
      ></div>
      <div 
        className="blob blob-3"
        style={{ backgroundColor: colors.teal }}
      ></div>
    </div>
  );
}