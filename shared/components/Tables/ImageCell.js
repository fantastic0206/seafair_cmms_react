import React from 'react';

const PendingPool = {};
const ReadyPool = {};

export default function ImageCell({ src }) {
  const [srcState, setSrcState] = React.useState(false);

  const onLoadImage = React.useCallback(
    (source) => {
      ReadyPool[src] = true;
      if (source === src) {
        setSrcState(source);
      }
    },
    [src]
  );
  const loadImage = React.useCallback(
    (src) => {
      if (ReadyPool[src]) {
        setSrcState(src);
        return;
      }

      if (PendingPool[src]) {
        PendingPool[src].push(onLoadImage);
        return;
      }
      PendingPool[src] = [onLoadImage];

      const img = new Image();
      img.onload = () => {
        PendingPool[src].forEach((callback) => {
          callback(src);
        });
        delete PendingPool[src];
        img.onload = null;
        src = undefined;
      };
      img.src = srcState;
    },
    [srcState, onLoadImage]
  );
  React.useEffect(() => {
    loadImage(src);
  }, [loadImage, src]);
  const style = src
    ? {
        backgroundImage: `url(${src})`,
        width: '70px',
        height: '70px',
        backgroundSize: 'cover',
      }
    : undefined;
  return <div className="exampleImage" style={style} />;
}
