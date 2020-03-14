#!/usr/bin/env python3
"""
Joseph Hensersky
Program for cropping image into a square
"""
import sys
from PIL import Image

FIND_CENTER = lambda x, y: int((x-y)/2) # for finding location to paste image in created square

def crop_image(img):
    """Return cropped image object."""
    fill_color = (0, 0, 0, 0) # black background
    width, height = img.width, img.height
    size = max(width, height)
    square_img = Image.new('RGB', (size, size), fill_color)
    square_img.paste(img, (FIND_CENTER(size, width), FIND_CENTER(size, height)))
    return square_img

def main(image_file, out_file):
    """Open image file and save new, cropped image."""
    og_image = Image.open(image_file)
    new_image = crop_image(og_image)
    new_image.save(out_file, og_image.format)

if __name__ == "__main__":
    IMAGE_NAME = ""
    OUTPUT_NAME = ""
    try:
        IMAGE_NAME = sys.argv[1]
        OUTPUT_NAME = sys.argv[2]
    except IndexError:
        print("Usage: ./image_resize.py image_name output_file")
        sys.exit(1)

    main(IMAGE_NAME, OUTPUT_NAME)
