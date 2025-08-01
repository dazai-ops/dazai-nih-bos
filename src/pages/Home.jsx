import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

function App() {
  const [name, setName] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("Bentar yahh...");

    if (!navigator.geolocation) {
      setStatus("Geolocation tidak didukung di perangkat ini.");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(async (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      const userAgent = navigator.userAgent;

      const { error } = await supabase.from('visitor_data').insert([
        { name, latitude, longitude, user_agent: userAgent },
      ]);

      if (error) {
        setStatus("Aduh gagal.");
        console.error(error);
      } else {
        setStatus("Yeay! Berhasil. Udah sih gitu doang");
        setName('');
      }
      setLoading(false);
    }, (error) => {
      console.error(error);
      setStatus("Yahhh");
      setLoading(false);
    });
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '2rem' }}>
      <h2>Halo 👋</h2>
      <p>Silakan masukkan nama</p>
      <p>Dan izinkan <b>Lokasi</b> untuk melanjutkan yah..</p>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nama Anda"
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            fontSize: '1rem',
            marginBottom: '10px'
          }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: '10px',
            fontSize: '1rem',
            backgroundColor: '#4F46E5',
            color: '#fff',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          {loading ? 'Mengirim...' : 'Submit'}
        </button>
      </form>

      {status && <p style={{ marginTop: '1rem' }}>{status}</p>}
    </div>
  );
}

export default App;
