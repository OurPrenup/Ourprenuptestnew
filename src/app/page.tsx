// @ts-nocheck
"use client";

import { useState, useEffect, useRef } from "react";



/* ── Tweaks ── */
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "heroVariant": "dark",
  "ctaCopy": "Start Your Prenup — $599",
  "ctaSecondary": "See How It Works"
}/*EDITMODE-END*/;

/* ── Icons (inline SVG) ── */
const ArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="2" y1="8" x2="14" y2="8"/><polyline points="9,3 14,8 9,13"/>
  </svg>
);
const ChevronDown = ({open}) => (
  <svg className={`faq-chevron ${open ? 'open' : ''}`} width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <polyline points="5,8 10,13 15,8"/>
  </svg>
);
const Check = ({color='#0D8B8B'}) => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <circle cx="9" cy="9" r="9" fill={color} fillOpacity="0.12"/>
    <polyline points="5,9 8,12 13,6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const Star = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="#E84C88">
    <polygon points="8,1 10,6 15,6 11,9.5 12.5,15 8,12 3.5,15 5,9.5 1,6 6,6"/>
  </svg>
);
const Shield = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#0D8B8B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 2L3 5v5c0 4.4 3 8.1 7 9 4-0.9 7-4.6 7-9V5L10 2z"/>
    <polyline points="7,10 9,12 13,8"/>
  </svg>
);
const Lock = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#0D8B8B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="9" width="12" height="9" rx="2"/><path d="M7 9V6a3 3 0 0 1 6 0v3"/>
  </svg>
);
const Globe = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#0D8B8B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="10" cy="10" r="8"/><line x1="2" y1="10" x2="18" y2="10"/><path d="M10 2a15 15 0 0 1 0 16M10 2a15 15 0 0 0 0 16"/>
  </svg>
);
const Menu = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="3" y1="6" x2="19" y2="6"/><line x1="3" y1="11" x2="19" y2="11"/><line x1="3" y1="16" x2="19" y2="16"/>
  </svg>
);
const X = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="4" y1="4" x2="18" y2="18"/><line x1="18" y1="4" x2="4" y2="18"/>
  </svg>
);

/* ── useCounter hook ── */
function useCounter(target, duration=1500) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      obs.disconnect();
      let start = 0, startTime = null;
      const step = (ts) => {
        if (!startTime) startTime = ts;
        const progress = Math.min((ts - startTime) / duration, 1);
        setCount(Math.floor(progress * target));
        if (progress < 1) requestAnimationFrame(step);
        else setCount(target);
      };
      requestAnimationFrame(step);
    }, { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, duration]);
  return [count, ref];
}

/* ── All 50 states for dropdown ── */
const NAV_STATES = [
  'Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut',
  'Delaware','DC','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana',
  'Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts',
  'Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada',
  'New Hampshire','New Jersey','New Mexico','New York','North Carolina',
  'North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania','Rhode Island',
  'South Dakota','Tennessee','Texas','Utah','Vermont','Virginia','Washington',
  'Wisconsin','Wyoming',
];

