"""Generate PWA icons for Linux Commands (terminal '>_' on dark panel)."""
import os
from PIL import Image, ImageDraw

BG = (40, 40, 40, 255)        # #282828 (gruvbox dark bg)
FG = (254, 128, 25, 255)      # #fe8019 (gruvbox bright orange)
os.makedirs("icons", exist_ok=True)


def draw_icon(size, maskable=False):
    s = 4  # supersample for smooth edges
    S = size * s
    img = Image.new("RGBA", (S, S), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)

    if maskable:
        d.rectangle([0, 0, S, S], fill=BG)
        k = 0.78  # keep glyph inside the 80% safe zone
    else:
        d.rounded_rectangle([0, 0, S - 1, S - 1], radius=int(S * 0.22), fill=BG)
        k = 1.0

    def P(x, y):
        cx = S / 2 + (x - 280) * k * S / 512
        cy = S / 2 + (y - 258) * k * S / 512
        return (cx, cy)

    # '>' chevron (points in 512-space)
    chevron = [
        P(150, 150), P(262, 258), P(150, 366),
        P(150, 308), P(208, 258), P(150, 208),
    ]
    d.polygon(chevron, fill=FG)
    # '_' underscore
    d.rectangle([P(286, 330), P(410, 372)], fill=FG)

    img = img.resize((size, size), Image.LANCZOS)
    return img


draw_icon(192).save("icons/icon-192.png")
draw_icon(512).save("icons/icon-512.png")
draw_icon(512, maskable=True).save("icons/icon-maskable-512.png")
print("icons written:", sorted(os.listdir("icons")))
