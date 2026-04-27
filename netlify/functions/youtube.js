const API_KEY = process.env.YOUTUBE_API_KEY;
const CHANNEL_ID = "UCDKKAnNFwIjGhNDvCTycanw";

exports.handler = async (event) => {
  const type = event.queryStringParameters?.type || "videos";

  let url;
  if (type === "stats") {
    url = `https://www.googleapis.com/youtube/v3/channels?key=${API_KEY}&id=${CHANNEL_ID}&part=statistics`;
  } else {
    url = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=15`;
  }

  try {
    const res = await fetch(url);
    const data = await res.json();
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch YouTube data" })
    };
  }
};
