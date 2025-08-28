export default function TestDashboard() {
  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw' }}>
      <div style={{ width: '300px', background: 'red', color: 'white', padding: '20px' }}>
        LEFT - If you see this as a column on the left, it works
      </div>
      <div style={{ flex: 1, background: 'green', color: 'white', padding: '20px' }}>
        CENTER - This should be in the middle
      </div>
      <div style={{ width: '350px', background: 'blue', color: 'white', padding: '20px' }}>
        RIGHT - This should be on the right
      </div>
    </div>
  );
}