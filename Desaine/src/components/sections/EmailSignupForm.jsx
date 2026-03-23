import { useState } from 'react'
import { Check, Mail } from 'lucide-react'

export default function EmailSignupForm() {
  const [email, setEmail] = useState('')
  const [ritual, setRitual] = useState('')
  const [name, setName] = useState('')
  const [status, setStatus] = useState('idle') // idle, loading, success, error
  const [errorMessage, setErrorMessage] = useState('')

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMessage('')

    if (!validateEmail(email)) {
      setStatus('error')
      setErrorMessage('Email выглядит неточно — проверьте, не пропущен ли символ.')
      return
    }

    if (!ritual) {
      setStatus('error')
      setErrorMessage('Выберите ритуал, чтобы мы показали характер изделия.')
      return
    }

    if (name && name.length < 2) {
      setStatus('error')
      setErrorMessage('Имя слишком короткое — добавьте хотя бы 2 символа.')
      return
    }

    setStatus('loading')

    // Имитация отправки (в реальности здесь будет API call)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setStatus('success')
    
    // Очистка формы после успеха
    setEmail('')
    setName('')
    setRitual('')
  }

  if (status === 'success') {
    return (
      <div className="liquid-panel flex flex-col items-center justify-center p-8 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-secondary/20">
          <Check className="h-8 w-8 text-secondary" />
        </div>
        <h3 className="font-display text-2xl text-text">Готово</h3>
        <p className="mt-3 text-sm leading-6 text-text-soft">
          Ваш запрос на ранний доступ уже в AURA.
        </p>
        <p className="mt-2 text-xs text-text-soft/60">
          Мы подготовим следующий шаг для вашего изделия.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-primary hover:text-text"
        >
          Отправить ещё
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="liquid-panel p-6 sm:p-8">
      <div className="mb-6 text-center">
        <h3 className="font-display text-xl tracking-[-0.03em] text-text sm:text-2xl">
          Откройте свою AURA
        </h3>
        <p className="mt-2 text-sm text-text-soft">
          Выберите ритуал и оставьте контакт — мы сообщим о запуске.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="sr-only">
            Как вас представить в AURA
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Как вас представить в AURA"
            className="w-full rounded-xl border border-white/10 bg-surface/50 px-4 py-3 text-sm text-text placeholder-text-soft/40 outline-none transition-all duration-300 focus:border-primary/50 focus:bg-surface-elevated focus:shadow-[0_0_0_3px_rgba(111,124,255,0.15)]"
          />
        </div>

        <div>
          <label htmlFor="email" className="sr-only">
            Email для раннего доступа
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Ваш email — пришлём ранний доступ"
            className="w-full rounded-xl border border-white/10 bg-surface/50 px-4 py-3 text-sm text-text placeholder-text-soft/40 outline-none transition-all duration-300 focus:border-primary/50 focus:bg-surface-elevated focus:shadow-[0_0_0_3px_rgba(111,124,255,0.15)]"
          />
        </div>

        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-text-soft/70">
            Выберите ритуал
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'glow', label: 'Glow', desc: 'Свечение' },
              { id: 'calm', label: 'Calm', desc: 'Покой' },
              { id: 'pulse', label: 'Pulse', desc: 'Ритм' },
            ].map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => setRitual(option.id)}
                className={`relative flex flex-col items-center justify-center rounded-xl border px-3 py-3 text-center transition-all duration-300 ${
                  ritual === option.id
                    ? 'border-primary bg-primary/10 shadow-[0_0_24px_rgba(111,124,255,0.2)]'
                    : 'border-white/10 bg-surface/30 hover:border-white/20 hover:bg-surface/50'
                }`}
              >
                <span className="text-xs font-semibold text-text">{option.label}</span>
                <span className="mt-0.5 text-[10px] text-text-soft/60">{option.desc}</span>
                {ritual === option.id && (
                  <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary">
                    <Check className="h-2.5 w-2.5 text-[#0d1020]" />
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {status === 'error' && errorMessage && (
          <div className="rounded-lg border border-error/30 bg-error/10 px-3 py-2 text-xs text-error">
            {errorMessage}
          </div>
        )}

        <button
          type="submit"
          disabled={status === 'loading'}
          className="primary-button w-full py-4 text-sm uppercase tracking-[0.2em]"
        >
          {status === 'loading' ? 'Отправка...' : 'Получить ранний доступ'}
        </button>

        <p className="text-center text-[10px] uppercase tracking-[0.2em] text-text-soft/50">
          Нажимая кнопку, вы соглашаетесь с политикой приватности
        </p>
      </div>
    </form>
  )
}
