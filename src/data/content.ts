export interface PhotoEntry {
  id: 'zai-1' | 'zai-2' | 'zai-3';
  src: string;
  alt: string;
  title: string;
  caption: string;
  chineseCaption: string;
  chineseNote: string;
  tiltClass: string;
}

export interface EnvelopeNote {
  id: string;
  indexLabel: string;
  theme: string;
  chineseTheme: string;
  message: string;
  chineseMessage: string;
}

export interface ChapterMeta {
  index: number;
  code: string;
  title: string;
  shortTitle: string;
}

export const PROJECT_IDENTITY = {
  title: 'A Thousand Miles, One Friendship',
  chineseSubtitle: '千里之外，一份友谊',
  tagline: 'A little world created just for you.',
  footerSignature: 'Made with love by Harsh, especially for Zai Zai.',
  chineseFooterSignature: 'Harsh 为 Zai Zai 用心制作',
  recipient: 'Zai Zai',
  sender: 'Harsh',
};

export const CHAPTERS: ChapterMeta[] = [
  {index: 0, code: '01', title: 'The Invitation', shortTitle: 'Invitation'},
  {index: 1, code: '02', title: 'The Garden', shortTitle: 'Garden'},
  {index: 2, code: '03', title: 'Little Things About You', shortTitle: 'Five Notes'},
  {index: 3, code: '04', title: 'A Rose From India', shortTitle: 'The Rose'},
  {index: 4, code: '05', title: 'A Letter Across Miles', shortTitle: 'The Letter'},
];

export const INVITATION_CONTENT = {
  kicker: 'A Little Birthday Surprise, Made by Harsh',
  heading: 'For Zai Zai',
  chineseSubtitle: '生日快乐',
  supportingText:
    'Zai Zai, even across all these miles, I wanted to make something personal that feels close to you.',
  chineseSupportingText: '相隔千里，Harsh 也想为你准备一份贴心的惊喜。',
  buttonLabel: 'Open Your Surprise',
};

export const GARDEN_CONTENT = {
  heading: 'Welcome to Your Little World',
  chineseSubtitle: '愿你每天都开心',
  supportingText:
    'Harsh made this little garden for the moments, conversations, and little things that make our friendship feel close.',
  chineseSupportingText: 'Harsh 为我们的回忆和友情准备了这座小花园。虽然相隔很远，你一直都是我珍惜的朋友。',
  nextButtonLabel: 'Walk Further Into the Garden',
  photos: [
    {
      id: 'zai-1',
      src: '/images/zai-1.jpg',
      alt: 'Photograph of Zai Zai in the garden gallery',
      title: 'Frame I',
      caption: 'A quiet moment worth keeping — wishing you days as bright as your spirit.',
      chineseCaption: '收藏这一刻，也愿你每天都像阳光一样明亮。',
      chineseNote: '岁岁欢愉',
      tiltClass: '-rotate-2',
    },
    {
      id: 'zai-2',
      src: '/images/zai-2.jpg',
      alt: 'Second photograph of Zai Zai',
      title: 'Frame II',
      caption: 'Even from thousands of miles away, it is easy to cheer for everything you do.',
      chineseCaption: '即使远隔千里，我也会一直为你加油。',
      chineseNote: '万事胜意',
      tiltClass: 'rotate-1',
    },
    {
      id: 'zai-3',
      src: '/images/zai-3.jpg',
      alt: 'Third photograph of Zai Zai',
      title: 'Frame III',
      caption: 'Here is to another year of warmth, laughter, and peaceful little moments.',
      chineseCaption: '愿新的一岁，有温暖、欢笑，也有许多平静的小幸福。',
      chineseNote: '前路灿烂',
      tiltClass: '-rotate-1',
    },
  ] as PhotoEntry[],
};

