import React, { useState, useEffect } from "react";

function Gif(props) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!loading && props.gifLoaded) {
      props.gifLoaded();
    }
  }, [props, loading]);

  return (
    <video
      className={`grid-item video ${!loading && "loaded"}`}
      autoPlay
      loop
      playsInline
      muted
      src={props.images.original.mp4}
      onCanPlayThrough={() => setLoading(false)}
      onClick={props.fetchOnClick}
    />
  );
}

export default Gif;
