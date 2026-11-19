import {CELEBRATION_CONTENT, PROJECT_IDENTITY} from '../data/content';

export async function downloadKeepsakeCard(): Promise<void> {
  const width = 1080;
  const height = 1440;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Background deep wine to burgundy gradient
  const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
  bgGrad.addColorStop(0, '#491725');
  bgGrad.addColorStop(0.5, '#36131E');
  bgGrad.addColorStop(1, '#260C14');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // Subtle ambient warm glow in top center
  const glow = ctx.createRadialGradient(width / 2, 260, 20, width / 2, 260, 460);
  glow.addColorStop(0, 'rgba(214, 183, 124, 0.22)');
  glow.addColorStop(1, 'rgba(214, 183, 124, 0)');
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, width, height);

  // Outer antique gold frame
  ctx.strokeStyle = 'rgba(214, 183, 124, 0.55)';
  ctx.lineWidth = 2;
  ctx.strokeRect(48, 48, width - 96, height - 96);

  // Inner warm ivory parchment card
  const cardX = 88;
  const cardY = 120;
  const cardW = width - 176;
  const cardH = height - 240;

  ctx.fillStyle = '#F8F0E2';
  ctx.fillRect(cardX, cardY, cardW, cardH);

  // Double hairline gold border inside parchment
  ctx.strokeStyle = 'rgba(214, 183, 124, 0.75)';
  ctx.lineWidth = 2;
  ctx.strokeRect(cardX + 22, cardY + 22, cardW - 44, cardH - 44);

  ctx.strokeStyle = 'rgba(150, 60, 76, 0.22)';
  ctx.lineWidth = 1;
  ctx.strokeRect(cardX + 34, cardY + 34, cardW - 68, cardH - 68);

  // Corner gold accents
  const corners = [
    [cardX + 22, cardY + 22],
    [cardX + cardW - 22, cardY + 22],
    [cardX + 22, cardY + cardH - 22],
    [cardX + cardW - 22, cardY + cardH - 22],
  ];
  ctx.fillStyle = '#D6B77C';
  for (const [cx, cy] of corners) {
    ctx.beginPath();
    ctx.arc(cx, cy, 5, 0, Math.PI * 2);
    ctx.fill();
  }

  // Stylized peach blossom branch decoration at top
  drawBlossomSpray(ctx, width / 2, cardY + 125);

  // Small top title
  ctx.textAlign = 'center';
  ctx.fillStyle = '#963C4C';
  ctx.font = '500 26px "Plus Jakarta Sans", sans-serif';
  ctx.fillText(PROJECT_IDENTITY.title, width / 2, cardY + 225);

  ctx.fillStyle = '#BD8584';
  ctx.font = '400 28px "Noto Serif SC", "Songti SC", serif';
  ctx.fillText(PROJECT_IDENTITY.chineseSubtitle, width / 2, cardY + 275);

  // Gold divider line
  ctx.strokeStyle = 'rgba(214, 183, 124, 0.8)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(width / 2 - 90, cardY + 320);
  ctx.lineTo(width / 2 + 90, cardY + 320);
  ctx.stroke();

  // Main Chinese & English birthday headline
  ctx.fillStyle = '#541C2B';
  ctx.font = '600 66px "Noto Serif SC", "Songti SC", serif';
  ctx.fillText(CELEBRATION_CONTENT.chineseHeading, width / 2, cardY + 430);

  ctx.fillStyle = '#49302E';
  ctx.font = '600 58px "Cormorant Garamond", Georgia, serif';
  ctx.fillText(CELEBRATION_CONTENT.englishHeading, width / 2, cardY + 515);

  // Heartfelt friendship quote
  ctx.fillStyle = '#49302E';
  ctx.font = 'italic 400 38px "Cormorant Garamond", Georgia, serif';
  wrapText(
    ctx,
    `"${CELEBRATION_CONTENT.finalMessage}"`,
    width / 2,
    cardY + 640,
    cardW - 180,
    54
  );

  // Second warm line
  ctx.fillStyle = '#6E4C49';
  ctx.font = '400 28px "Cormorant Garamond", Georgia, serif';
  wrapText(
    ctx,
    "Even though we're thousands of miles apart, I'm genuinely happy that our paths crossed.",
    width / 2,
    cardY + 805,
    cardW - 220,
    42
  );

  // Red wax seal motif at bottom center
  const sealX = width / 2;
  const sealY = cardY + cardH - 220;
  ctx.fillStyle = '#963C4C';
  ctx.beginPath();
  ctx.arc(sealX, sealY, 44, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = '#D6B77C';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(sealX, sealY, 36, 0, Math.PI * 2);
  ctx.stroke();

  ctx.fillStyle = '#F8F0E2';
  ctx.font = '600 34px "Noto Serif SC", "Songti SC", serif';
  ctx.fillText('友', sealX, sealY + 12);

  // Signature
  ctx.fillStyle = '#541C2B';
  ctx.font = '500 26px "Cormorant Garamond", Georgia, serif';
  ctx.fillText(CELEBRATION_CONTENT.signature, width / 2, cardY + cardH - 110);

  ctx.fillStyle = '#963C4C';
  ctx.font = '400 20px "Plus Jakarta Sans", sans-serif';
  ctx.fillText(`For ${PROJECT_IDENTITY.recipient} · From ${PROJECT_IDENTITY.sender}`, width / 2, cardY + cardH - 72);

  // Download PNG
  const dataUrl = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.download = 'a-thousand-miles-one-friendship-zai-zai.png';
  link.href = dataUrl;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function drawBlossomSpray(ctx: CanvasRenderingContext2D, cx: number, cy: number) {
  ctx.save();
  ctx.strokeStyle = '#7A4F48';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(cx - 110, cy + 16);
  ctx.quadraticCurveTo(cx - 20, cy - 12, cx + 115, cy + 6);
  ctx.stroke();

  const flowers = [
    {x: cx - 48, y: cy + 2, r: 14},
    {x: cx, y: cy - 6, r: 18},
    {x: cx + 52, y: cy + 3, r: 13},
  ];

  for (const flower of flowers) {
    for (let i = 0; i < 5; i++) {
      const angle = (i * Math.PI * 2) / 5 - Math.PI / 2;
      const px = flower.x + Math.cos(angle) * (flower.r * 0.65);
      const py = flower.y + Math.sin(angle) * (flower.r * 0.65);
      ctx.fillStyle = '#EAB6AD';
      ctx.beginPath();
      ctx.arc(px, py, flower.r * 0.52, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.fillStyle = '#D6B77C';
    ctx.beginPath();
    ctx.arc(flower.x, flower.y, flower.r * 0.25, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number
) {
  const words = text.split(' ');
  let line = '';
  let currentY = y;

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && n > 0) {
      ctx.fillText(line.trim(), x, currentY);
      line = words[n] + ' ';
      currentY += lineHeight;
    } else {
      line = testLine;
    }
  }
  if (line.trim()) {
    ctx.fillText(line.trim(), x, currentY);
  }
}
