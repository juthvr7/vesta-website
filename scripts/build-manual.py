"""Build a self-contained, searchable HTML manual using Python's standard library."""
import hashlib
import json
from pathlib import Path
import posixpath
import re
import zipfile

ROOT = Path(__file__).resolve().parents[1]
site_config = (ROOT / "content/site-config.mjs").read_text(encoding="utf-8")
edition = re.search(r'updated:\s*"(\d{4}-\d{2}-\d{2})"', site_config).group(1)
stamp = (*map(int, edition.split("-")), 0, 0, 0)
files = {}

for directory in ("validation", "zh/validation", "reference", "zh/reference", "help", "zh/help", "assets/validation"):
    for path in sorted((ROOT / directory).rglob("*")):
        if path.is_file():
            files[path.relative_to(ROOT).as_posix()] = path.read_bytes()
for name in ("vesta-site.css", "validation.css", "validation.js", "manual-search.js",
             "manual-search-index.js", "help-resolver.js", "help-request.js", "help-targets.js", "help-targets.json", "favicon.svg", "assets/worlds/terraces-orbit.mp4",
             "assets/worlds/terraces.webp"):
    files[name] = (ROOT / name).read_bytes()


def offline_html(name, content):
    html = content.decode("utf-8")
    # Preserve a fully static local edition; Worker/module loading needs HTTP(S).
    online = "https://juthvr7.github.io/vesta-website/" + name + "#interactive"
    html = re.sub(r'<!-- explorer:start -->[\s\S]*?<!-- explorer:end -->',
                  '<p class="reference-note"><a href="'+online+'">在线交互查看器 / Open interactive viewer ↗</a></p>', html)
    html = re.sub(r'<link\b[^>]*href="[^"]*explorer\.css[^"]*"[^>]*>', '', html)
    html = re.sub(r'<script\b[^>]*src="[^"]*explorer\.js[^"]*"[^>]*></script>', '', html)
    html = re.sub(r'<a\b[^>]*\bdata-offline-download\b[^>]*>[\s\S]*?</a>',
                  '<span class="manual-offline">离线版 / Offline edition</span>', html)

    def rewrite(match):
        attribute, href = match.groups()
        if href.startswith(("https:", "http:", "mailto:", "#")):
            return match.group(0)
        address, _, fragment = href.partition("#")
        address, _, query = address.partition("?")
        target = posixpath.normpath(posixpath.join(posixpath.dirname(name), address))
        if address.endswith("/"):
            target += "/index.html"
        target = posixpath.normpath(target)
        if target == "index.html":
            target = "validation/index.html"
        elif target == "zh/index.html":
            target = "zh/validation/index.html"
        if target not in files:
            raise ValueError(f"offline link missing: {name} -> {href} ({target})")
        relative = posixpath.relpath(target, posixpath.dirname(name))
        return f'{attribute}="{relative}{"?" + query if query else ""}{"#" + fragment if fragment else ""}"'

    html = re.sub(r'\b(href|src|poster|data-image)="([^"]+)"', rewrite, html)
    return html.encode("utf-8")


for name, content in list(files.items()):
    if name.endswith(".html"):
        files[name] = offline_html(name, content)

files["index.html"] = """<!doctype html><html lang="zh-CN"><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1"><title>Vesta 用户手册 / Manual</title>
<style>body{margin:12vh auto;max-width:650px;padding:25px;background:#101713;color:#e7eedb;font:18px/1.9 system-ui}h1{font-weight:400}a{display:inline-block;padding:12px 25px;margin:15px 15px 15px 0;border:1px solid #a1b890;color:inherit;text-decoration:none}p{color:#a7b99a;font-size:14px}</style>
<h1>Vesta 用户手册<br>Vesta User Manual</h1>
<p>选择语言后，使用目录、全文搜索和章节超链接浏览。图片和视频已包含，无需启动服务器。<br>Choose a language. Browse, search and follow chapter links without a server.</p>
<a href="zh/validation/index.html">简体中文 →</a><a href="validation/index.html">English →</a>
</html>""".encode("utf-8")
files["README.txt"] = """Vesta HTML manual / 离线用户手册
Extract the entire ZIP, then open index.html in a modern browser.
请完整解压，再用现代浏览器打开 index.html。无需启动服务器。
Chapters, full-text search, hyperlinks, images and the included presentation film work locally.
内容包含章节、全文搜索、超链接、图片和已有展示短片。请保留文件夹结构。
This is a dated documentation snapshot. Evidence dates and scope remain separate from packaging.
这是文档快照；打包日期不改变原验证日期与范围。PDF不是本包的主要阅读形式。
""".encode("utf-8")

index_text = files["manual-search-index.js"].decode("utf-8")
search = json.loads(index_text.removeprefix("window.VESTA_MANUAL_INDEX = ").strip().removesuffix(";"))
for page in search:
    if page["path"].split("#", 1)[0] not in files or not page["title"] or not page["body"]:
        raise ValueError("invalid local search entry")

downloads = ROOT / "downloads"
downloads.mkdir(exist_ok=True)
archive = downloads / "vesta-manual.zip"
with zipfile.ZipFile(archive, "w", compression=zipfile.ZIP_DEFLATED, compresslevel=9) as output:
    for name, content in sorted(files.items()):
        entry = zipfile.ZipInfo(name, stamp)
        entry.compress_type = zipfile.ZIP_DEFLATED
        output.writestr(entry, content, compresslevel=9)
with zipfile.ZipFile(archive) as check:
    if check.testzip() is not None:
        raise ValueError("manual archive CRC failed")

manifest = {"schema_version": 1, "edition": edition, "format": "offline-html",
            "entry": "index.html", "languages": ["en", "zh-CN"],
            "search_pages": len({p["path"].split("#", 1)[0] for p in search}), "search_entries": len(search),
            "help_targets_sha256": hashlib.sha256(files["help-targets.json"]).hexdigest(),
            "requires_server": False, "files": len(files), "bytes": archive.stat().st_size,
            "sha256": hashlib.sha256(archive.read_bytes()).hexdigest()}
(downloads / "manual-manifest.json").write_text(json.dumps(manifest, indent=2) + "\n", encoding="utf-8")
print(json.dumps(manifest))
