import os
import re


def extract_css_classes(css_file):
    """Extracts CSS class names from a CSS file."""
    with open(css_file, 'r', encoding='utf-8') as f:
        css_content = f.read()
    css = set(re.findall(r'\.\w.+{', css_content))
    return [c.replace('{', "") for c in css]


def is_class_used(css_class, files):
    """Checks if a CSS class is used in any file within a directory."""
    pattern = re.compile(r'class=["\'].*?\b' + re.escape(css_class) + r'\b.*?["\']', re.IGNORECASE)

    for file in files:
        try:
            with open(file, 'r', encoding='utf-8', errors='ignore') as f:
                if pattern.search(f.read()):
                    return True
        except Exception:
            pass  # Ignore files that can't be read
    return False


def clean_css_file(css_file, directory):
    """Removes unused CSS classes from the CSS file."""
    classes = extract_css_classes(css_file)
    print (classes)

    all_files = [os.path.join(root, file) for root, _, files in os.walk(directory) for file in files if
                 file.endswith(('.html', '.js', '.jsx', '.ts', '.tsx', '.mdx'))]

    print(all_files)

    used_classes = {cls for cls in classes if is_class_used(cls, all_files)}

    print(used_classes)
    used = []

    for file in all_files:
        with open(file, 'r', encoding='utf-8', errors='ignore') as f:

            for cls in used_classes:
                if cls in f:
                    print (f'class used {cls}')
                    used.append(cls)

    list(used_classes) + [item for item in used if item not in used_classes]

    print (used_classes)


if __name__ == "__main__":
    css_path = "./src/style/globals.css"
    dir_path = "./src/content"

    if os.path.isfile(css_path) and os.path.isdir(dir_path):
        clean_css_file(css_path, dir_path)
        print("Unused CSS classes removed.")
    else:
        print("Invalid file or directory path.")
