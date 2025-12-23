import { useEffect, useState } from 'react'

const STORAGE_KEY = 'servers:list'

function validateIp(ip) {
  // simple IPv4 validation
  return /^((25[0-5]|2[0-4]\d|[01]?\d?\d)(\.|$)){4}$/.test(ip)
}

export default function Servers() {
  const [servers, setServers] = useState([])
  const [form, setForm] = useState({
    name: '',
    privateIp: '',
    publicIp: '',
    port: '22',
    user: '',
    password: '',
  })
  const [error, setError] = useState('')

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setServers(JSON.parse(raw))
    } catch (e) {
      // ignore
    }
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(servers))
    } catch (e) {}
  }, [servers])

  function handleChange(e) {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  function handleAdd(e) {
    e.preventDefault()
    setError('')
    if (!form.name.trim()) return setError('Server name is required')
    if (!validateIp(form.privateIp)) return setError('Private IP is invalid')
    if (form.publicIp && !validateIp(form.publicIp)) return setError('Public IP is invalid')
    const portNum = Number(form.port)
    if (!Number.isInteger(portNum) || portNum <= 0 || portNum > 65535) return setError('Port must be 1-65535')

    const entry = { id: Date.now(), ...form, port: String(portNum) }
    setServers((s) => [entry, ...s])
    setForm({ name: '', privateIp: '', publicIp: '', port: '22', user: '', password: '' })
  }

  function handleRemove(id) {
    setServers((s) => s.filter((x) => x.id !== id))
  }

  return (
    <div className="servers-page">
      <h2>Servers</h2>
      <form onSubmit={handleAdd} className="server-form">
        <div>
          <label>Server name</label>
          <input name="name" value={form.name} onChange={handleChange} />
        </div>
        <div>
          <label>Static private IP</label>
          <input name="privateIp" value={form.privateIp} onChange={handleChange} />
        </div>
        <div>
          <label>Public IP</label>
          <input name="publicIp" value={form.publicIp} onChange={handleChange} />
        </div>
        <div>
          <label>SSH Port</label>
          <input name="port" value={form.port} onChange={handleChange} />
        </div>
        <div>
          <label>User name</label>
          <input name="user" value={form.user} onChange={handleChange} />
        </div>
        <div>
          <label>Password</label>
          <input name="password" value={form.password} onChange={handleChange} type="password" />
        </div>
        <div>
          <button type="submit">Add server</button>
        </div>
        {error && <div style={{ color: 'red' }}>{error}</div>}
      </form>

      <h3>Saved servers ({servers.length})</h3>
      <table className="servers-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Private IP</th>
            <th>Public IP</th>
            <th>Port</th>
            <th>User</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {servers.map((s) => (
            <tr key={s.id}>
              <td>{s.name}</td>
              <td>{s.privateIp}</td>
              <td>{s.publicIp}</td>
              <td>{s.port}</td>
              <td>{s.user}</td>
              <td>
                <button onClick={() => handleRemove(s.id)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
