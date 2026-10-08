import Link from 'next/link';
export default function NotFound(){
  return <main style={{minHeight:'70vh',display:'grid',placeItems:'center',padding:24}}>
    <section style={{maxWidth:560,textAlign:'center',padding:32,border:'1px solid #2b2635',borderRadius:16,background:'#121017'}}>
      <div style={{fontSize:13,color:'#b275ff',fontWeight:800}}>404 · SCENE NOT FOUND</div>
      <h1 style={{fontSize:36,margin:'10px 0'}}>This route does not exist.</h1>
      <p style={{color:'#9d96a8'}}>The StoryFilm workspace could not find the requested page.</p>
      <div style={{display:'flex',gap:10,justifyContent:'center',flexWrap:'wrap'}}>
        <Link href="/" className="sf-btn sf-primary">Home</Link>
        <Link href="/dashboard" className="sf-btn">Dashboard</Link>
      </div>
    </section>
  </main>
}
