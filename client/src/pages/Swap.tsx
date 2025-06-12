import { useState, useEffect } from 'react'

export default function Swap() {
  const [fromAmount, setFromAmount] = useState('0.6948')
  const [toAmount, setToAmount] = useState('1801.73')

  useEffect(() => {
    setToAmount(fromAmount)
  }, [fromAmount])

  return (
    <div style={{background:'#f7f7f9',minHeight:'100vh',padding:'16px'}}>
      <div style={{background:'#fff',borderRadius:'24px',boxShadow:'0 4px 12px rgba(0,0,0,0.05)',padding:'16px'}}>
        <div style={{display:'flex',alignItems:'center',marginBottom:'16px'}}>
          <button onClick={() => history.back()} style={{background:'none',border:'none',fontSize:'24px'}}>&lt;</button>
          <h3 style={{flex:1,textAlign:'center',margin:0,fontSize:'18px'}}>Exchange</h3>
        </div>
        <div style={{background:'#fff',borderRadius:'16px',boxShadow:'0 2px 4px rgba(0,0,0,0.05)',padding:'12px',marginBottom:'12px'}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
              <div style={{width:'32px',height:'32px',borderRadius:'16px',background:'#f0f0f0',display:'flex',alignItems:'center',justifyContent:'center'}}>Ξ</div>
              <span style={{fontSize:'16px',fontWeight:600}}>ETH ▼</span>
            </div>
            <span style={{color:'#555'}}>Send</span>
          </div>
          <div style={{display:'flex',marginTop:'8px',alignItems:'flex-end'}}>
            <input value={fromAmount} onChange={e=>setFromAmount(e.target.value)} style={{flex:1,border:'none',fontSize:'28px',outline:'none'}} />
            <button style={{border:'none',borderRadius:'12px',background:'#e5f8eb',color:'#2e7d32',padding:'2px 8px',fontSize:'12px',marginLeft:'8px'}}>Max</button>
          </div>
          <div style={{fontSize:'12px',color:'#888'}}>Balance: 0.6948 ETH</div>
        </div>
        <div style={{textAlign:'center',fontSize:'12px',color:'#888',margin:'8px 0'}}>1 l</div>
        <div style={{background:'#fff',borderRadius:'16px',boxShadow:'0 2px 4px rgba(0,0,0,0.05)',padding:'12px',marginBottom:'12px'}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
              <div style={{width:'32px',height:'32px',borderRadius:'16px',background:'#f0f0f0',display:'flex',alignItems:'center',justifyContent:'center'}}>$</div>
              <span style={{fontSize:'16px',fontWeight:600}}>USD ▼</span>
            </div>
            <span style={{color:'#555'}}>Receive</span>
          </div>
          <div style={{display:'flex',marginTop:'8px',alignItems:'flex-end'}}>
            <input value={toAmount} onChange={e=>setToAmount(e.target.value)} style={{flex:1,border:'none',fontSize:'28px',outline:'none'}} />
          </div>
          <div style={{fontSize:'12px',color:'#888'}}>Balance: 100,95 USD</div>
        </div>
        <button style={{width:'100%',border:'none',borderRadius:'32px',padding:'12px 0',fontSize:'16px',fontWeight:600,color:'#fff',background:'linear-gradient(90deg,#7e3ff2,#4d51ff)',margin:'24px 0',boxShadow:'0 6px 12px rgba(0,0,0,0.1)'}}>Swap</button>
        <div style={{fontSize:'12px',color:'#666'}}>Rate: 1 ETH = 2593,00 USD</div>
        <div style={{fontSize:'12px',color:'#666'}}>Estimated fee: 4,28 USD</div>
        <div style={{fontSize:'12px',fontWeight:600}}>You will receive: 1 797,45 USD</div>
      </div>
    </div>
  )
}

