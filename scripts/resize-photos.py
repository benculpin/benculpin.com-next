#!/usr/bin/env python3
"""
Resize camera files into web copies for a photography set.

    python3 scripts/resize-photos.py ~/Desktop/NYC public/images/photography/new-york

Settings match the sets already on the site, so a new set does not look
different from its neighbours: long edge 2000px, JPEG quality 82, LANCZOS
resampling, EXIF orientation applied, sRGB.

Output is renamed 01.jpg, 02.jpg ... in the sorted order of the source files,
which for camera files is chronological.
"""
import sys
from pathlib import Path
from PIL import Image, ImageOps, ImageCms

MAX_EDGE = 2000
QUALITY = 82
EXTS = {".jpg", ".jpeg", ".png", ".tif", ".tiff", ".heic", ".webp"}

SRGB = ImageCms.ImageCmsProfile(ImageCms.createProfile("sRGB")).tobytes()


def main(src_dir: str, dst_dir: str) -> None:
    src, dst = Path(src_dir).expanduser(), Path(dst_dir).expanduser()
    if not src.is_dir():
        sys.exit(f"No such folder: {src}")
    dst.mkdir(parents=True, exist_ok=True)

    files = sorted(p for p in src.iterdir()
                   if p.suffix.lower() in EXTS and not p.name.startswith("."))
    if not files:
        sys.exit(f"No images in {src}")

    for i, path in enumerate(files, start=1):
        with Image.open(path) as im:
            im = ImageOps.exif_transpose(im)      # honour camera rotation
            if im.mode != "RGB":
                im = im.convert("RGB")
            im.thumbnail((MAX_EDGE, MAX_EDGE), Image.LANCZOS)
            out = dst / f"{i:02d}.jpg"
            im.save(out, "JPEG", quality=QUALITY, optimize=True, icc_profile=SRGB)
        print(f"{path.name:22} -> {out.name}  {im.width}x{im.height}")

    print(f"\n{len(files)} photos -> {dst}")
    print("Now write set.txt, copy the opener to cover.jpg, and add story.txt.")


if __name__ == "__main__":
    if len(sys.argv) != 3:
        sys.exit(__doc__)
    main(sys.argv[1], sys.argv[2])
