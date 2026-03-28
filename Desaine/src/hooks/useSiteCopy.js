import { useMemo } from 'react'
import { getLandingContent } from '../data/landingContent'
import { useExperience } from '../context/ExperienceContext'

export default function useSiteCopy() {
  const { language, setLanguage } = useExperience()

  const copy = useMemo(() => getLandingContent(language), [language])

  return {
    language,
    setLanguage,
    copy,
  }
}
