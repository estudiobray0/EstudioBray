import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Estudio Bray: sitios web desde cero, a tu medida";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const en = locale === "en";

  const [regular, semibold, mark, portrait] = await Promise.all([
    readFile(join(process.cwd(), "fonts/Inter-Regular.ttf")),
    readFile(join(process.cwd(), "fonts/Inter-SemiBold.ttf")),
    readFile(join(process.cwd(), "public/icon-b-v2.png")),
    readFile(join(process.cwd(), "public/bray-portrait.png")),
  ]);

  const copy = en
    ? {
        kicker: "Websites from scratch",
        title: "Your site, how you want it.",
        body: "I build each site from scratch, with you.",
      }
    : {
        kicker: "Sitios web desde cero",
        title: "Tu sitio, como tú lo quieres.",
        body: "Armo cada sitio desde cero, contigo.",
      };

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#e8e0d6",
          color: "#3c332b",
          fontFamily: "Inter",
          padding: "72px 80px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            flex: 1,
            marginRight: 56,
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                width: 14,
                height: 14,
                borderRadius: 14,
                background: "#a68b6e",
                marginRight: 8,
              }}
            />
            <div
              style={{
                width: 14,
                height: 14,
                borderRadius: 14,
                background: "#8b9b82",
                marginRight: 8,
              }}
            />
            <div
              style={{
                width: 14,
                height: 14,
                borderRadius: 14,
                background: "#7a9db9",
                marginRight: 16,
              }}
            />
            <div
              style={{
                display: "flex",
                fontSize: 28,
                fontWeight: 600,
                letterSpacing: "-0.03em",
              }}
            >
              Estudio Bray
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                fontSize: 28,
                color: "#a68b6e",
                marginBottom: 18,
              }}
            >
              {copy.kicker}
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 68,
                fontWeight: 600,
                lineHeight: 1.05,
                letterSpacing: "-0.04em",
                maxWidth: 640,
              }}
            >
              {copy.title}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 28,
              color: "#6b5e52",
              lineHeight: 1.35,
              maxWidth: 640,
            }}
          >
            {copy.body}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              width: 248,
              height: 310,
              overflow: "hidden",
              borderRadius: 24,
              border: "1px solid #d4c8ba",
              background: "#fff",
            }}
          >
            <img
              src={`data:image/jpeg;base64,${portrait.toString("base64")}`}
              width={248}
              height={310}
              alt=""
              style={{
                objectFit: "cover",
                objectPosition: "58% 12%",
              }}
            />
          </div>
          <img
            src={`data:image/png;base64,${mark.toString("base64")}`}
            width={168}
            height={168}
            alt=""
            style={{ marginLeft: 28 }}
          />
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Inter", data: regular, weight: 400, style: "normal" },
        { name: "Inter", data: semibold, weight: 600, style: "normal" },
      ],
    },
  );
}
