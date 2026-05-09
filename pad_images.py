from PIL import Image, ImageFilter
import glob

images = glob.glob('assets/images/*.png')
for img_path in images:
    img = Image.open(img_path)
    w, h = img.size
    if w / h > 1.5:
        print(f"Skipping {img_path}, already wide: {w}x{h}")
        continue
    print(f"Processing {img_path} ({w}x{h}) -> 16:9")
    target_w = int(h * 16 / 9)
    target_h = h
    bg_resized = img.resize((target_w, target_w))
    top = (target_w - target_h) // 2
    bg_cropped = bg_resized.crop((0, top, target_w, top + target_h))
    bg_blurred = bg_cropped.filter(ImageFilter.GaussianBlur(30))
    bg_blurred = bg_blurred.point(lambda p: p * 0.6)
    offset_x = (target_w - w) // 2
    bg_blurred.paste(img, (offset_x, 0))
    bg_blurred.save(img_path)
print("Done!")
