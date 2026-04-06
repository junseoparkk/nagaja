import { ImageResponse } from 'next/og';

export const alt = '내 퇴사일은 언제일까?';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#fafafa',
          gap: 24,
        }}
      >
        {/* Card */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#ffffff',
            border: '2px solid #e4e4e7',
            borderRadius: 32,
            padding: '60px 80px',
            gap: 20,
            boxShadow: '0 4px 40px rgba(0,0,0,0.06)',
          }}
        >
          <div style={{ fontSize: 72 }}>📋</div>
          <div
            style={{
              fontSize: 52,
              fontWeight: 700,
              color: '#09090b',
              letterSpacing: '-1px',
            }}
          >
            내 퇴사일은 언제일까?
          </div>
          <div
            style={{
              fontSize: 28,
              color: '#71717a',
              marginTop: 4,
            }}
          >
            8개 질문으로 알아보는 나의 예상 퇴사일
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#09090b',
              color: '#ffffff',
              borderRadius: 100,
              padding: '16px 40px',
              fontSize: 24,
              fontWeight: 600,
              marginTop: 12,
            }}
          >
            퇴사일 계산하기 →
          </div>
        </div>
      </div>
    ),
    size,
  );
}
