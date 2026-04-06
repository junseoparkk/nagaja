'use client';

import { forwardRef, useEffect, useState } from 'react';
import type { ResultData } from '@/types';

interface ResignationCardProps {
  result: ResultData;
  name: string;
  percent: number | null;
}

const GRADE_COLORS = {
  green: '#27ae60',
  yellow: '#f39c12',
  orange: '#e67e22',
  red: '#c0392b',
};

const ResignationCard = forwardRef<HTMLDivElement, ResignationCardProps>(
  function ResignationCard({ result, name, percent }, ref) {
    const displayPercent = percent ?? result.defaultPercent;
    const [barWidth, setBarWidth] = useState(0);
    const [stampVisible, setStampVisible] = useState(false);

    useEffect(() => {
      const t1 = setTimeout(() => setBarWidth(displayPercent), 100);
      const t2 = setTimeout(() => setStampVisible(true), 1000);
      return () => { clearTimeout(t1); clearTimeout(t2); };
    }, [displayPercent]);

    const sender = name ? `${name} (본인)` : '본인 (마음속 퇴사 담당자)';
    const subject = name ? `${name}의 퇴직 의사 표명의 건` : '퇴직 의사 표명의 건';
    const today = new Date();
    const dateStr = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`;
    const accentColor = GRADE_COLORS[result.gradeColor];

    return (
      <div
        ref={ref}
        style={{
          background: '#fefefe',
          border: '1px solid #d8d4cc',
          boxShadow:
            '0 1px 3px rgba(0,0,0,0.06), 0 8px 32px rgba(0,0,0,0.08), inset 0 0 0 5px #fefefe, inset 0 0 0 6px #d8d4cc',
          padding: '24px 22px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Paper texture */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'repeating-linear-gradient(0deg, transparent, transparent 27px, rgba(0,0,0,0.025) 27px, rgba(0,0,0,0.025) 28px)',
            pointerEvents: 'none',
          }}
        />

        {/* Doc meta */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: 12,
            fontSize: 10,
            color: '#aaa',
            letterSpacing: '0.04em',
            fontFamily: 'Noto Serif KR, serif',
          }}
        >
          <span>{result.docNum}</span>
          <span>{result.dept}</span>
        </div>

        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: 16 }}>
          <div style={{ width: '100%', height: 1, background: '#1a1a1a', marginBottom: 8 }} />
          <h2
            style={{
              fontFamily: 'Noto Serif KR, serif',
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: '0.6em',
              color: '#1a1a1a',
              textIndent: '0.6em',
            }}
          >
            사 직 서
          </h2>
          <div style={{ width: '100%', height: 2, background: '#1a1a1a', marginTop: 8 }} />
        </div>

        {/* Header fields */}
        <div style={{ marginBottom: 0, display: 'flex', flexDirection: 'column' }}>
          {[
            { label: '수 신', value: '대표이사 귀중' },
            { label: '발 신', value: sender },
            { label: '제 목', value: subject },
          ].map((field, i, arr) => (
            <div
              key={field.label}
              style={{
                display: 'flex',
                fontSize: 12,
                borderBottom: i < arr.length - 1 ? '1px solid #e8e4dc' : 'none',
                paddingBottom: i < arr.length - 1 ? 7 : 0,
                paddingTop: i > 0 ? 7 : 0,
              }}
            >
              <span
                style={{
                  fontWeight: 700,
                  color: '#1a1a1a',
                  minWidth: 48,
                  fontFamily: 'Noto Serif KR, serif',
                  letterSpacing: '0.05em',
                  flexShrink: 0,
                }}
              >
                {field.label}
              </span>
              <span style={{ marginRight: 10, color: '#1a1a1a', flexShrink: 0 }}>:</span>
              <span style={{ color: '#555', lineHeight: 1.4 }}>{field.value}</span>
            </div>
          ))}
        </div>

        {/* Dashed divider */}
        <hr style={{ border: 'none', borderTop: '1px dashed #c8c4bc', margin: '14px 0' }} />

        {/* Body */}
        <p
          style={{
            fontSize: 12,
            color: '#666',
            lineHeight: 1.8,
            fontFamily: 'Noto Serif KR, serif',
            letterSpacing: '0.02em',
            marginBottom: 10,
          }}
        >
          본인은 아래와 같은 사유로 퇴직 의사를 밝히며,
          <br />
          예상 퇴사일을 다음과 같이 통보합니다.
        </p>

        {/* Reason box */}
        <div
          style={{
            background: 'rgba(192,57,43,0.07)',
            borderLeft: '3px solid #c0392b',
            padding: '10px 14px',
            marginBottom: 12,
            borderRadius: '0 4px 4px 0',
          }}
        >
          <div
            style={{
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: '0.15em',
              color: '#c0392b',
              marginBottom: 5,
              textTransform: 'uppercase',
            }}
          >
            퇴 사 사 유
          </div>
          <div
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: '#1a1a1a',
              lineHeight: 1.55,
              fontFamily: 'Noto Serif KR, serif',
              whiteSpace: 'pre-line',
            }}
          >
            {result.reason}
          </div>
        </div>

        {/* Burnout bar */}
        <div style={{ marginBottom: 10 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', color: '#777', textTransform: 'uppercase' }}>
              퇴사 욕구 지수
            </span>
            <span style={{ fontSize: 18, fontWeight: 900, color: '#c0392b' }}>
              {displayPercent}%
            </span>
          </div>
          <div style={{ height: 5, background: '#ddd8d0', borderRadius: 100, overflow: 'hidden' }}>
            <div
              style={{
                height: '100%',
                background: 'linear-gradient(90deg, #c0392b, #e74c3c)',
                borderRadius: 100,
                width: `${barWidth}%`,
                transition: 'width 1.2s cubic-bezier(0.22, 1, 0.36, 1)',
              }}
            />
          </div>
        </div>

        {/* Grade */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', color: '#777', textTransform: 'uppercase' }}>
            판 정 등 급
          </span>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              fontSize: 11,
              fontWeight: 700,
              padding: '3px 12px',
              borderRadius: 100,
              border: `1.5px solid ${accentColor}`,
              color: accentColor,
            }}
          >
            {result.grade}
          </span>
        </div>

        {/* Dashed divider */}
        <hr style={{ border: 'none', borderTop: '1px dashed #c8c4bc', margin: '14px 0' }} />

        {/* 퇴사 예정일 */}
        <div style={{ display: 'flex', fontSize: 12 }}>
          <span
            style={{
              fontWeight: 700,
              color: '#1a1a1a',
              minWidth: 68,
              fontFamily: 'Noto Serif KR, serif',
              letterSpacing: '0.04em',
              flexShrink: 0,
            }}
          >
            퇴사 예정일
          </span>
          <span style={{ marginRight: 10, color: '#1a1a1a', flexShrink: 0 }}>:</span>
          <span style={{ fontWeight: 700, color: '#c0392b', fontSize: 14 }}>
            {result.resignDate}
          </span>
        </div>

        {/* Footer */}
        <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 12 }}>
          <div style={{ fontSize: 11, color: '#777', fontFamily: 'Noto Serif KR, serif', letterSpacing: '0.04em' }}>
            {dateStr}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, position: 'relative' }}>
            {/* Stamp */}
            <div
              style={{
                position: 'absolute',
                top: '50%',
                right: -8,
                transform: 'translateY(-50%) rotate(-18deg)',
                width: 60,
                height: 60,
                border: `2.5px solid ${accentColor}`,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: accentColor,
                fontSize: 10,
                fontWeight: 900,
                letterSpacing: '0.05em',
                fontFamily: 'Noto Serif KR, serif',
                opacity: stampVisible ? 0.75 : 0,
                transition: 'opacity 0.4s',
                textAlign: 'center',
                lineHeight: 1.3,
                whiteSpace: 'pre-line',
              }}
            >
              {result.stampText}
            </div>
            <div style={{ width: 120, height: 1, background: '#1a1a1a' }} />
            <div style={{ fontSize: 10, color: '#aaa', letterSpacing: '0.08em', fontFamily: 'Noto Serif KR, serif' }}>
              위 사람 서명
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default ResignationCard;
