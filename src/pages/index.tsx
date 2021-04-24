import React, { useMemo } from 'react';
import Head from 'next/head';
import styles from './index.module.css';
import { useBodyPix } from '../libs/createBodyPixStream';

const Page = () => {
  const { stream, segment } = useBodyPix();
  /*
  const param = useMemo(() => {
    if (!segment || !segment.allPoses[0].keypoints) return undefined;
    const { width, height } = segment;
    //三点座標を抽出
    const poses = segment.allPoses[0].keypoints
      .filter((pos) => ['nose', 'leftEye', 'rightEye'].includes(pos.part))
      .map(({ position }) => [position.x - width / 2, position.y - height / 2]);
    //中心の計算
    const center = poses
      .reduce((a, b) => [a[0] + b[0], a[1] + b[1]], [0, 0])
      .map((v) => v / poses.length);
    //距離
    const length = Math.max(
      ...poses.map((pos) =>
        Math.sqrt(Math.pow(pos[0] - center[0], 2) + Math.pow(pos[1] - center[1], 2))
      )
    );
    return { center, length };
  }, [segment]);*/
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width,initial-scale=1.0" />
      </Head>
      <div className={styles.videoList}>
        {stream && (
          <video
            className={styles.video}
            muted
            autoPlay
            ref={(video) => video && video.srcObject !== stream && (video.srcObject = stream)}
          />
        )}
        {segment?.allPoses[0].keypoints
          .filter((pos) =>
            ['nose', 'leftEye', 'rightEye', 'leftEar', 'rightEar'].includes(pos.part)
          )
          .map(({ part, position: { x, y } }) => (
            <div key={part} className={styles.parts} style={{ left: x + 'px', top: y + 'px' }}>
              {{ nose: '鼻', leftEye: '目', rightEye: '目', leftEar: '耳', rightEar: '耳' }[part]}
            </div>
          ))}
      </div>
      {/* <pre>{JSON.stringify(param, undefined, '  ')}</pre> */}
      <pre>{JSON.stringify(segment?.allPoses, undefined, '  ')}</pre>
    </>
  );
};

export default Page;
