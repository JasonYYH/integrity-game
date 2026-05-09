from PIL import Image, ImageFilter
import os

src = r'C:\Users\Jason\.gemini\antigravity\brain\96ed5b25-d72e-478d-8894-3b5e6c3d432c'
dst = r'd:\antigravity_workspace\testgame_agent\integrity-game\assets\images'

for name in ['bg_grassroots_happy', 'bg_office_zhao']:
    files = [f for f in os.listdir(src) if f.startswith(name + '_') and f.endswith('.png')]
    if files:
        files.sort(key=lambda x: os.path.getmtime(os.path.join(src, x)), reverse=True)
        img = Image.open(os.path.join(src, files[0]))
        w, h = img.size
        if w <= h:
            target_w = int(h * 16 / 9)
            bg = img.resize((target_w, target_w))
            top = (target_w - h) // 2
            bg = bg.crop((0, top, target_w, top + h))
            bg = bg.filter(ImageFilter.GaussianBlur(30)).point(lambda p: p * 0.6)
            bg.paste(img, ((target_w - w) // 2, 0))
            img = bg
        if img.size[0] > 1280:
            ratio = 1280 / img.size[0]
            img = img.resize((1280, int(img.size[1] * ratio)), Image.LANCZOS)
        out = os.path.join(dst, name + '.jpg')
        img.convert('RGB').save(out, 'JPEG', quality=72, optimize=True)
        sz = os.path.getsize(out) // 1024
        print(f'Created {name}.jpg ({sz}KB)')
    else:
        print(f'MISSING {name}')
