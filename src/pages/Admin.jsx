import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import VisitorMap from '../components/VisitorMap';

function Admin() {
  const [visitors, setVisitors] = useState([]);
  const [selectedVisitor, setSelectedVisitor] = useState(null);

  useEffect(() => {
    const fetchVisitors = async () => {
      const { data, error } = await supabase.from('visitor_data').select('*').order('created_at', { ascending: false });
      if (!error) setVisitors(data);
    };

    fetchVisitors();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>📊 Data Pengunjung</h2>
      {visitors.map((v) => (
        <div key={v.id} style={{ border: '1px solid #ccc', marginBottom: '10px', padding: '10px' }}>
          <p><strong>Nama:</strong> {v.name}</p>
          <p><strong>Waktu:</strong> {new Date(v.created_at).toLocaleString()}</p>
          <p><strong>Koordinat:</strong> {v.latitude}, {v.longitude}</p>
          <button onClick={() => setSelectedVisitor(v)}>
            Lihat Lokasi
          </button>
        </div>
      ))}

      {selectedVisitor && (
        <div style={{ marginTop: '2rem' }}>
          <h3>📍 Lokasi untuk: {selectedVisitor.name}</h3>
          <VisitorMap lat={selectedVisitor.latitude} lon={selectedVisitor.longitude} />
        </div>
      )}
    </div>
  );
}

export default Admin;
