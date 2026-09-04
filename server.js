import page from "./index.html?raw";
import styles from "./styles.css?raw";
import favicon from "./favicon.svg?raw";
import portraitDataUrl from "./images/krunal-shah.jpg?inline";

const portraitBase64 = portraitDataUrl.split(",", 2)[1];

function binaryFromBase64(base64) {
  const decoded = atob(base64);
  const bytes = new Uint8Array(decoded.length);

  for (let index = 0; index < decoded.length; index += 1) {
    bytes[index] = decoded.charCodeAt(index);
  }

  return bytes;
}

const portrait = binaryFromBase64(portraitBase64);

const assets = new Map([
  ["/", [page, "text/html; charset=utf-8"]],
  ["/index.html", [page, "text/html; charset=utf-8"]],
  ["/styles.css", [styles, "text/css; charset=utf-8"]],
  ["/favicon.svg", [favicon, "image/svg+xml"]],
  ["/images/krunal-shah.jpg", [portrait, "image/jpeg"]]
]);

export default {
  fetch(request) {
    const { pathname } = new URL(request.url);
    const asset = assets.get(pathname);

    if (!asset) {
      return new Response("Not found", { status: 404 });
    }

    const [body, contentType] = asset;
    return new Response(request.method === "HEAD" ? null : body, {
      headers: {
        "Cache-Control": pathname === "/" || pathname === "/index.html"
          ? "public, max-age=300"
          : "public, max-age=86400",
        "Content-Type": contentType,
        "X-Content-Type-Options": "nosniff"
      }
    });
  }
};
