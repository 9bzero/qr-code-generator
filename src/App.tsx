import{useState,useEffect,useRef}from'react'
  export default function App(){
    const[text,setText]=useState('https://github.com/9bzero')
    const[size,setSize]=useState(256)
    const[fg,setFg]=useState('#0ea5e9')
    const[bg,setBg]=useState('#0f172a')
    const[qr,setQr]=useState('')
    const[err,setErr]=useState('')
    const[copied,setCopied]=useState(false)
    useEffect(()=>{
      if(!text.trim()){setQr('');return}
      import('qrcode').then(QRCode=>{
        QRCode.toDataURL(text,{width:size,margin:2,color:{dark:fg,light:bg}})
          .then(url=>{setQr(url);setErr('')})
          .catch(e=>setErr(e.message))
      })
    },[text,size,fg,bg])
    const download=()=>{const a=document.createElement('a');a.href=qr;a.download='qr-code.png';a.click()}
    const copyUrl=()=>{navigator.clipboard.writeText(text);setCopied(true);setTimeout(()=>setCopied(false),2000)}
    const PRESETS=[{label:'GitHub',val:'https://github.com/9bzero'},{label:'Email',val:'mailto:hello@example.com'},{label:'WiFi',val:'WIFI:S:MyNetwork;T:WPA;P:password123;;'},{label:'Phone',val:'tel:+966501234567'}]
    return(
      <div style={{minHeight:'100vh',background:'#0f172a',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'Inter,system-ui,sans-serif',color:'#e2e8f0',padding:'2rem'}}>
        <div style={{width:'100%',maxWidth:820,display:'grid',gridTemplateColumns:'1fr auto',gap:'2rem',alignItems:'start'}}>
          <div>
            <h1 style={{fontWeight:800,fontSize:'1.75rem',marginBottom:'1.5rem',color:'#f8fafc'}}>◼ QR Code Generator</h1>
            <div style={{marginBottom:'1rem'}}>
              <label style={{color:'#94a3b8',fontSize:'0.8rem',display:'block',marginBottom:'0.5rem'}}>CONTENT</label>
              <textarea value={text} onChange={e=>setText(e.target.value)} rows={3} style={{width:'100%',background:'#111827',border:'1px solid #334155',borderRadius:8,padding:'0.75rem',color:'#e2e8f0',fontSize:'0.9rem',outline:'none',resize:'vertical'}}/>
            </div>
            <div style={{display:'flex',gap:'0.5rem',marginBottom:'1.5rem',flexWrap:'wrap'}}>
              {PRESETS.map(p=><button key={p.label} onClick={()=>setText(p.val)} style={{padding:'0.35rem 0.9rem',background:'#1e293b',color:'#94a3b8',border:'1px solid #334155',borderRadius:20,cursor:'pointer',fontSize:'0.8rem'}}>{p.label}</button>)}
            </div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1rem',marginBottom:'1rem'}}>
              <div>
                <label style={{color:'#94a3b8',fontSize:'0.8rem',display:'block',marginBottom:'0.5rem'}}>QR COLOR</label>
                <div style={{display:'flex',gap:'0.5rem',alignItems:'center'}}>
                  <input type="color" value={fg} onChange={e=>setFg(e.target.value)} style={{width:40,height:36,border:'none',background:'none',cursor:'pointer'}}/>
                  <span style={{fontFamily:'monospace',color:'#94a3b8',fontSize:'0.85rem'}}>{fg}</span>
                </div>
              </div>
              <div>
                <label style={{color:'#94a3b8',fontSize:'0.8rem',display:'block',marginBottom:'0.5rem'}}>BACKGROUND</label>
                <div style={{display:'flex',gap:'0.5rem',alignItems:'center'}}>
                  <input type="color" value={bg} onChange={e=>setBg(e.target.value)} style={{width:40,height:36,border:'none',background:'none',cursor:'pointer'}}/>
                  <span style={{fontFamily:'monospace',color:'#94a3b8',fontSize:'0.85rem'}}>{bg}</span>
                </div>
              </div>
            </div>
            <div style={{marginBottom:'1.5rem'}}>
              <div style={{display:'flex',justifyContent:'space-between',marginBottom:'0.4rem'}}>
                <label style={{color:'#94a3b8',fontSize:'0.8rem'}}>SIZE</label>
                <span style={{color:'#38bdf8',fontFamily:'monospace',fontSize:'0.85rem'}}>{size}px</span>
              </div>
              <input type="range" min={128} max={512} step={32} value={size} onChange={e=>setSize(+e.target.value)} style={{width:'100%',accentColor:'#38bdf8'}}/>
            </div>
            <div style={{display:'flex',gap:'0.75rem'}}>
              <button onClick={download} disabled={!qr} style={{flex:1,padding:'0.75rem',background:'#0ea5e9',color:'#fff',border:'none',borderRadius:8,cursor:'pointer',fontWeight:700}}>⬇ Download PNG</button>
              <button onClick={copyUrl} style={{padding:'0.75rem 1.25rem',background:'#1e293b',color:copied?'#22c55e':'#94a3b8',border:'1px solid #334155',borderRadius:8,cursor:'pointer'}}>{copied?'✓':'📋'}</button>
            </div>
          </div>
          <div style={{background:'#111827',border:'1px solid #1e293b',borderRadius:16,padding:'1.5rem',display:'flex',flexDirection:'column',alignItems:'center',gap:'1rem'}}>
            {qr?<img src={qr} alt="QR Code" style={{width:size>320?320:size,height:size>320?320:size,borderRadius:8,imageRendering:'pixelated'}}/>:<div style={{width:256,height:256,display:'flex',alignItems:'center',justifyContent:'center',color:'#475569',fontSize:'0.9rem'}}>Enter content</div>}
            {err&&<p style={{color:'#f87171',fontSize:'0.8rem'}}>{err}</p>}
            <p style={{color:'#475569',fontSize:'0.75rem',textAlign:'center'}}>{size}×{size}px · PNG</p>
          </div>
        </div>
      </div>
    )
  }