export const ENVELOPE_COLLECTION_CONTENT = {
  heading: 'Five Little Things About You',
  subtitle:
    "Some things deserve to be said, even if we don't say them every day.",
  chineseSubtitle: '有些心里话，值得好好说给你听。',
  chineseAccent: '见字如晤',
  nextButtonLabel: 'Continue to A Rose From India',
  envelopes: [
    {
      id: 'heart',
      indexLabel: '01',
      theme: 'Your Beautiful Heart',
      chineseTheme: '善良如初',
      message:
        'You carry a rare kind of warmth that makes people around you feel genuinely heard and cared for.',
      chineseMessage: '你有一种难得的温柔，总能让身边的人感受到被理解、被珍惜。',
    },
    {
      id: 'smile',
      indexLabel: '02',
      theme: 'Your Smile',
      chineseTheme: '笑靥如花',
      message:
        'No matter how ordinary or busy a day feels, your cheerfulness brings an effortless light into it.',
      chineseMessage: '无论日子平凡还是忙碌，你的笑容总能带来轻松的光亮。',
    },
    {
      id: 'uniqueness',
      indexLabel: '03',
      theme: 'Your Uniqueness',
      chineseTheme: '独一无二',
      message:
        "There is only one Zai Zai in this entire world, and that's what makes you special.",
      chineseMessage: '世界上只有一个独一无二的你，这就是你最特别的地方。',
    },
    {
      id: 'friendship',
      indexLabel: '04',
      theme: 'Our Friendship',
      chineseTheme: '山海知己',
      message:
        'Different cities, different time zones, yet every conversation feels effortless and true. Thank you for being in my corner.',
      chineseMessage: '我们身在不同的城市，隔着不同的时区，但每次聊天都那么自然真诚。谢谢你一直陪伴着我。',
    },
    {
      id: 'future',
      indexLabel: '05',
      theme: 'Your Future',
      chineseTheme: '前程似锦',
      message:
        'May the year ahead bring you calm mornings, proud milestones, safe journeys, and quiet joy in abundance.',
      chineseMessage: '愿新的一年有宁静的清晨、值得骄傲的时刻、平安的旅途，还有数不尽的小欢喜。',
    },
  ] as EnvelopeNote[],
};

export const ROSE_CONTENT = {
  heading: 'A Rose From India',
  chineseSubtitle: '千里寄花',
  imageSrc: '/images/my-rose.jpg',
  imageAlt: 'Harsh in India holding a rose for Zai Zai',
  supportingText:
    "I couldn't send you a real flower across the distance, so I wanted to share this little moment with you instead.",
  chineseSupportingText: '虽然不能把真正的花送到你身边，Harsh 还是想把这份来自印度的心意寄给你。',
  buttonLabel: 'Touch the Rose',
  revealedMessage: [
    'If I could send you one thing today, it would be a rose with a reminder: you deserve all the beautiful things in life.',
    'Happy birthday, Zai Zai.',
  ],
  chineseRevealedMessage: '愿你被生活温柔以待，也愿所有美好的事情都来到你身边。生日快乐！',
  revealedSignature: 'With love, Harsh.',
  chineseRevealedSignature: '来自 Harsh 的祝福',
  nextButtonLabel: 'Read One Last Letter',
};

export const LETTER_CONTENT = {
  heading: 'One Last Thing...',
  subtitle: 'A letter written especially for you.',
  chineseSubtitle: '这是一封专门写给你的信。',
  chineseSeal: '友',
  openButtonLabel: 'Open Your Letter',
  skipButtonLabel: 'Show Full Letter',
  celebrateButtonLabel: 'Celebrate Birthday',
  paragraphs: [
    'Dear Zai Zai,',
    'Happy birthday!',
    "It's funny how two people living in different countries can become such good friends.",
    "Even though we're thousands of miles apart, I'm genuinely happy that our paths crossed.",
    'I hope this new chapter of your life brings you happiness, confidence, beautiful memories, and everything your heart wishes for.',
    'Thank you for being my friend.',
    'Never stop being the wonderful person you are.',
    'Sending a little rose and lots of warm wishes from India to China.',
    'With friendship,\nHarsh.',
  ],
  chineseParagraphs: [
    '亲爱的 Zai Zai：',
    '生日快乐！',
    '很奇妙，我们身在不同的国家，却成为了这么好的朋友。',
    '虽然相隔千里，我还是很开心，我们的人生轨迹曾有交会。',
    '愿新的一岁带给你快乐、自信、美好的回忆，还有你心中所盼望的一切。',
    '谢谢你成为我的朋友。',
    '请一直做那个美好的你。',
    '从印度寄去一朵小玫瑰，以及满满的祝福，送给远在中国的你。',
    '带着友谊，\nHarsh。',
  ],
};

export const CELEBRATION_CONTENT = {
  chineseHeading: '生日快乐，Zai Zai!',
  englishHeading: 'Happy Birthday, Zai Zai!',
  finalMessage: 'Distance is just geography. Friendship is something else.',
  chineseFinalMessage: '距离只是地图上的数字，友情却能跨越山海。',
  signature: 'Made with love by Harsh, especially for Zai Zai.',
  chineseSignature: 'Harsh 为 Zai Zai 献上最温暖的祝福',
  replayButtonLabel: 'Experience Again',
  keepsakeButtonLabel: 'Keep This Little Memory',
};

export const AUDIO_PATHS = {
  background: '/audio/background.mp3',
  envelope: '/audio/envelope.mp3',
  chime: '/audio/chime.mp3',
  celebration: '/audio/celebration.mp3',
};
