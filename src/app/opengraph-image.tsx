import { ImageResponse } from "next/og"

export const alt = "ShyGuy — student developer building games, apps, and robots"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "#0b0d10",
          padding: "80px 88px",
        }}
      >
        <div
          style={{
            display: "flex",
            width: 72,
            height: 6,
            borderRadius: 999,
            backgroundColor: "#14b8a6",
            marginBottom: 40,
          }}
        />
        <div
          style={{
            display: "flex",
            fontSize: 92,
            fontWeight: 600,
            color: "#e7e9ec",
            letterSpacing: -3,
            lineHeight: 1,
          }}
        >
          ShyGuy
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 28,
            fontSize: 36,
            lineHeight: 1.35,
            color: "#d5d8de",
            maxWidth: 980,
          }}
        >
          Student developer building games, apps, and robots
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: 36,
            fontSize: 26,
            color: "#8a93a0",
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 999,
              backgroundColor: "#14b8a6",
              marginRight: 14,
            }}
          />
          Currently exploring spatial intelligence and computer vision
        </div>
      </div>
    ),
    { ...size },
  )
}