/* ── Navbar ── */
function Navbar({heroVariant}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [topBarVisible, setTopBarVisible] = useState(true);
  const dark = heroVariant === 'dark' && !scrolled;

  useEffect(() => {
    const fn = () => {
      setScrolled(window.scrollY > 40);
      setTopBarVisible(window.scrollY < 60);
    };
    window.addEventListener('scroll', fn, {passive: true});
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const textColor = (dark && !scrolled) ? '#fff' : 'var(--navy-dark)';
  const logoColor = (dark && !scrolled) ? '#fff' : 'var(--navy-dark)';
  const navBg = scrolled
    ? 'rgba(250,250,247,0.97)'
    : dark ? 'transparent' : 'rgba(250,250,247,0.85)';

  /* page-level nav links (open their own pages) */
  const pageLinks = [
    { label: 'How It Works', href: '/how-it-works' },
    { label: 'Pricing',      href: '/pricing'      },
    { label: 'Notarization', href: '/notarization' },
    { label: 'About Us',     href: '/about'        },
    { label: 'FAQ',          href: '/faq'          },
  ];

  return (
    <nav style={{
      background: navBg,
      backdropFilter: scrolled || !dark ? 'blur(14px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--border)' : 'none',
      boxShadow: scrolled ? '0 1px 16px rgba(0,0,0,0.07)' : 'none',
      transition: 'background 0.3s, box-shadow 0.3s',
    }}>

      {/* ── Top promo bar ── */}
      {topBarVisible && (
        <div className="top-bar">
          <span>Prenups made simple.</span>
        </div>
      )}

      {/* ── Main nav bar ── */}
      <div className="nav-bar" style={{borderTop: topBarVisible && !scrolled && dark ? '1px solid rgba(255,255,255,0.1)' : 'none'}}>
        <div className="container">
          <div className="nav-inner">

            {/* Logo */}
            <a href="/" className="nav-logo" style={{color: logoColor}}>OurPrenup</a>

            {/* Desktop links */}
            <div className="nav-links" style={{display:'flex'}}>
              {pageLinks.map(({label, href}) => (
                <a key={label} href={href} className="nav-link" style={{color: textColor}}>
                  {label}
                </a>
              ))}

              {/* States hover dropdown */}
              <div className="states-trigger">
                <span className="nav-link" style={{color: textColor, cursor:'default', userSelect:'none'}}>
                  States
                  <svg className="chevron-sm" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <polyline points="2,4 6,8 10,4"/>
                  </svg>
                </span>
                <div className="states-dropdown">
                  <div className="states-dropdown-header">All 50 States + DC</div>
                  {NAV_STATES.map(s => (
                    <a key={s} href={`/states/${s.toLowerCase().replace(/\s+/g,'-')}`}>{s}</a>
                  ))}
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="nav-ctas">
              <a href="/sign-in" className="nav-link" style={{color: textColor}}>Sign In</a>
              <a href="/dashboard" className="btn-primary" style={{padding:'10px 22px', fontSize:14, background: dark && !scrolled ? 'var(--pink)' : 'var(--navy-dark)'}}>
                Get Started
              </a>
            </div>

            {/* Mobile hamburger */}
            <button onClick={() => setMobileOpen(!mobileOpen)}
              style={{display:'none', background:'none', border:'none', cursor:'pointer', color: textColor, padding:4}}
              className="mob-menu">
              {mobileOpen ? <X/> : <Menu/>}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div style={{background:'var(--cream)', borderTop:'1px solid var(--border)', padding:'16px 24px 28px', display:'flex', flexDirection:'column', gap:4}}>
          {pageLinks.map(({label, href}) => (
            <a key={label} href={href} className="nav-link" style={{fontSize:16, color:'var(--navy-dark)', padding:'10px 8px'}}
              onClick={() => setMobileOpen(false)}>{label}</a>
          ))}
          <hr style={{border:'none', borderTop:'1px solid var(--border)', margin:'8px 0'}}/>
          <div style={{fontSize:12, fontWeight:700, letterSpacing:'0.08em', textTransform:'uppercase', color:'var(--text-secondary)', padding:'4px 8px 8px'}}>States</div>
          <div style={{display:'flex', flexWrap:'wrap', gap:4, paddingLeft:8}}>
            {NAV_STATES.map(s => (
              <a key={s} href={`/states/${s.toLowerCase().replace(/\s+/g,'-')}`}
                style={{fontSize:13, color:'var(--navy)', textDecoration:'none', padding:'4px 8px', background:'var(--cream-dark)', borderRadius:6}}>{s}</a>
            ))}
          </div>
          <hr style={{border:'none', borderTop:'1px solid var(--border)', margin:'8px 0'}}/>
          <a href="/dashboard" className="btn-primary" style={{justifyContent:'center', marginTop:4}} onClick={() => setMobileOpen(false)}>
            Get Started
          </a>
        </div>
      )}
    </nav>
  );
}

/* ── Couple Carousel ── */
const COUPLES = [
  {names:'Sophie & James',   state:'California',     flag:'🏳️',  bg:'#8B6F5E'},
  {names:'Aaliyah & Marcus', state:'Texas',           flag:'🏳️',  bg:'#5E7A6F'},
  {names:'Priya & Daniel',   state:'New York',        flag:'🏳️',  bg:'#6B5E7A'},
  {names:'Emma & Noah',      state:'Florida',         flag:'🏳️',  bg:'#7A6B5E'},
  {names:'Yuki & Brandon',   state:'Washington',      flag:'🏳️',  bg:'#5E6B7A'},
  {names:'Fatima & Carlos',  state:'Illinois',        flag:'🏳️',  bg:'#7A5E6B'},
  {names:'Grace & Liam',     state:'Colorado',        flag:'🏳️',  bg:'#6B7A5E'},
  {names:'Olivia & Ethan',   state:'Georgia',         flag:'🏳️',  bg:'#7A7A5E'},
  {names:'Chloe & Mateo',    state:'Arizona',         flag:'🏳️',  bg:'#5E7A7A'},
  {names:'Nia & Tyler',      state:'Massachusetts',   flag:'🏳️',  bg:'#7A5E5E'},
  {names:'Sara & Michael',   state:'Pennsylvania',    flag:'🏳️',  bg:'#6F5E8B'},
  {names:'Zoe & Chris',      state:'Ohio',            flag:'🏳️',  bg:'#5E8B6F'},
  {names:'Mia & Jordan',     state:'Michigan',        flag:'🏳️',  bg:'#8B5E6F'},
  {names:'Leila & Sam',      state:'North Carolina',  flag:'🏳️',  bg:'#6F8B5E'},
  {names:'Anna & Ryan',      state:'Virginia',        flag:'🏳️',  bg:'#5E6F8B'},
  {names:'Jade & Alex',      state:'Nevada',          flag:'🏳️',  bg:'#8B8B5E'},
  {names:'Maya & Kevin',     state:'Oregon',          flag:'🏳️',  bg:'#5E8B8B'},
  {names:'Isabel & Drew',    state:'Tennessee',       flag:'🏳️',  bg:'#8B5E8B'},
  {names:'Claire & Jake',    state:'Minnesota',       flag:'🏳️',  bg:'#6B6B6B'},
  {names:'Aisha & Ben',      state:'Maryland',        flag:'🏳️',  bg:'#8B7A5E'},
];

