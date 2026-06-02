// src/hooks/useApi.js
// Hook reutilizable para consumo de endpoints (Tarea 9)
import { useState, useEffect, useCallback } from 'react'

const API_URL = import.meta.env.VITE_API_URL || null

/**
 * useApi - Fetching de datos desde API o fallback local
 * @param {string} endpoint  - Recurso (ej: 'services', 'faqs')
 * @param {any}    fallback  - Datos locales si no hay API
 */
export function useApi(endpoint, fallback = []) {
  const [data,    setData]    = useState(null)
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState(null)

  const execute = useCallback(async () => {
    if (!API_URL) {
      setData(fallback)
      return
    }
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`${API_URL}/${endpoint}`, {
        headers: { 'Content-Type': 'application/json' }
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`)
      setData(await res.json())
    } catch (err) {
      console.error(`[useApi] Error en /${endpoint}:`, err)
      setError(err.message)
      setData(fallback) // Fallback a datos locales
    } finally {
      setLoading(false)
    }
  }, [endpoint])

  useEffect(() => { execute() }, [execute])

  return { data, loading, error, refetch: execute }
}

/**
 * useContactForm - Validación y envío del formulario de contacto
 * Tarea 10: validación cliente + honeypot anti-bots
 */
export function useContactForm() {
  const [form, setForm] = useState({
    nombre: '', email: '', telefono: '',
    empresa: '', servicio: '', mensaje: ''
  })
  const [errors,  setErrors]  = useState({})
  const [sending, setSending] = useState(false)
  const [success, setSuccess] = useState(false)

  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const PHONE_RE = /^[\d\s+\-()]{7,15}$/
  const SPAM_RE  = /(https?:\/\/|<[^>]+>|viagra|casino|click here)/i

  function updateField(field, value) {
    setForm(prev => ({ ...prev, [field]: value }))
    // Limpiar error del campo al escribir
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }))
  }

  function setService(slug) {
    setForm(prev => ({ ...prev, servicio: slug }))
  }

  function validate() {
    const e = {}
    if (!form.nombre.trim() || form.nombre.length < 3)
      e.nombre = 'El nombre debe tener al menos 3 caracteres.'
    if (!EMAIL_RE.test(form.email))
      e.email = 'Ingresa un correo electrónico válido.'
    if (form.telefono && !PHONE_RE.test(form.telefono))
      e.telefono = 'Ingresa un teléfono válido (ej: +56 9 1234 5678).'
    if (!form.mensaje.trim() || form.mensaje.length < 10)
      e.mensaje = 'El mensaje debe tener al menos 10 caracteres.'
    else if (SPAM_RE.test(form.mensaje))
      e.mensaje = 'El mensaje contiene contenido no permitido.'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  async function submit(honeypot) {
    if (honeypot) return false // Anti-bot
    if (!validate()) return false
    setSending(true)
    try {
      // POST real cuando el backend esté disponible:
      // const res = await fetch(`${API_URL}/contact`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(form)
      // })
      // if (!res.ok) throw new Error('Error del servidor')
      await new Promise(r => setTimeout(r, 1200))
      setSuccess(true)
      setForm({ nombre: '', email: '', telefono: '', empresa: '', servicio: '', mensaje: '' })
      setErrors({})
      return true
    } catch {
      setErrors(prev => ({ ...prev, general: 'Error al enviar. Inténtalo nuevamente.' }))
      return false
    } finally {
      setSending(false)
    }
  }

  function reset() { setSuccess(false) }

  return { form, errors, sending, success, updateField, setService, submit, reset }
}
