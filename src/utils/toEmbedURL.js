const YOUTUBE_VIDEO_ID = /^[A-Za-z0-9_-]{11}$/;

// Turns any YouTube link into the "embed" form an <iframe> needs.
// Returns: '' for an empty link, null for a link we can't use, otherwise the URL to embed.
export default function toEmbedURL(link) {
  const trimmed = (link ?? '').trim();
  if (trimmed === '') {
    return '';
  }

  let url;
  try {
    url = new URL(trimmed);
  } catch {
    return null;
  }
  if (url.protocol !== 'https:' && url.protocol !== 'http:') {
    return null;
  }

  const host = url.hostname.replace(/^(www\.|m\.)/, '');
  let videoId = null;

  if (host === 'youtu.be') {
    videoId = url.pathname.split('/')[1];
  } else if (host === 'youtube.com' || host === 'youtube-nocookie.com') {
    if (url.pathname === '/watch') {
      videoId = url.searchParams.get('v');
    } else {
      const [, kind, id] = url.pathname.split('/');
      if (kind === 'embed' || kind === 'shorts' || kind === 'live') {
        videoId = id;
      }
    }
  } else {
    // Not YouTube (e.g. a Vimeo player link): use it exactly as given.
    return trimmed;
  }

  if (videoId && YOUTUBE_VIDEO_ID.test(videoId)) {
    return `https://www.youtube.com/embed/${videoId}`;
  }
  return null;
}