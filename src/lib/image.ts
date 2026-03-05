import fs from "fs";
import path from "path";
import {cache} from "react";

/**
 * 로컬 이미지 경로에서 blur data URL을 생성한다.
 * Sharp를 사용해 10×10으로 다운샘플링 후 JPEG base64로 인코딩한다.
 *
 * - SVG: 최적화 대상 아님 → undefined 반환
 * - 외부 URL: 원격 fetch 없이 → undefined
 * - 로컬 파일 없음 / 처리 실패: undefined 반환
 */
export const getBlurDataURL = cache(async (imageSrc: string): Promise<string | undefined> => {
  if (!imageSrc.startsWith("/") || imageSrc.endsWith(".svg")) return undefined;

  try {
    const fullPath = path.join(process.cwd(), "public", imageSrc);
    if (!fs.existsSync(fullPath)) return undefined;

    const {default: sharp} = await import("sharp");
    const buffer = await sharp(fullPath)
      .resize(10, 10, {fit: "inside"})
      .jpeg({quality: 10})
      .toBuffer();

    return `data:image/jpeg;base64,${buffer.toString("base64")}`;
  } catch {
    return undefined;
  }
});
