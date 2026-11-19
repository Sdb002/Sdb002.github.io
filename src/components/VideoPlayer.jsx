import { useState } from "react";

// YouTube player in the same window frame as the screenshot gallery.
// Shows the video thumbnail first and only loads the YouTube iframe on click,
// so the page stays fast and no YouTube cookies are set until the visitor plays.
export default function VideoPlayer({ id, title, caption = title }) {
  const [playing, setPlaying] = useState(false);
  const src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`;

  return (
    <figure className="gallery video">
      <div className="shot-bar">
        <span className="dot" /><span className="dot" /><span className="dot" />
        <span className="shot-cap">{caption}</span>
        <a
          className="video-ext"
          href={`https://www.youtube.com/watch?v=${id}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          youtube ↗
        </a>
      </div>
      <div className="video-frame">
        {playing ? (
          <iframe
            src={src}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        ) : (
          <button type="button" className="video-poster" onClick={() => setPlaying(true)} aria-label={`Play video: ${title}`}>
            <img src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`} alt="" loading="lazy" decoding="async" onError={(e) => { e.currentTarget.style.display = "none"; }} />
            <span className="video-play" aria-hidden="true" />
          </button>
        )}
      </div>
    </figure>
  );
}