/* State abbreviations for flag display */
const STATE_ABBR = {
  'California':'CA','Texas':'TX','New York':'NY','Florida':'FL','Washington':'WA',
  'Illinois':'IL','Colorado':'CO','Georgia':'GA','Arizona':'AZ','Massachusetts':'MA',
  'Pennsylvania':'PA','Ohio':'OH','Michigan':'MI','North Carolina':'NC','Virginia':'VA',
  'Nevada':'NV','Oregon':'OR','Tennessee':'TN','Minnesota':'MN','Maryland':'MD',
};

function CoupleCarousel() {
  const [current, setCurrent] = useState(0);
  const [flipping, setFlipping] = useState(false);
  const [direction, setDirection] = useState(1); // 1=forward, -1=back
  const timerRef = useRef(null);

  const advance = (dir = 1) => {
    if (flipping) return;
    setDirection(dir);
    setFlipping(true);
    setTimeout(() => {
      setCurrent(c => (c + dir + COUPLES.length) % COUPLES.length);
      setFlipping(false);
    }, 420);
  };

  useEffect(() => {
    timerRef.current = setInterval(() => advance(1), 4000);
    return () => clearInterval(timerRef.current);
  }, [flipping]);

  const couple = COUPLES[current];
  const abbr = STATE_ABBR[couple.state] || couple.state.slice(0,2).toUpperCase();

  return (
    <div style={{position:'relative', width:'100%', maxWidth:380}}>
      {/* Card */}
      <div style={{
        borderRadius:24,
        overflow:'hidden',
        aspectRatio:'3/4',
        position:'relative',
        boxShadow:'0 32px 80px rgba(0,0,0,0.5)',
        transform: flipping
          ? `perspective(900px) rotateY(${direction * 90}deg) scale(0.96)`
          : 'perspective(900px) rotateY(0deg) scale(1)',
        transition: flipping
          ? 'transform 0.42s cubic-bezier(0.4,0,0.2,1)'
          : 'transform 0.42s cubic-bezier(0.4,0,0.2,1)',
        background: couple.bg,
      }}>
        {/* Photo placeholder — replace src with real images */}
        <div style={{
          width:'100%', height:'100%',
          background:`linear-gradient(160deg, ${couple.bg}cc 0%, ${couple.bg} 100%)`,
          display:'flex', alignItems:'center', justifyContent:'center',
          flexDirection:'column', gap:8,
        }}>
          {/* Silhouette placeholder */}
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none" opacity="0.25">
            <circle cx="60" cy="42" r="22" fill="white"/>
            <ellipse cx="60" cy="95" rx="38" ry="28" fill="white"/>
          </svg>
          <span style={{color:'rgba(255,255,255,0.3)', fontSize:12, letterSpacing:'0.08em'}}>COUPLE PHOTO</span>
        </div>

        {/* Bottom caption overlay */}
        <div style={{
          position:'absolute', bottom:0, left:0, right:0,
          background:'linear-gradient(to top, rgba(0,0,0,0.72) 0%, transparent 100%)',
          padding:'40px 20px 20px',
          display:'flex', alignItems:'flex-end', justifyContent:'space-between',
        }}>
          <div>
            <div style={{color:'#fff', fontWeight:700, fontSize:18, fontFamily:'var(--serif)', lineHeight:1.2}}>
              {couple.names}
            </div>
            <div style={{color:'rgba(255,255,255,0.65)', fontSize:13, marginTop:4}}>
              Married in {couple.state}
            </div>
          </div>
          {/* State flag badge */}
          <div style={{
            background:'rgba(255,255,255,0.15)',
            backdropFilter:'blur(8px)',
            border:'1px solid rgba(255,255,255,0.2)',
            borderRadius:10,
            padding:'6px 10px',
            textAlign:'center',
            flexShrink:0,
          }}>
            <div style={{fontSize:11, fontWeight:800, color:'#fff', letterSpacing:'0.06em'}}>{abbr}</div>
          </div>
        </div>
      </div>




    </div>
  );
}

/* ── Hero Variants ── */
function HeroDark({ctaCopy, ctaSecondary}) {
  return (
    <section style={{background:'var(--navy-dark)', paddingTop:140, paddingBottom:80, position:'relative', overflow:'hidden', minHeight:'100vh', display:'flex', alignItems:'center'}}>
      {/* decorative blobs */}
      <div style={{position:'absolute',top:-100,right:'30%',width:500,height:500,borderRadius:'50%',background:'rgba(232,76,136,0.06)',pointerEvents:'none'}}></div>
      <div style={{position:'absolute',bottom:-80,left:-80,width:400,height:400,borderRadius:'50%',background:'rgba(26,58,143,0.4)',pointerEvents:'none'}}></div>

      <div className="container" style={{position:'relative',zIndex:1,width:'100%'}}>
        <div style={{display:'grid', gridTemplateColumns:'1fr 400px', gap:80, alignItems:'center'}}>

          {/* Left: copy */}
          <div>
            <div style={{marginBottom:28}}>
              <span className="pill" style={{background:'rgba(232,76,136,0.15)',color:'var(--pink)'}}>
                ★ Trusted by 1,000's of couples nationwide
              </span>
            </div>
            <h1 className="serif" style={{fontSize:'clamp(40px,5.5vw,76px)', lineHeight:1.05, color:'#fff', marginBottom:24}}>
              The Smartest Thing<br/>To Do Before<br/><em style={{color:'var(--pink)'}}>&#8220;I Do.&#8221;</em>
            </h1>
            <p style={{fontSize:'clamp(16px,1.8vw,19px)', color:'rgba(255,255,255,0.65)', maxWidth:480, lineHeight:1.7, marginBottom:40}}>
              State-specific prenups in under 2 hours — drafted, reviewed, signed, and notarized online. For a fraction of attorney fees.
            </p>
            <div style={{display:'flex', flexWrap:'wrap', gap:12, marginBottom:52}}>
              <a href="#" className="btn-primary pink" style={{fontSize:16, padding:'16px 32px'}}>{ctaCopy} <ArrowRight/></a>
              <button onClick={() => document.getElementById('how-it-works')?.scrollIntoView({behavior:'smooth'})} className="btn-outline white" style={{fontSize:16, padding:'14px 32px'}}>{ctaSecondary}</button>
            </div>
            <div style={{display:'flex', flexWrap:'wrap', gap:24}}>
              {[['Valid in all 50 states', <Globe/>], ['Bank-level encryption', <Lock/>], ['Attorney-reviewed templates', <Shield/>]].map(([label, icon]) => (
                <div key={label} style={{display:'flex', alignItems:'center', gap:8, color:'rgba(255,255,255,0.5)', fontSize:14}}>
                  {icon}<span>{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: carousel */}
          <div style={{display:'flex', justifyContent:'center'}}>
            <CoupleCarousel/>
          </div>

        </div>
      </div>
    </section>
  );
}

function HeroLight({ctaCopy, ctaSecondary}) {
  return (
    <section style={{background:'var(--cream)', paddingTop:120, paddingBottom:80, position:'relative', overflow:'hidden'}}>
      <div style={{position:'absolute',top:0,right:0,width:'45%',height:'100%',background:'var(--cream-dark)',clipPath:'polygon(12% 0,100% 0,100% 100%,0 100%)',pointerEvents:'none'}}></div>
      <div className="container" style={{position:'relative',zIndex:1}}>
        <div style={{marginBottom:28}}>
          <span className="pill navy">★ Trusted by 10,000+ couples</span>
        </div>
        <h1 className="serif" style={{fontSize:'clamp(40px,6vw,80px)', lineHeight:1.05, color:'var(--navy-dark)', maxWidth:680, marginBottom:24}}>
          A Prenup Built<br/>for How You<br/><em style={{color:'var(--pink)'}}>Actually Live.</em>
        </h1>
        <p style={{fontSize:'clamp(16px,2vw,20px)', color:'var(--text-secondary)', maxWidth:500, lineHeight:1.65, marginBottom:40}}>
          Skip the $5,000 attorney. Get a legally binding, state-specific prenup — together — in under two hours.
        </p>
        <div style={{display:'flex', flexWrap:'wrap', gap:12, marginBottom:56}}>
          <a href="#" className="btn-primary" style={{fontSize:16, padding:'16px 32px', background:'var(--navy-dark)'}}>{ctaCopy} <ArrowRight/></a>
          <button onClick={() => document.getElementById('how-it-works')?.scrollIntoView({behavior:'smooth'})} className="btn-outline" style={{fontSize:16, padding:'14px 32px'}}>{ctaSecondary}</button>
        </div>
        <div style={{display:'flex', flexWrap:'wrap', gap:24}}>
          {[['Valid in all 50 states', <Globe/>], ['Bank-level encryption', <Lock/>], ['Attorney-reviewed', <Shield/>]].map(([label, icon]) => (
            <div key={label} style={{display:'flex', alignItems:'center', gap:8, color:'var(--text-secondary)', fontSize:14}}>
              {icon}<span>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HeroSplit({ctaCopy, ctaSecondary}) {
  return (
    <section style={{background:'#fff', paddingTop:100, paddingBottom:0, overflow:'hidden'}}>
      <div className="container">
        <div className="hero-split-inner" style={{display:'flex', alignItems:'center', gap:60, minHeight:560}}>
          <div style={{flex:'0 0 55%', paddingBottom:80}}>
            <div style={{marginBottom:24}}>
              <span className="pill">★ 4.9/5 from 2,400+ couples</span>
            </div>
            <h1 className="serif" style={{fontSize:'clamp(36px,5vw,68px)', lineHeight:1.08, color:'var(--navy-dark)', marginBottom:22}}>
              Protect Your Future.<br/><em style={{color:'var(--pink)'}}>Together.</em>
            </h1>
            <p style={{fontSize:18, color:'var(--text-secondary)', lineHeight:1.65, maxWidth:440, marginBottom:36}}>
              A modern prenup for modern couples — collaborative, transparent, and legally sound in every state. No office visits. No awkward silences.
            </p>
            <div style={{display:'flex', flexWrap:'wrap', gap:12}}>
              <a href="#" className="btn-primary pink" style={{fontSize:16, padding:'16px 32px'}}>{ctaCopy} <ArrowRight/></a>
              <button onClick={() => document.getElementById('how-it-works')?.scrollIntoView({behavior:'smooth'})} className="btn-outline" style={{fontSize:16, padding:'14px 32px'}}>{ctaSecondary}</button>
            </div>
          </div>
          <div style={{flex:1, alignSelf:'stretch', background:'var(--cream-dark)', borderRadius:'24px 24px 0 0', minHeight:480, display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', gap:8}}>
            <div style={{fontFamily:'monospace', fontSize:12, color:'var(--text-secondary)', textAlign:'center', padding:32}}>
              <div style={{width:80, height:80, borderRadius:'50%', background:'var(--border)', margin:'0 auto 16px'}}></div>
              couple photo
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Stats Bar ── */
function StatsBar() {
  const [c1, r1] = useCounter(10000);
  const [c2, r2] = useCounter(99);
  const [c3, r3] = useCounter(2400);
  const stats = [
    {ref:r1, value:c1, suffix:'+', label:'Couples served', format: v => v >= 10000 ? '10,000+' : v.toLocaleString()},
    {ref:r2, value:c2, suffix:'%', label:'Satisfaction rate', format: v => v + '%'},
    {ref:r3, value:c3, suffix:'+', label:'5-star reviews', format: v => v.toLocaleString() + '+'},
    {ref:null, value:null, suffix:'', label:'Avg completion time', format: () => '< 2 hrs'},
  ];
  return (
    <div style={{background:'#fff', borderTop:'1px solid var(--border)', borderBottom:'1px solid var(--border)'}}>
      <div className="container">
        <div style={{display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:0}}>
          {stats.map((s,i) => (
            <div key={i} ref={s.ref} style={{padding:'28px 24px', textAlign:'center', borderRight: i < 3 ? '1px solid var(--border)' : 'none'}}>
              <div className="serif" style={{fontSize:36, color:'var(--navy)', fontWeight:400, lineHeight:1}}>
                {s.format(s.value)}
              </div>
              <div style={{fontSize:13, color:'var(--text-secondary)', marginTop:6}}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── How It Works ── */
function HowItWorks() {
  const steps = [
    {n:'01', title:'Answer questions together', body:'Both partners complete their own questionnaire — covering assets, debts, property, spousal support, and more. Work at your own pace from anywhere.'},
    {n:'02', title:'We generate your agreement', body:'Our 50-state legal engine produces a customized prenup tailored to your state\'s laws, your assets, and your decisions.'},
    {n:'03', title:'Sign & notarize in minutes', body:'Review, e-sign, and notarize your completed agreement online — fully legally valid. No printing, no office visits.'},
  ];
  return (
    <section id="how-it-works" style={{background:'var(--cream)', padding:'96px 0', scrollMarginTop:64}}>
      <div className="container">
        <div style={{textAlign:'center', marginBottom:64}}>
          <div className="section-label teal" style={{color:'var(--teal)'}}>Simple Process</div>
          <h2 className="serif section-title" style={{margin:'0 auto 12px'}}>Three steps to peace of mind</h2>
          <p className="section-sub" style={{margin:'0 auto', textAlign:'center'}}>No complicated back-and-forth. No weeks of waiting. Just a clear path from yes to signed.</p>
        </div>
        <div style={{display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:32, position:'relative'}}>
          {steps.map((s, i) => (
            <div key={i} style={{position:'relative'}}>
              {i < 2 && (
                <div style={{position:'absolute', top:36, left:'calc(50% + 52px)', right:'calc(-50% + 52px)', height:2, background:'repeating-linear-gradient(90deg,var(--border) 0,var(--border) 8px,transparent 8px,transparent 16px)', zIndex:0}}></div>
              )}
              <div className="card" style={{padding:36, height:'100%', position:'relative', zIndex:1}}>
                <div className="serif" style={{fontSize:56, color:'var(--pink)', opacity:0.25, lineHeight:1, marginBottom:16}}>{s.n}</div>
                <h3 style={{fontSize:20, fontWeight:700, color:'var(--navy-dark)', marginBottom:12, lineHeight:1.3}}>{s.title}</h3>
                <p style={{color:'var(--text-secondary)', lineHeight:1.65, fontSize:15}}>{s.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Pricing ── */
function Pricing() {
  const plans = [
    {name:'Prenup Agreement', price:'$599', per:'per couple', featured:true, badge:'Most Popular',
      desc:'Everything you need to create a legally binding, state-specific prenup — together.',
      items:['Guided questionnaire for both partners','State-specific document generation','Financial disclosure worksheets','Unlimited revisions before signing','Downloadable PDF + e-signature for both partners','Valid in all 50 states']},
    {name:'Online Notarization', price:'$50', per:'add-on', featured:false, badge:null,
      desc:'Get your signed agreement notarized online with a certified remote notary.',
      items:['Live video session with notary','Certified remote online notary','Digital seal and certificate','Completed in under 30 minutes','Valid in all 50 states']},
  ];
  return (
    <section id="pricing" style={{background:'#fff', padding:'96px 0', scrollMarginTop:64}}>
      <div className="container">
        <div style={{textAlign:'center', marginBottom:64}}>
          <div className="section-label" style={{color:'var(--teal)'}}>Transparent Pricing</div>
          <h2 className="serif section-title" style={{margin:'0 auto 12px'}}>One flat fee. No surprises.</h2>
          <p className="section-sub" style={{margin:'0 auto', textAlign:'center'}}>Traditional attorneys charge $2,500–$10,000 per person. We charge $599 — total.</p>
        </div>

        {/* Comparison callout */}
        <div style={{background:'var(--cream)', borderRadius:16, padding:'20px 28px', display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:16, marginBottom:40, border:'1px solid var(--border)'}}>
          <div style={{fontSize:15, color:'var(--text-secondary)'}}>💸 The average prenup attorney charges <strong style={{color:'var(--navy-dark)'}}>$2,500–$10,000 per person.</strong></div>
          <div style={{fontSize:15, fontWeight:700, color:'var(--teal)'}}>OurPrenup: $599/couple. That's it.</div>
        </div>

        <div style={{display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:20, alignItems:'start', maxWidth:780, margin:'0 auto'}}>
          {plans.map((p, i) => (
            <div key={i} style={{
              background: p.featured ? 'var(--navy-dark)' : '#fff',
              color: p.featured ? '#fff' : 'var(--navy-dark)',
              border: p.featured ? 'none' : '1px solid var(--border)',
              borderRadius: 24,
              padding: '36px 32px',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              boxShadow: p.featured ? '0 24px 64px rgba(7,20,67,0.28)' : '0 2px 12px rgba(0,0,0,0.05)',
            }}>
              {/* Most Popular badge */}
              {p.badge && (
                <div style={{
                  position:'absolute', top:-16, left:'50%', transform:'translateX(-50%)',
                  background:'var(--pink)', color:'#fff', fontSize:13, fontWeight:700,
                  padding:'6px 20px', borderRadius:100, whiteSpace:'nowrap',
                  boxShadow:'0 4px 12px rgba(232,76,136,0.35)',
                }}>{p.badge}</div>
              )}

              {/* Plan name */}
              <div style={{fontSize:14, fontWeight:600, marginBottom:10, opacity: p.featured ? 0.65 : 0.55}}>
                {p.name}
              </div>

              {/* Price */}
              <div style={{display:'flex', alignItems:'baseline', gap:0, marginBottom:16}}>
                <span className="serif" style={{fontSize:64, lineHeight:1, fontWeight:400, color: p.featured ? '#fff' : 'var(--navy-dark)'}}>
                  {p.price}
                </span>
                <span style={{fontSize:14, marginLeft:6, opacity:0.55, fontWeight:500}}>{p.per}</span>
              </div>

              {/* Description */}
              <p style={{fontSize:14, lineHeight:1.65, marginBottom:24, opacity: p.featured ? 0.72 : 0.65, borderBottom: `1px solid ${p.featured ? 'rgba(255,255,255,0.1)' : 'var(--border)'}`, paddingBottom:20}}>
                {p.desc}
              </p>

              {/* Feature list */}
              <ul style={{listStyle:'none', display:'flex', flexDirection:'column', gap:12, marginBottom:32, flex:1}}>
                {p.items.map(item => (
                  <li key={item} style={{display:'flex', gap:10, alignItems:'flex-start'}}>
                    <Check color={p.featured ? '#4ade80' : 'var(--teal)'}/>
                    <span style={{fontSize:14, lineHeight:1.5, opacity: p.featured ? 0.88 : 0.78}}>{item}</span>
                  </li>
                ))}
              </ul>

              {/* CTA button — full width pill */}
              <a href="#" style={{
                display:'flex', alignItems:'center', justifyContent:'center', gap:8,
                background: p.featured ? 'var(--pink)' : 'var(--navy-dark)',
                color:'#fff', fontFamily:'var(--sans)', fontWeight:600, fontSize:16,
                padding:'16px 24px', borderRadius:100, textDecoration:'none',
                transition:'opacity 0.18s, transform 0.15s',
                marginTop:'auto',
              }}
              onMouseOver={e=>{e.currentTarget.style.opacity='0.88'; e.currentTarget.style.transform='translateY(-1px)';}}
              onMouseOut={e=>{e.currentTarget.style.opacity='1'; e.currentTarget.style.transform='translateY(0)';}}
              >
                Get Started <ArrowRight/>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── State Coverage ── */
const ALL_STATES = ['Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania','Rhode Island','South Dakota','Tennessee','Texas','Utah','Vermont','Virginia','Washington','Wisconsin','Wyoming','DC'];

function StateCoverage() {
  return (
    <section style={{background:'var(--cream)', padding:'96px 0', overflow:'hidden'}}>
      <div className="container" style={{textAlign:'center', marginBottom:48}}>
        <div className="section-label" style={{color:'var(--teal)'}}>50-State Coverage</div>
        <h2 className="serif section-title" style={{margin:'0 auto 12px'}}>Wherever you call home,<br/>we've got you covered.</h2>
        <p className="section-sub" style={{margin:'0 auto', textAlign:'center'}}>Our legal engine handles community property, equitable distribution, and every state's enforceability requirements.</p>
      </div>
      {/* Marquee rows */}
      {[ALL_STATES.slice(0,25), ALL_STATES.slice(25)].map((row, ri) => (
        <div key={ri} className="marquee-wrap" style={{marginBottom:14, direction: ri===1?'rtl':'ltr'}}>
          <div className="marquee-track" style={{animationDirection: ri===1?'reverse':'normal'}}>
            {[...row,...row].map((s,i) => (
              <div key={i} className="state-pill">
                <Check color="var(--teal)"/> {s}
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}

/* ── Testimonials ── */
const reviews = [
  {quote:'"We were nervous to bring it up, but OurPrenup made the whole process feel collaborative, not adversarial. We both felt heard."', name:'Jordan & Casey', state:'California', stars:5},
  {quote:'"Saved us $8,000 compared to hiring attorneys. The document held up exactly as described."', name:'Marcus T.', state:'Texas', stars:5},
  {quote:'"As someone who\'s been through a divorce, I can tell you: do this. OurPrenup is so much easier than anything I went through before."', name:'Priya S.', state:'New York', stars:5},
  {quote:'"Took us 90 minutes on a Sunday afternoon. Signed, notarized, done. Couldn\'t be happier."', name:'Alex & Sam', state:'Florida', stars:5},
  {quote:'"The questionnaire actually helped us have important conversations we hadn\'t had yet. 10/10 recommend."', name:'Diane W.', state:'Colorado', stars:5},
];

function Testimonials() {
  return (
    <section style={{background:'#fff', padding:'96px 0', overflow:'hidden'}}>
      <div className="container" style={{marginBottom:48}}>
        <div className="section-label" style={{color:'var(--pink)'}}>Real Couples</div>
        <div style={{display:'flex', alignItems:'flex-end', justifyContent:'space-between', flexWrap:'wrap', gap:16}}>
          <h2 className="serif section-title" style={{marginBottom:0}}>What couples are saying</h2>
        </div>
      </div>
      <div style={{paddingLeft:24, display:'flex', gap:20, overflowX:'auto', paddingRight:24, paddingBottom:8, scrollbarWidth:'thin'}}>
        {reviews.map((r,i) => (
          <div key={i} className="review-card" style={{flexShrink:0, width:340}}>
            <div style={{display:'flex', gap:2, marginBottom:16}}>{[1,2,3,4,5].map(i=><Star key={i}/>)}</div>
            <p style={{fontSize:16, lineHeight:1.65, color:'var(--navy-dark)', marginBottom:20}}>{r.quote}</p>
            <div style={{display:'flex', alignItems:'center', gap:12}}>
              <div style={{width:36, height:36, borderRadius:'50%', background:'var(--cream-dark)', flexShrink:0}}></div>
              <div>
                <div style={{fontWeight:600, fontSize:14, color:'var(--navy-dark)'}}>{r.name}</div>
                <div style={{fontSize:12, color:'var(--text-secondary)'}}>{r.state}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── FAQ ── */
const faqs = [
  {q:'Is an online prenup legally binding?', a:'Yes. OurPrenup agreements are legally binding contracts, provided they meet your state\'s requirements — which our platform is specifically designed to satisfy. Requirements typically include full financial disclosure, voluntary signing, and in some states, notarization.'},
  {q:'Do we need separate attorneys?', a:'It depends on your state. Some states recommend (or effectively require) that each partner consult independent legal counsel. Our platform flags this for your state, and we offer optional attorney review for peace of mind.'},
  {q:'How long does the process take?', a:'Most couples finish in 1–2 hours of active work. You can save progress and return anytime. Once you finalize your answers, your agreement is generated instantly.'},
  {q:'Can we make changes after generating the agreement?', a:'Absolutely — unlimited revisions before you sign. After e-signing and notarizing, changes would require a formal amendment.'},
  {q:'What if we disagree on something?', a:'Disagreement is normal. Both partners can see each other\'s responses, flag items for discussion, and work through differences together. Our collaboration tools are built for this.'},
  {q:'What does $599 include?', a:'Everything for both partners: the guided questionnaire, financial disclosure tools, state-specific document generation, unlimited revisions, e-signatures for both partners, and a downloadable PDF. Notarization and attorney review are optional add-ons.'},
];

function FAQ() {
  const [open, setOpen] = useState(null);
  return (
    <section id="faq" style={{background:'var(--cream)', padding:'96px 0', scrollMarginTop:64}}>
      <div className="container" style={{maxWidth:780}}>
        <div style={{textAlign:'center', marginBottom:56}}>
          <div className="section-label" style={{color:'var(--pink)'}}>Common Questions</div>
          <h2 className="serif section-title">Frequently asked questions</h2>
        </div>
        <div>
          {faqs.map((f,i) => (
            <div key={i} className="faq-item">
              <button className="faq-btn" onClick={() => setOpen(open===i?null:i)}>
                {f.q}
                <ChevronDown open={open===i}/>
              </button>
              <div className={`faq-body ${open===i?'open':'closed'}`}>
                <p>{f.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── CTA Banner ── */
function CTABanner({ctaCopy}) {
  return (
    <section style={{background:'var(--navy-dark)', padding:'96px 0', position:'relative', overflow:'hidden'}}>
      <div style={{position:'absolute',top:-120,right:-80,width:480,height:480,borderRadius:'50%',background:'rgba(232,76,136,0.1)',pointerEvents:'none'}}></div>
      <div style={{position:'absolute',bottom:-80,left:-60,width:320,height:320,borderRadius:'50%',background:'rgba(26,58,143,0.5)',pointerEvents:'none'}}></div>
      <div className="container" style={{textAlign:'center', position:'relative', zIndex:1}}>
        <h2 className="serif" style={{fontSize:'clamp(32px,5vw,60px)', color:'#fff', lineHeight:1.1, marginBottom:20}}>
          You're writing your story together.<br/><em style={{color:'var(--pink)'}}>Start on the same page.</em>
        </h2>
        <p style={{fontSize:18, color:'rgba(255,255,255,0.6)', maxWidth:480, margin:'0 auto 40px', lineHeight:1.6}}>
          Join thousands of couples who chose clarity over uncertainty. Your prenup can be ready today.
        </p>
        <div style={{display:'flex', flexWrap:'wrap', gap:12, justifyContent:'center'}}>
          <a href="#" className="btn-primary pink" style={{fontSize:16, padding:'16px 36px'}}>{ctaCopy} <ArrowRight/></a>
          <button onClick={() => document.getElementById('pricing')?.scrollIntoView({behavior:'smooth'})} className="btn-outline white" style={{fontSize:16, padding:'14px 36px'}}>View Pricing</button>
        </div>
      </div>
    </section>
  );
}

/* ── Footer ── */
function Footer() {
  return (
    <footer style={{background:'#06102e', color:'rgba(255,255,255,0.55)'}}>
      <div className="container" style={{padding:'64px 24px 40px'}}>
        <div style={{display:'grid', gridTemplateColumns:'2fr 1fr 1fr', gap:48, marginBottom:48}}>
          <div>
            <div className="serif" style={{fontSize:24, color:'#fff', marginBottom:16}}>OurPrenup</div>
            <p style={{fontSize:14, lineHeight:1.7, maxWidth:340}}>
              Modern prenuptial agreements for modern couples. Affordable, transparent, and legally sound — in every state.
            </p>
          </div>
          <div>
            <div style={{fontSize:12, fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', color:'rgba(255,255,255,0.4)', marginBottom:16}}>Product</div>
            <div style={{display:'flex', flexDirection:'column', gap:12}}>
              {['How It Works','Pricing','FAQ','Get Started'].map(l => (
                <a key={l} href="#" style={{fontSize:14, color:'rgba(255,255,255,0.55)', textDecoration:'none', transition:'color 0.15s'}}
                  onMouseOver={e=>e.currentTarget.style.color='#fff'}
                  onMouseOut={e=>e.currentTarget.style.color='rgba(255,255,255,0.55)'}
                >{l}</a>
              ))}
            </div>
          </div>
          <div>
            <div style={{fontSize:12, fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', color:'rgba(255,255,255,0.4)', marginBottom:16}}>Legal</div>
            <div style={{display:'flex', flexDirection:'column', gap:12}}>
              {['Terms of Service','Privacy Policy','Disclaimer'].map(l => (
                <a key={l} href="#" style={{fontSize:14, color:'rgba(255,255,255,0.55)', textDecoration:'none'}}>{l}</a>
              ))}
            </div>
          </div>
        </div>
        <div style={{borderTop:'1px solid rgba(255,255,255,0.08)', paddingTop:32}}>
          <p style={{fontSize:12, lineHeight:1.7, color:'rgba(255,255,255,0.3)', maxWidth:680, marginBottom:12}}>
            OurPrenup provides self-help tools for creating prenuptial agreements. We are not a law firm and do not provide legal advice. Consult a licensed attorney in your state for legal advice specific to your situation.
          </p>
          <p style={{fontSize:12, color:'rgba(255,255,255,0.25)'}}>© 2026 OurPrenup. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

/* ── App ── */
export default function Home() {
  const heroVariant = 'dark';
  const ctaCopy = 'Start Your Prenup — $599';
  const ctaSecondary = 'See How It Works';
  const HeroComponent = HeroDark;

  return (
    <main className="min-h-screen bg-bg">
      <Navbar heroVariant={heroVariant}/>
      <HeroComponent ctaCopy={ctaCopy} ctaSecondary={ctaSecondary}/>
      <StatsBar/>
      <HowItWorks/>
      <Pricing/>
      <StateCoverage/>
      <Testimonials/>
      <FAQ/>
      <CTABanner ctaCopy={ctaCopy}/>
      <Footer/>
    </main>
  );
}
